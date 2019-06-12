Page({

  /**
   * 页面的初始数据
   */
  data:{
    data:[
      {
        name: "陈吉凡", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
        taskid: "1"
      },
      {
        name: "陈金坤", state: "进行", time: "2018-10-12 18:00-20:00", status: "跑腿", url: "../../images/bad3.jpg", money: "205",
        taskid: "2"
      },
      {
        name: "陈泓霖", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
        taskid: "3"
      },
      {
        name: "陈吉凡傻逼", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
        taskid: "4"
      },
      {
        name: "弱智陈吉凡", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
        taskid: "5"
      }
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(e.currentTarget.dataset.task)
    var data = e.currentTarget.dataset.task
    wx.setStorageSync('data', data)
    wx.navigateTo({

      url: "../logs/logs"

    })



  },
  jieshou: function (e) {
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定接收该任务？',
      content: '接收任务后请进入-进行中-查看',
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.dataset.taskid)
        }
      }
    })
    /*wx.navigateTo({
    })*/
  }


})



