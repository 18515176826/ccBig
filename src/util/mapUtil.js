import CMap from './cmap'

function setMap(contentId, tipId, json, mouseMoveCallback, clickCallBack) {
  // console.log('setMap-------------')
  let mapTipBox = document.getElementById(tipId)
  let oldDiv = document.querySelector('#map-box')
  let newDiv = document.createElement('div')
  newDiv.id = 'map-box'
  oldDiv.parentNode.replaceChild(newDiv, oldDiv)
  // console.log(json)
  let myMap = new CMap({
    el: contentId,
    city: {
      data: json.citysArr,
      point: {
        size: 1,
        message: 'all', // 点上信息, all 都有, auto 随机
        r: [2, 3],
        color: ['#fff']
      },
      cityName: {
        normal: {
          fillStyle: '#fff',
          font: "1em 'Microsoft Yahei'"
        },
        hover: {
          fillStyle: '#4fff5f',
          font: "1.5em 'Microsoft Yahei'"
        }
      },
      style: {
        lineWidth: 3,
        strokeStyle: '#243e6a',
        fillStyle: 'rgba(0, 0, 0, .4)',
        hoveColor: '#243e6a'
      }
    },
    cityArea: {
      data: json.araeData,
      style: {
        lineWidth: 5,
        strokeStyle: '#538df7',
      }
    },
    callback: {
      click: function (index, data) {
        clickCallBack && clickCallBack(index, data)
      },
      mousemove: function (index, data, evt) {
        mouseMoveCallback && mouseMoveCallback(index, data, evt)
      }
    }
  })
  // myMap.clear()
  myMap.init()
}

export { setMap }