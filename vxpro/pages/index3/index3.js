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
  onLoad: function (options) { 
    var that = this;

    wx.request({
      url: 'http://118.89.117.52/transaction/short/receive_doing',
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
              tasks: res.data.result.transactions
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



    wx.request({
      url: 'http://118.89.117.52/task/short/release_doing',
      method: 'GET',
      header: {
        //'authorization': wx.getStorageSync("token")
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJLYW5nYXJvbyBCYWNrdXAiLCJpYXQiOjE1NjExMzE0OTAxNzcsImV4cCI6MTU2MzcyMzQ5MDE3NywidXNlcklkIjoxLCJqd3RJZCI6MX0.qDg34GTZYjr_OKXHPJirdznEKPzya_TYL4Gulvnqgfo'
      },
      success: function (res) {
        console.log(wx.getStorageSync("token"))
        if (res.statusCode == 200) {
          if (res.data.success == true) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
            console.log(res.data.result.tasks)
            that.setData({
              tasks1: res.data.result.tasks
            })
            console.log(that.data);
          }
          else {
            wx.showToast({
              title: res.data.description,
              icon: 'loading',
              duration: 500
            })
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
  },

  waitPayShow: function () {
  },


  done:function(e){
    var that = this
    console.log(e.target.dataset.taskid)
    wx.showModal({
      title: '确定完成？',
      content: '等待发布者确认完成后即可得到报酬',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://118.89.117.52/transaction/' + e.target.dataset.taskid,
            method: 'PUT',
            data: {committion:'asdasd'},
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
                    duration: 1000,

                  })
                  that.onLoad()
                }
                else {
                  wx.showToast({
                    title: res.data.description,
                    icon: 'loading',
                    duration: 500

                  })

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
      
      url: '../logs/logs?taskid=' + e.currentTarget.dataset.taskid
      
    })
    


  }
  
  
})
