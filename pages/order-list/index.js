var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    statusType: ["全部","待确认", "待发货", "待收货", "已完成"],
    currentType:0,
    tabClass: ["", "", "", "", ""] , 
    st:0   ,
    num:10 ,
    orderList:[] ,
    user:null ,
    value:null 
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType , 
       orderList:[]
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  onShow:function(){
    this.setData({
      user: app.globalData.user
    })
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      session: app.globalData.session
    };
    postData.status = that.data.currentType;

    wx.request({
      url: app.globalData.domain + "/order/get",
      data: {
          "st": that.data.orderList.length , 
          "num":10 , 
          "type": that.data.currentType
      },
      header:{
        "session":app.globalData.session
      },
      success: (res) => {
        wx.hideLoading();
        var list = [] ; 
        for(var i = 0 ;i < that.data.orderList.length;i++){
          list.push(that.data.orderList[i]) ; 
        }
        for(var i = 0;i < res.data.length;i++){
          list.push(res.data[i]) ; 
        }
        if(res.statusCode == 200){
          that.setData({
            orderList: list
          })
          
        }
      }
    })
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    var st = this.data.orderList.length
    var num = num + 5 
    this.setData({
      st:st , 
      num:5 
    });
    this.onShow();
  } , 
  bindValueInput:function(e){
    this.setData({
      value:e.detail.value
    })
  } , 
  toPayTap:function(e){
    var url = "" ; 
    var t = e.target.dataset.type ; 
    var that = this 
    var data 
    if(t == 1){
      url = app.globalData.domain + "/order/adminAck" ; 
      data = {
        sell:that.data.value,
        orderId: e.target.dataset.id
      }
    }else if(t == 2){
      url = app.globalData.domain + "/order/sellAck";
      data = {
        trackingNumber: that.data.value,
        orderId: e.target.dataset.id
      }
    }else if(t == 3){
      url = app.globalData.domain + "/order/buyAck";
      data = {
        orderId: e.target.dataset.id
      }
    }
    wx.showLoading();
    wx.request({
      url: url,
      data:data,
      header:{
        "session": app.globalData.session , 
         'content-type': "application/x-www-form-urlencoded"
      },
      method: "POST", 
      success: function (e) {
        wx.hideLoading();
        if(e.statusCode == 200){
          wx.showModal({
            title: '成功',
            content: '成功',
            showCancel: false,
            success: function (res) {
              that.setData({
                orderList: []
              });
              that.onShow();
            }
          })
        }
      }
    })
    console.log() ;
  }
})
