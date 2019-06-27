// pages/yaoxh6/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentFatherIndex: 0,
    respData: '',
    recs: '',
    date: '',
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options)

    var that = this;
    this.setData({ rec: options.rec.match('^t')==null })
    console.log(this.data)
    wx.request({
      url: 'http://118.89.117.52/task/detail/' + options.taskid,
      method: 'GET',
      header: {
        //'authorization': wx.getStorageSync("token")
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJLYW5nYXJvbyBCYWNrdXAiLCJpYXQiOjE1NjExMzE0OTAxNzcsImV4cCI6MTU2MzcyMzQ5MDE3NywidXNlcklkIjoxLCJqd3RJZCI6MX0.qDg34GTZYjr_OKXHPJirdznEKPzya_TYL4Gulvnqgfo'
      },
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.success == true) {
            that.setData({ task: res.data.result })
            that.setData({ recs: that.getRecs(that.data.task.receiver_names) });
            that.setData({ date: that.getDate(that.data.task.task_release_time) });
            console.log(res);
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

    // console.log(this.data.questionnaireArray);
  },

  getRecs: function (names) {
    if (names == null) {
      return "";
    }
    var ts = (String)(names).split("@@", 3);
    if(ts[1] == null) {
      return names;
    }
    if(ts[2] == null) {
      return ts[0] + "、" + ts[1];
    }
    return ts[0] + "、" + ts[1] + "等";
    
  },

  getDate: function (date_str) {
    console.log("11");
    console.log(date_str);
    var date = new Date(date_str);
    console.log(date);
    var bt = new Date().valueOf() - date.valueOf();
    if(bt < 60000) {
      return (parseInt(bt / 1000)) + " 秒";
    }
    if (bt < 3600000) {
      return (parseInt(bt / (1000 * 60))) + " 分钟";
    }
    if (bt < 86400000) {
      return (parseInt(bt / (1000 * 60 * 60))) + " 小时";
    }
    if (bt < 2592000000) {
      return (parseInt(bt / (1000 * 60 * 60 * 24))) + " 天";
    }
    return (parseInt(bt / (1000 * 60 * 60 * 24 * 30))) + " 月";
  },

  complete: function () {
    this.data.respData.result.committion = this.getcomm(this.data.questionnaireArray);
    console.log(this.data.respData.result.committion);
  },
  jieshou: function (e) {
    var that = this
    console.log(e.target.dataset)
    wx.showModal({
      title: '确定接收该任务？',
      content: '接收任务后请进入-进行中-查看',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://118.89.117.52//transaction?task_id=' + e.target.dataset.taskid,
            method: 'POST',
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
                  var option = {};
                  option.rec= "true";
                  option.taskid = e.target.dataset.taskid;
                  that.onLoad(option)
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
  }
})
