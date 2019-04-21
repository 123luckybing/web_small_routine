// pages/view/view.js
import WxValidate from '../../utils/WxValidate'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   kindList: [],
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //报错 
  showToast(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      isbn: {
        required: true
      },
      number: {
        required: true,
      },
      kindName: {
        required: true,
      },
      seller: {
        required: true,
      },
      mobileNo: {
        required: true,
      },
      address: {
        required: true,
      }
    }
    const messages = {
      name: {
        required: '请输入书名',
      },
      number: {
        required: '请输入数量',
      },
      kindName: {
        required: '请输入种类',
      },
      seller: {
        required: '请输入您的姓名',
      },
      mobileNo: {
        required: '请输入您的电话号码',
        intType: '请输入11位标准号码'
      },
      address: {
        required: '请输入上门地址',
      },
      isbn: {
        required: '请输入书号',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    const that = this
    wx.request({
      url: app.globalData.URL + '/kind/list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {},
      method: 'POST',
      success(res) {
        that.setData({
          kindList: res.data.list
        })
      }
    })
  },
  formSubmit(e) {
    const params = e.detail.value
    params.isbn = parseInt(params.isbn)
    // 校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showToast(error)
      return false
    } else {
      wx.request({
        url: app.globalData.URL + '/recycle/add',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: e.detail.value,
        method: 'POST',
        success(res) {
          if(res.data.code === 0) {
            wx.showToast({
              title: res.data.msg,
              duration: 3000,
              mask:true
            })
            setTimeout(function(){
              wx.hideToast()
            }, 2000)
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
              mask:true
            })
            setTimeout(function(){
              wx.hideToast()
            }, 2000)
          }
        }
      })
    }
  },
  formReset() {},
})