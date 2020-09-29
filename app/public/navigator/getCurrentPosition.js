navigator.geolocation.getCurrentPosition((result) => {
  console.log(result)
}, (error) => {
  console.log(error)
}, {
  enableHighAcuracy: true,
  maximumAge: 0,
  timeout: 30000
})
