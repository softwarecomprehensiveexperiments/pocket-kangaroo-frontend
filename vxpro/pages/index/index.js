
const app = getApp()
var util = require('../../utils/util');

Page({
  data: {
    batchlist:[],
    total:0,
    motto: 'Hello World',
    updatetime:'',
    page:1,
    limit:4
  },
  onLoad:function(){
    var time = util.formatTime(new Date());
    this.setData({
      updatetime:time
    });
    this.getlist();
  },

  getlist:function(){
    wx.request({
      url: 'http://qicy75.natappfree.cc/task/public',
      header:{"token":wx.getStorageInfoSync("token")},
      data: { updatetime: this.data.updatetime, page: this.data.page, limit: this.data.limit },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          var list = [];
          list = res.data.data.items;
          this.setData({
            total: res.data.data.total_count,
            batchlist: list
          });
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

  scrollLower:function(){
    page=this.data.page+1
    this.getlist();
  }
})
