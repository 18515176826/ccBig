function resetScreenSize (dw, dh) {
  let init = () => {
    let _el = document.getElementById('app')
    let hScale = window.innerHeight / (dh || 1080)
    let wScale = window.innerWidth / (dw || 1920)

    _el.style.transform = 'scaleX(' + wScale + ') scaleY(' + hScale + ')'
  }

  let lazyFun

  window.onresize = () => {
    clearTimeout(lazyFun)

    lazyFun = setTimeout(() => {
      init()
    }, 600)
  }

  init()
}

export default resetScreenSize
