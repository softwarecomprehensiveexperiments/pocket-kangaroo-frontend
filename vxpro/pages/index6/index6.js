Page({
  data:{
    amount:''
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'usermoney',
      success: function (res) {
        that.setData({
          user_properties: res.data
        })
        console.log(res.data)
      },
    })
  },
  chongzhi:function(){
    wx.request({
      url: 'http://118.89.117.52/user/credit',
      method: 'POST',
      header: {
        //'authorization': wx.getStorageSync("token")
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJLYW5nYXJvbyBCYWNrdXAiLCJpYXQiOjE1NjExMzE0OTAxNzcsImV4cCI6MTU2MzcyMzQ5MDE3NywidXNlcklkIjoxLCJqd3RJZCI6MX0.qDg34GTZYjr_OKXHPJirdznEKPzya_TYL4Gulvnqgfo'
      },
      success: function (res) {
        var that=this
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.success == true) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({ amount: res.data.result.amount })
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
  }})