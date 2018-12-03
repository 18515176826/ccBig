import CMap from './cmap'

function setMap(contentId, tipId, json, mouseMoveCallback, clickCallBack) {
  // console.log('setMap-------------')
  let mapTipBox = document.getElementById(tipId)
  let oldDiv = document.querySelector('#map-box')
  let newDiv = document.createElement('div')
  newDiv.id = 'map-box'
  oldDiv.parentNode.replaceChild(newDiv, oldDiv)

//   let mapData = [];
//   if(json.position){
//     mapData = json.araeData
//   }else{
//     for (let i = 0; i < json.araeData.length; i++) {
//         mapData.push([])
//         for (let m = 0; m < json.araeData[i].length; m++) {
//             if(json.araeData[i][m]%2===0){
//                 mapData[i].push(json.araeData[i][m]-5)
//             }else{
//                 mapData[i].push(json.araeData[i][m]-4)
//             }
//         }
//       }
//       console.log(mapData)
//   }

  console.log(json)
  let myMap = new CMap({
    el: contentId,
    city: {
      data: json.citysArr,
      point: {
        size: 1,
        message: 'all', // 点上信息, all 都有, auto 随机
        r: [5, 5],
        color: ['rgba(40, 218, 234, .8)'],
      },
      cityName: {
        normal: {
          fillStyle: '#fff',
          font: "24px 'Microsoft Yahei'"
        },
        hover: {
          fillStyle: '#fff',
          font: "28px 'Microsoft Yahei'"
        },
        move: {
        },
      },
      style: {
        lineWidth: 2,
        strokeStyle: '#6fbcff',
        fillStyle: 'rgba(84, 88, 204, .25)',
        hoveColor: 'rgba(41, 123, 232, .7)'
      }
    },
    cityArea: {
      data:json.araeData,
      style: {
        lineWidth: 10,
        strokeStyle: '#1590ff',
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
