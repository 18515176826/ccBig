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

  // console.log(json)
  let myMap = new CMap({
    el: contentId,
    city: {
      data: json.citysArr,
      point: {
        size: 0,
        message: 'all', // 点上信息, all 都有, auto 随机
        r: [2, 3],
        color: ['#fff']
      },
      cityName: {
        normal: {
          fillStyle: '#849fc9',
          font: "14px 'Microsoft Yahei'"
        },
        hover: {
          fillStyle: '#fff',
          font: "1.5em 'Microsoft Yahei'"
        }
      },
      style: {
        lineWidth: 2,
        strokeStyle: 'rgba(50, 86, 178, .4)',
        fillStyle: 'rgba(84, 88, 204, .25)',
        hoveColor: 'rgba(41, 123, 232, .7)'
      }
    },
    cityArea: {
      data:json.araeData,
      style: {
        lineWidth: 2,
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
