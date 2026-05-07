const memoryCache = new Map()

export function createMemoryStore() {
  return {
    async has(key) {
      return memoryCache.has(key)
    },
    async set(key, value) {
      memoryCache.set(key, value)
    },
    async get(key) {
      return memoryCache.get(key)
    },
    async delete(key) {
      memoryCache.delete(key)
    },
    async clear() {
      memoryCache.clear()
    }
  }
}

export function createStorageStore(storage = globalThis.localStorage) {
  return {
    async has(key) {
      return storage.getItem(key) !== null
    },
    async set(key, value) {
      storage.setItem(key, JSON.stringify(value))
    },
    async get(key) {
      const value = storage.getItem(key)
      return value === null ? undefined : JSON.parse(value)
    },
    async delete(key) {
      storage.removeItem(key)
    },
    async clear() {
      storage.clear()
    }
  }
}

export function useCacheStore(persist = false) {
  return persist ? createStorageStore() : createMemoryStore()
}
