
Page({
data: {
  user_id:"",
  user_icon: ""

},

  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        console.log(res.data)
      },
    })
    wx.getStorage({
      key: 'usericon',
      success: function (res) {
        that.setData({
          user_icon: res.data
        })
        console.log(res.data)
      },
    })
    wx.getStorage({
      key: 'usermoney',
      success: function (res) {
        that.setData({
          user_properties: res.data
        })
        console.log(res.data)
      },
    })
    wx.getStorage({
      key: 'usertask',
      success: function (res) {
        that.setData({
          user_completed_receive_task_count: res.data
        })
        console.log(res.data)
      },
    })
  },
   
logout : function () {
  wx.navigateTo({
    url: '../alogin/alogin',
  })
},
userinfo:function(){
  wx.navigateTo({
    url: '../index5/index5',
  })
},
usermoney: function () {
  wx.navigateTo({
    url: '../index6/index6',
  })
},
usertask: function () {
  wx.navigateTo({
    url: '../index7/index7',
   })
}


})