export const API_AVAILABILITY_EVENT = 'api-availability'

export const emitApiAvailability = (online: boolean) => {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(API_AVAILABILITY_EVENT, { detail: { online } }))
}
