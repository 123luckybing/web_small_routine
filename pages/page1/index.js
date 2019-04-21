// page/new-pages/user/user.js
const app = getApp()
Page({
  goDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../details/details?id=' + id 
    })
  },
  onLoad: function(options) {
    const kind = this;
    var kindName = options.name
    wx.request({
      url: app.globalData.URL + '/goods/list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        name: '',
        kind: kindName
      },
      method: 'POST',
      success(res) {
        kind.setData({
          kindList: res.data.list
        })
      }
    })
  },
  data: {
    kindList: []
  }
})
