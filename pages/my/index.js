const app = getApp()

Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0
  },
	onLoad() {
    
	},	
  onShow() {
    this.getUserInfo();
  },	
  getUserInfo: function (cb) {
      this.setData({
        user: app.globalData.user
      })
      var that = this
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              });
            }
          })
        }
      })
  },
  relogin:function(){
    var that = this;
    wx.navigateTo({
      url: '../loginV2/index',
    })
  }
})