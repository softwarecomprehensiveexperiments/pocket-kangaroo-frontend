Page({

  data: {
    currtab: 0,
    swipertab: [
      {
        name: '接收', index: 0
      },
      {
        name: '发布', index: 1
      }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
    }
  },
  alreadyShow: function () {
    this.setData({
      alreadyOrder: [
        {
          name: "陈吉凡", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
          title:"东校区救命", short_description: "我要爆炸了，有没...", 
        taskid:"1" ,discrib:""
        },
        {
          name: "陈金坤", state: "进行", time: "2018-10-12 18:00-20:00", status: "跑腿", url: "../../images/bad3.jpg", money: "205",
        taskid: "2"
        },
        {
          name: "陈泓霖", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
         taskid:"3"
        },
        {
          name: "陈吉凡傻逼", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
          taskid: "4"
        },
        {
          name: "弱智陈吉凡", state: "进行", time: "2018-09-30 14:00-16:00", status: "跑腿", url: "../../icons/1.jpg", money: "132",
          taskid: "5"
        },
      ]
    })
  },

  waitPayShow: function () {
    this.setData({
      waitPayOrder: [
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
        },
      ]
    })
  },
  done:function(e){
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定完成？',
      content: '等待发布者确认完成后即可得到报酬',
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.dataset.taskid)
        }
      }
    }) 
    /*wx.navigateTo({
    })*/
  },


  undo: function (e) {
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定放弃？',
      content: '放弃后可以通过历史任务查看',
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.dataset.taskid)
        }
      }
    })
    /*wx.navigateTo({
    })*/
  },

  fabudone: function (e) {
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定完成？',
      content: '确认完成将支付报酬',
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.dataset.taskid)
        }
      }
    })
    /*wx.navigateTo({
    })*/
  },

  fabundo: function (e) {
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定放弃发布？',
      content: '放弃后可通过历史任务查看',
      success: function (res) {
        if (res.confirm) {
          console.log(e.target.dataset.taskid)
        }
      }
    })
    /*wx.navigateTo({
    })*/
  },

  discrib: function(e){
    console.log(e.currentTarget.dataset.taskid)
    var data = e.currentTarget.dataset.taskid
    wx.setStorageSync('data', data)
    wx.navigateTo({
      
      url:"../logs/logs"
      
    })
    


  }
  
  
})
