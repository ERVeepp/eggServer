if ('serviceWorker' in navigator) {
  console.log('serviceWorker')
  navigator.serviceWorker.register('sw.js', {scope: './'}).then(reg => {
    if (reg.installing) {
      console.log('Service worker installing')
    } else if (reg.waiting) {
      console.log('Service worker installed')
    } else if (reg.active) {
      console.log('Service worker active')
    }
  }).catch(error => {
    // registration failed
    console.log('Registration failed with ' + error)
  })
}
// function for loading each image via XHR
console.log(123456)
