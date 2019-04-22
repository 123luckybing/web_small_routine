// pages/addressSelect/index.js
//获取应用实例  
var app = getApp();
Page({
  data: {
    addressList: []
  },
  select(e) {
    // swithTab 跳转不能传参，把传参数定义到全局变量里面
    var id = e.currentTarget.dataset.id;
    app.globalData.addressId = id
    wx.switchTab ({
      url: '../car/index',
    })
  },
  onLoad: function () {
    const that = this
    wx.request({
      url: app.globalData.URL + '/address/list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: 0
      },
      method: 'GET',
      success(res) {
        that.setData({
          addressList: res.data
        })
      }
    })
  },
})