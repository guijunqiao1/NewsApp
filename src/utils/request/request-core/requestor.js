let requestor = null

export function inject(nextRequestor) {
  requestor = nextRequestor
}

export function useRequestor() {
  if (!requestor) {
    throw new Error('requestor has not been injected')
  }
  return requestor
}
