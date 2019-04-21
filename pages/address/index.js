// pages/address/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  delAddress(e) {
    const that = this;
    const data = JSON.stringify({ id: e.target.dataset.id })
    wx.request({
      url: app.globalData.URL + '/address/del',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: data,
      method: 'POST',
      success(res) {
          that.getList()
          wx.showToast({
            title: res.data.msg,
            duration: 1000,
            mask:true
          })
          setTimeout(function(){
            wx.hideToast()
          },2000)
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList() {
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
  onLoad: function () {
    this.getList()
  }
})