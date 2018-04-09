var app = getApp()
Page({
  data: {
  productInfo:{} , 
  imageList:[]
  },
  chooseImage: function(){
  var that = this;
  wx.chooseImage({
    count: 10,  //最多可以选择的图片总数  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
      var tempFilePaths = res.tempFilePaths;
      //启动上传等待中...  
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })
      var uploadImgCount = 0;
      var tmpimageList = [] ; 
      console.log(app.globalData)
      for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        wx.uploadFile({
          url: app.globalData.domain + '/image/upload',
          filePath: tempFilePaths[i],
          name: 'uploadFile',
          formData: {
            'imgIndex': i
          },
          header: {
            "Content-Type": "multipart/form-data" , 
            "session": app.globalData.session
          },
          success: function (res) {
            uploadImgCount++;
            var tt ; 
            var content = "上传图片失败"
            if(res.statusCode == 413){
              tt = "文件太大"
            }else if(res.statusCode == 415){
              tt = "文件为不支持的图片类型"
            }else if(res.statusCode != 200){
              tt = "错误"
            }
            if(tt != null){
              wx.hideToast();
              wx.showModal({
                title: tt,
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }else{
              var data = res.data;
              tmpimageList.push(data);
              // console.log(data)
              // console.log(tmpimageList)
              if (uploadImgCount == tempFilePaths.length) {
                that.setData({
                  imageList: tmpimageList
                })
                // console.log(that.data.imageList)
                wx.hideToast();
              }
            }
            
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });
      }
    }
  })} ,
  previewImage: function (e) {
    var current = e.target.dataset.src
    console.log(this.data.imageList)
    wx.previewImage({
      current:current,
      urls: this.data.imageList
    })
  } , 
  registerSuccess:function(e){
    var imgPaths = "";
    for (var i = 0; i < this.data.imageList.length; i++) {
      var img = this.data.imageList[i];
      if (i != 0) {
        imgPaths += ",";
      }
      imgPaths += img;
    }
    wx.showLoading();
    wx.request({
      url: app.globalData.domain+"/order/create",
      data:{
        picPath: imgPaths, 
        orderContend: e.detail.value.remark
      },
      header:{
        'session': app.globalData.session ,
        'content-type':"application/x-www-form-urlencoded"
      } , 
      method:"POST" , 
      success:function(e){
        wx.hideLoading()
        if(e.statusCode == 200){
          wx.showModal({
            title: '创建成功',
            content: '创建成功',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../my/index'
              })
            }
          })
        }else if(e.statusCode == 403){
          wx.navigateTo({
            url: '../loginV2/index',
          })
        }
        
      }
    })
  }
})