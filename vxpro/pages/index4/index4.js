var app = getApp()
Page({
data: {

  userInfo: []

},

  onLoad: function (options) {
    var that = this;
    that.data.userInfo = app.globalData.userInfo;
  },
   
logout : function () {
  wx.navigateTo({
    url: '../alogin/alogin',
  })
},



})