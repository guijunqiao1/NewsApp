import { inject } from '../request-core'
import { requestor, service } from '../request-axios-imp'
import { setupHttpBusinessInterceptors } from './http'

inject(requestor)

const request = setupHttpBusinessInterceptors(service)

export default request
