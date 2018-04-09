//index.js//获取应用实例
var app = getApp()
Page({
  data: {
    phonenumber: '',
    password: '',
    mail:'',
    numShow: 'none',
    psdShow: 'none',
    modelInnerHtml: '123',
    loadingHidden: true,
    modalHidden: true,
    numFos: false,
    passFocs: false,
    mailFocs:false ,
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
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 账号修改
  bindNumInput: function (e) {
    this.setData({
      numFos: true,
      numShow: 'none',
      phonenumber: e.detail.value
    })
  },
  // 密码修改
  bindPsdInput: function (e) {
    this.setData({
      passFocs: true,
      psdShow: 'none',
      password: e.detail.value
    })
  },
  bindMailInput: function (e) {
    this.setData({
      mailFocs: true,
      psdShow: 'none',
      mail: e.detail.value
    })
  },
  
  mailChange:function(e){

  },
  // 账号失去焦点
  numChange: function () {
    if (this.data.phonenumber == '') {
      this.setData({
        numShow: '',
        psdShow: 'none'
      })
    }
  },
  // 密码失去焦点
  psdChange: function () {
    if (this.data.password == '') {
      this.setData({
        numShow: 'none',
        psdShow: ''
      })
    }
  },
  // 弹窗消失
  modalChange: function () {
    this.setData({
      modalHidden: true
    })
  },
  // 点击提交按钮
  loginSubmit: function (e) {
    if (this.data.phonenumber != '' && this.data.password != '' && this.data.mail != '') {
      this.setData({
        numShow: 'none',
        psdShow: 'none',
        loadingHidden: false
      })
      var that = this
      wx.request({
        url: app.globalData.domain + "/register",
        data: {
          name: that.data.phonenumber,
          password: that.data.password,
          mail:that.data.mail 
        },
        success: function (e) {
          that.setData({
            loadingHidden: true
          })
          if (e.statusCode == 200) {
            wx.showModal({
              title: '注册成功,请去确认邮箱',
              content: '注册成功',
              success: function (res) {
                wx.navigateTo({
                  url: '../loginV2/index'
                })
              }
            })
          } else if(e.statusCode == 400){
            wx.showModal({
              title: '注册出错',
              content: e.data
            })
          }else{
            wx.showModal({
              title: '注册出错',
              content: '注册出错'
            })
          }
        }
      })
    } else if (this.data.phonenumber == '' && this.data.password != '') {
      this.setData({
        numShow: '',
        psdShow: 'none',
        modelInnerHtml: '账号不能为空',
        modalHidden: false
      })

    } else if (this.data.password == '' && this.data.phonenumber != '') {
      this.setData({
        numShow: 'none',
        psdShow: '',
        modelInnerHtml: '密码不能为空',
        modalHidden: false
      })

    }else if(this.data.mail == ''){
      this.setData({
        numShow: 'none',
        psdShow: '',
        modelInnerHtml: '邮箱不能为空',
        modalHidden: false
      })
    } else {
      this.setData({
        numShow: '',
        psdShow: '',
        modelInnerHtml: '账号密码不能为空',
        modalHidden: false
      })
    }
  },
  // 点击找回密码
  RandP: function () {
    this.setData({
      modelInnerHtml: '暂不支持注册和密码找回',
      modalHidden: false
    })
    console.log("暂不支持注册和密码找回")
  }
})
