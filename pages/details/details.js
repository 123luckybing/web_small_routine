// page/details/details.js
const app = getApp()
Page({
  onLoad(option) {
    const that = this
    wx.request({
      url: app.globalData.URL + '/goods/get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
       id: option.id
      },
      method: 'GET',
      success(res) {
        that.setData({
          goodsDetail: res.data
        })
      }
    })
  },
  // 立即购买
  buy() {
    var re = /^[1-9]\d*$/
    const buyNum = this.data.inputValue;
    const num = this.data.goodsDetail.number
    if ( buyNum > num || (!re.test(buyNum))) {
      wx.showModal({
        title: '提示',
        content: '请购买的数量小于库存并为正整数',
      })
    } else {
      this.confirm()
    }
  },
  confirm() {
    wx.request({
      url: app.globalData.URL + '/order/add',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
       openId: 0,
       goodsName: this.data.goodsDetail.name,
       goodsKind: this.data.goodsDetail.kind,
       number: this.data.inputValue,
       price: this.data.goodsDetail.price
      },
      method: 'POST',
      success(res) {
        if (res.data.code === 0) {
          wx.showToast({
            title: "添加成功",
            icon: 'succes',
            duration: 1000,
            mask:true
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        } else {
          wx.showToast({
            title: "添加失败",
            duration: 1000,
            mask:true
          })
          setTimeout(function(){
            wx.hideToast()
          },2000)
        }
      }
    })
  },
  // input输入框
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  data:{
    goodsDetail: {},
    inputValue: 0
  },
})