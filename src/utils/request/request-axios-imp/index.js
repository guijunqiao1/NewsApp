import axios from 'axios'

const defaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
}

export const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  method: 'get',
  headers: defaultHeaders
})

export const requestor = {
  request(config) {
    return service(config)
  },
  get(url, options = {}) {
    return service({
      ...options,
      url,
      method: 'get'
    })
  },
  delete(url, options = {}) {
    return service({
      ...options,
      url,
      method: 'delete'
    })
  },
  head(url, options = {}) {
    return service({
      ...options,
      url,
      method: 'head'
    })
  },
  options(url, options = {}) {
    return service({
      ...options,
      url,
      method: 'options'
    })
  },
  post(url, data, options = {}) {
    return service({
      ...options,
      url,
      data,
      method: 'post'
    })
  },
  put(url, data, options = {}) {
    return service({
      ...options,
      url,
      data,
      method: 'put'
    })
  },
  patch(url, data, options = {}) {
    return service({
      ...options,
      url,
      data,
      method: 'patch'
    })
  }
}
