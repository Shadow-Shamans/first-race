export const cacheName = 'first-race-cache-v1'

export const initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.error('ServiceWorker registration failed: ', error)
        })
    })
  } else {
    console.error('Service worker in not supported in your browser')
  }
}

export const getFromNetwork = (event: FetchEvent) => {
  const fetchRequest = event.request.clone()

  return fetch(fetchRequest).then(response => {
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response
    }

    const responseToCache = response.clone()

    caches.open(cacheName).then(cache => {
      cache.put(event.request, responseToCache)
    })

    return response
  })
}
