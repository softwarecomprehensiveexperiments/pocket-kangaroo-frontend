Page({
  data:{
    amount:''
  },
  phoneInput: function (e) {

    this.setData({

      amount: e.detail.value

    })

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
    var that = this
    wx.request({
      url: 'http://118.89.117.52/user/credit',
      data:{amount: this.data.amount},
      method: 'POST',
      header: {
        'authorization': wx.getStorageSync("token")
        
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
        
            wx.setStorageSync('usermoney', parseInt(wx.getStorageSync('usermoney')) + parseInt(that.data.amount))
          that.onLoad()
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