import md5 from 'md5'
import { inject, useRequestor } from './requestor'
import { useCacheStore } from './cache-store'

const REQUEST_METHODS = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch']

const delay = (time) => new Promise((resolve) => window.setTimeout(resolve, time))

const normalizeCacheOptions = (options = {}) => ({
  key: options.key || ((config) => `${(config.method || 'get').toUpperCase()}:${config.url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`),
  duration: options.duration || 0,
  persist: options.persist || false,
  isValid: options.isValid
})

const normalizeRequestConfig = (method, args) => {
  if (method === 'request') {
    return args[0] || {}
  }

  const [url, dataOrOptions, options] = args
  const hasBody = ['post', 'put', 'patch'].includes(method)
  return {
    ...(hasBody ? options : dataOrOptions),
    method,
    url,
    ...(hasBody ? { data: dataOrOptions } : {})
  }
}

function createProxyRequestor(handler) {
  return REQUEST_METHODS.reduce((target, method) => {
    target[method] = (...args) => handler(method, args)
    return target
  }, {})
}

export function createRetryRequestor(maxCount = 5, retryDelay = 300) {
  const req = useRequestor()

  return createProxyRequestor(async (method, args) => {
    let lastError
    for (let count = 0; count <= maxCount; count += 1) {
      try {
        return await req[method](...args)
      } catch (error) {
        lastError = error
        if (count === maxCount) {
          break
        }
        await delay(retryDelay)
      }
    }
    throw lastError
  })
}

export function createParallelRequestor(maxCount = 4, tasks = []) {
  const results = []
  let nextIndex = 0

  const runNext = async () => {
    const currentIndex = nextIndex
    nextIndex += 1
    if (currentIndex >= tasks.length) {
      return
    }
    results[currentIndex] = await tasks[currentIndex]()
    await runNext()
  }

  return Promise.all(
    Array.from({ length: Math.min(maxCount, tasks.length) }, runNext)
  ).then(() => results)
}

export async function createSerialRequestor(tasks = []) {
  const results = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}

export function createCacheRequestor(cacheOptions = {}) {
  const options = normalizeCacheOptions(cacheOptions)
  const store = useCacheStore(options.persist)
  const req = useRequestor()

  return createProxyRequestor(async (method, args) => {
    const config = normalizeRequestConfig(method, args)
    const key = options.key(config)
    const cache = await store.get(key)

    if (cache) {
      const isValid = options.isValid
        ? options.isValid(key, config, cache)
        : !options.duration || Date.now() - cache.createdAt <= options.duration

      if (isValid) {
        return cache.value
      }
    }

    const value = await req[method](...args)
    await store.set(key, {
      value,
      createdAt: Date.now()
    })
    return value
  })
}

export function hashRequest(config = {}) {
  return md5(JSON.stringify({
    url: config.url,
    method: config.method || 'get',
    headers: config.headers || {},
    params: config.params || {},
    data: config.data || {}
  }))
}

export function createIdempotentRequestor(genKey) {
  return createCacheRequestor({
    key: (config) => genKey ? genKey(config) : hashRequest(config),
    persist: false
  })
}

export { inject, useRequestor }
