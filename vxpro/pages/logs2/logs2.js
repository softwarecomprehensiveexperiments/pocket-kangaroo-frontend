// pages/logs2/logs2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireArray: [],
    respData: '',
  },

  getRecs: function (names) {
    if (names == null) {
      return "";
    }
    var ts = (String)(names).split("@@", 3);
    if (ts[1] == null) {
      return names;
    }
    if (ts[2] == null) {
      return ts[0] + "、" + ts[1];
    }
    return ts[0] + "、" + ts[1] + "等";

  },

  convertToUIData: function (src) {
    var srcQues = src.result.questionnaire;
    var res = new Array();
    for (var i in srcQues) {
      var ques = srcQues[i];
      res[i] = {};
      res[i].type = ques.if_multiple_select ? "MCQ" : "SCQ";
      res[i].content = {};
      res[i].content.description = ques.question_description;
      var opstring = (String)(ques.options);
      var ops = opstring.split("@@");
      res[i].content.options = [];
      for (var j = 0; j < ques.options_count; j++) {
        res[i].content.options[j] = {};
        res[i].content.options[j].id = j;
        res[i].content.options[j].name = ops[j];
        res[i].content.options[j].isSelected = false;
      }
    }
    return res;
  },

  pre_process: function (ques) {
    for (var i in ques) {
      for (var j in ques[i].content.options) {
        ques[i].content.options[j]["index"] = String.fromCharCode('A'.charCodeAt(0) + ques[i].content.options[j].id);
        ques[i].content.options[j]["count"] = 0;
        ques[i].content.options[j]["percent"] = 0;
      }
    }
    return ques;
  },

  aft_process: function (cnt, ques) {
    if(cnt == 0) cnt = 1;
    for (var i in ques) {
      for (var j in ques[i].content.options) {
        ques[i].content.options[j]["percent"] = (ques[i].content.options[j]["count"] / cnt) * 100;
      }
    }
    return ques;
  },
  
  setAnsToQues: function (src) {
    var ques = this.pre_process(this.data.questionnaireArray)
    console.log('after pro')
    console.log(ques)
    var cnt = 0;
    if(src=="" || src==null) {
      var ques = this.aft_process(cnt, ques)
      this.setData({ questionnaireArray: ques })
      return;
    }
    var ps = (String)(src).split("^^");
    for (var i in ps) {
      cnt++;
      console.log("ppp")
      console.log(ps[i])
      var pa = (String)(ps[i]).split("@@");
      for (var j in pa) {
        var a = (String)(pa[j]).split("");
        for (var k in a) {
          var id = a[k].charCodeAt(0) - 'A'.charCodeAt(0)
          console.log(id)
          console.log(ques[j])
          ques[j].content.options[id]["count"] += 1;
        }
      }
    } 
    var ques = this.aft_process(cnt, ques)
    this.setData({ questionnaireArray: ques })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
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
            that.setData({ questionnaireArray: that.convertToUIData(res.data) })
            that.setAnsToQues(res.data.result.task_result)
            that.setData({ recs: that.getRecs(that.data.task.receiver_names) });
            console.log(12312323)
            console.log(that.data.questionnaireArray)
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

    // console.log('hahh');
    // console.log(this.data);
    // this.setData({ recs: this.getRecs(this.data.task.receiver_names) });
    // this.setData({ date: this.getDate(this.data.task.task_release_time) });
    // console.log(this.data.questionnaireArray);
    // console.log(this.data.task)

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

  }
})