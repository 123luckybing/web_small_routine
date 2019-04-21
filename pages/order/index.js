//获取应用实例  
var app = getApp();
Page({  
  data: {  
    winWidth: 0,  
    winHeight: 900,  
    currentTab: 0,  
    status: 0,
    orderList0:[],
    orderList1:[],
    orderList2:[],
    orderList3:[],
    orderId:0
  },  

  onLoad: function() {  
    this.loadOrderList('0');
  }, 

  //确认收货
  sure:function(e){
    var that = this;
    var id = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function(res) {
        res.confirm && wx.request({
          url: app.globalData.URL + '/order/get/goods',
          method:'POST',
          data: {
            id: id
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if(res.data.code === 0){
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList('2');
            }else{
              wx.showToast({
                title: res.data.msg,
                duration: 2000
              });
            }
          },
          fail: function () {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });
  },
  // 加载orderList
  loadOrderList(status) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/order/list/openId',
      method: 'GET',
      data: {
        status: status,
        openId: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var list = res.data.orderList;
        switch(that.data.status){
          case '0':
            that.setData({
              orderList0: list
            });
            break;
          case '1':
            that.setData({
              orderList1: list
            });
            break;  
          case '2':
            that.setData({
              orderList2: list
            });
            break;
          case '3':
            that.setData({
              orderList3: list
            });
            break;
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  bindChange: function(e) {  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  },  

  // 切换上方navBar
  swichNav: function(e) {  
    var that = this;  
    if( that.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else { 
      var current = e.target.dataset.current;
      that.setData({
        currentTab: parseInt(current),
        status: e.target.dataset.otype,
      });

      //没有数据就进行加载
      switch(that.data.status){
          case '0':
            that.loadOrderList(that.data.status);
            break;
          case '1':
            that.loadOrderList(that.data.status);
            break;  
          case '2':
            that.loadOrderList(that.data.status);
            break;
          case '3':
            that.loadOrderList(that.data.status);
            break;
        }
    };
  }
})