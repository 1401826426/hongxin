//index.js
var common = require('common.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    phonenumber: '',
    password: '',
    numShow: 'none',
    psdShow: 'none',
    modelInnerHtml: '123',
    loadingHidden: true,
    modalHidden: true,
    numFos: false , 
    passFocs:false 
  },
  onLoad: function () {
    // common.sayHello()

    console.log('onLoad')
    var that = this
  	// //登录
    // wx.login({
    //   success: function () {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         that.setData({userInfo: res.userInfo})
    //         that.update()
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 账号修改
  bindNumInput: function(e) {
    this.setData({
      numFos: true, 
      numShow: 'none',
      phonenumber: e.detail.value
    })
  },
  // 密码修改
  bindPsdInput: function(e) {
    this.setData({
      passFocs:true ,      
      psdShow: 'none',
      password: e.detail.value
    })
  },
  // 账号失去焦点
  numChange: function() {
    if(this.data.phonenumber == '') {
      this.setData({
        numShow: '',
        psdShow: 'none'
      })
    }
  },
  // 密码失去焦点
  psdChange: function() {
    if(this.data.password == '') {
      this.setData({
        numShow: 'none',
        psdShow: ''
      })
    }
  },
  // 弹窗消失
  modalChange: function() {
    this.setData({
      modalHidden: true
    })
  },
  // 点击提交按钮
  loginSubmit: function(e) {
    if(this.data.phonenumber != '' && this.data.password != '') {
      this.setData({
        numShow: 'none',
        psdShow: 'none',
        loadingHidden: false
      }) 
      var that = this
      wx.request({
        url: app.globalData.domain + "/login",
        data:{
          name: that.data.phonenumber ,
          password: that.data.password  
        },
        success:function(e){
          that.setData({
            loadingHidden: true
          })
          if(e.statusCode == 200){
            app.globalData.user=e.data ;
            app.globalData.session=e.data.sessionId ; 
            console.log(e.data)  
            wx.navigateTo({
              url: '../my/index',
            })
          }else{
            wx.showModal({
              title: '登录出错',
              content: '账号或密码错误,或账号未激活',
            })
          }
        }
      })
    }else if(this.data.phonenumber == '' && this.data.password != '') {
      this.setData({
        numShow: '',
        psdShow: 'none',
        modelInnerHtml: '账号不能为空',
        modalHidden:  false
      })

      console.log("phonenumber不能为空" + this.data.numShow)
    }else if(this.data.password == '' && this.data.phonenumber != '') {
      this.setData({
        numShow: 'none',
        psdShow: '',
        modelInnerHtml: '密码不能为空',
        modalHidden:  false
      })

      console.log("password不能为空" + this.data.psdShow)
    }else {
      this.setData({
        numShow: '',
        psdShow: '',
        modelInnerHtml: '账号密码不能为空',
        modalHidden:  false
      })

      console.log("phonenumber不能为空" + this.data.numShow + "password不能为空" + this.data.psdShow)
    }
  },
  // 点击找回密码
  RandP: function() {
    wx.navigateTo({
      url: '../regist/index',
    })
  }
})
