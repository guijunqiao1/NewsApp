import store from '@/store'

const appcode = '5caf6b27a0614b56b40155be96f68da9'

function appendAuthorization(config) {
  config.headers = config.headers || {}
  config.headers.Authorization = `APPCODE ${appcode}`

  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token} ${config.headers.Authorization}`
  }

  return config
}

function unwrapResponse(response) {
  const { msg, result } = response.data
  if (msg === 'ok') {
    return result
  }
  return Promise.reject(new Error(msg))
}

function handleResponseError(error) {
  if (
    error.response &&
    error.response.data &&
    error.response.data.code === 401
  ) {
    store.dispatch('user/logout')
  }
  return Promise.reject(error)
}

export function setupHttpBusinessInterceptors(service) {
  service.interceptors.request.use(
    appendAuthorization,
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    unwrapResponse,
    handleResponseError
  )

  return service
}
