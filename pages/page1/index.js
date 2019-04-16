// page/new-pages/user/user.js
Page({
  data:{
    goods: {
      id: 1,
      image: '/image/b1.jpg',
      image2: '/image/b2.jpg',
      image3: '/image/b3.jpg',
      image4: '/image/b4.jpg'
    },
	latitude: 25.060327,
    longitude: 116.410711,
	covers: [{
      latitude: 25.060327,
      longitude: 116.410711,
    }],
	markers: [{
      latitude: 25.060327,
	  longitude: 116.410711,

    }],
	accuracy: 16,
    thumb:'',
    nickname:'',
    
    hasAddress:false,
    address:{}
  },

  
  onShow(){
  }
})