var app = getApp()
import WxValidate from '../../utils/WxValidate'
Page({
  data: {
  },
  onLoad() {
    this.initValidate()
  },
  formReset() {
  },
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      mobileNo: {
        required: true
      },
      address: {
        required: true,
      }
    }
    const messages = {
      name: {
        required: '请输入收货人姓名',
      },
      mobileNo: {
        required: '请输入电话号码',
      },
      address: {
        required: '请输入详细地址',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  // 报错
  showToast(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },
  // 提交表单
  formSubmit: function(e) {
    e.detail.value.openId = 0
    const data = e.detail.value
    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0]
      this.showToast(error)
      return false
    } else {
      const dataRes = JSON.stringify(data)
      wx.request({
        url: app.globalData.URL + '/address/add',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: dataRes,
        method: 'POST',
        success(res) {
          wx.showToast({
            title: res.data.msg,
            duration: 1000,
            mask:true
          })
          setTimeout(function(){
            wx.hideToast()
          }, 2000)
        }
      })
    }
  },
})