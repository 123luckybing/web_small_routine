// page/details/details.js
Page({
  data:{
   
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
   teltoUs:function(){
	   wx.makePhoneCall({
			phoneNumber: '13400008888' //仅为示例，并非真实的电话号码
		})
   }	
})