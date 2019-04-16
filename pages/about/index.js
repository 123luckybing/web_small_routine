// pages/view/view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHide: true,
    loadingText: "加载中"
  },

  //http://lbs.qq.com/tool/getpoint/ 坐标拾取器
  //* 本代码由起航网络工作室制作，认准淘宝旺旺唯一ID：LZC940217
  click: function (e) {
    wx.openLocation({
      latitude: 40.281150,
      longitude: 111.197160,
      scale: 18,
      name: '老三传媒工作室',
      address: '内蒙古呼和浩特市托克托县光明路'
    })
  },
  teltoUs: function () {
    wx.makePhoneCall({
      phoneNumber: '15354880068' //仅为示例，并非真实的电话号码
    })
  },
  onShareAppMessage: function () {
    return {
      title: '托县老三纹身',
      desc: '专注于纹身，纹眉等业务。',
      path: "pages/home/home",
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ loadingHide: false });
    setTimeout(function () {
      that.setData({ loadingHide: true });
    }, 1000)
  }
})