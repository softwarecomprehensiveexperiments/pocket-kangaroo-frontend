Page({

  /**
   * 页面的初始数据
   */
  data:{ 
    imgUrls: [
      "../../icons/hello.png",
      "../../icons/check.png",
      "../../icons/task.png"
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("assssss")
    wx.request({
      url: 'http://118.89.117.52/task/public',
      method: 'GET',
      header: {
        //'authorization': wx.getStorageSync("token")
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJLYW5nYXJvbyBCYWNrdXAiLCJpYXQiOjE1NjExMzE0OTAxNzcsImV4cCI6MTU2MzcyMzQ5MDE3NywidXNlcklkIjoxLCJqd3RJZCI6MX0.qDg34GTZYjr_OKXHPJirdznEKPzya_TYL4Gulvnqgfo'
      },
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.success == true) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
            console.log(res.data.result.tasks)
            that.setData({
              tasks: res.data.result.tasks
            })
            console.log(that.data);
          }
          else {
            wx.showToast({
              title: res.data.description,
              icon: 'loading',
              duration: 500

            })
            console.log(res.data.description)
          }
        }
        else {
          console.log("alogin.js wx.request" + res.statusCode);
        }
      },
      fail: function () {
        console.log("alogin.js wx.request CheckCallUser fail");
      },
      complete: function () {

      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("assssss");
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  
  discrib: function (e) {

    console.log(e.currentTarget.dataset)
    wx.navigateTo({

      url: '../detailPub/detailPub?taskid=' + e.currentTarget.dataset.taskid + "&rec=" + e.currentTarget.dataset.rec

    })



  }



  

})



