//获取应用实例  
var app = getApp();
Page({
  data: {
    productData: [],
    selectList: []
  },
  // 删除
  removeShopCard(e) {
    const that = this
    const id = e.currentTarget.dataset.bookid
    console.log(id)
    const data = JSON.stringify({id: id})
    wx.request({
      url: app.globalData.URL + '/order/del',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: data,
      method: 'POST',
      success(res) {
        wx.showModal({
          title: res.data.msg,
          duration: 1000,
          mask: true
        })
        that.getList()
      }
    })
  },
  // 复选框
  checkboxChange: function(e) {
    this.setData({
      selectList: e.detail.value
    })
  },
  address() {
    wx.navigateTo({
      url:'../addressSelect/index',
    })
  },
  // 结算
  bindCheckout() {
    var id = app.globalData.addressId
    if (id === '' || this.data.selectList === []) {
      wx.showModal({
        title: '地址和商品不能为空',
        duration: 1000,
        mask: true
      })
    } else {
      const data = JSON.stringify({
        addressId: id,
        idList: this.data.selectList
      })
      const that = this
      wx.request({
        url: app.globalData.URL + '/order/confirm',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: data,
        method: 'POST',
        success(res) {
          wx.showModal({
            title: res.data.msg,
            duration: 1000,
            mask: true
          })
          that.getList()
        }
      })
    }
  },
  // 请求列表
  getList() {
    const that = this
    wx.request({
      url: app.globalData.URL + '/order/list/openId',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: 0,
        status: 0
      },
      method: 'GET',
      success(res) {
        that.setData({
          productData: res.data.orderList
        })
      }
    })
  },
  onLoad: function() {
    this.getList()
  },
})