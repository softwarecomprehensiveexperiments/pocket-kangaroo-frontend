// pages/yaoxh6/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceIcon: "../../icons/price.png",
    currentFatherIndex: 0,
    respData: '',
    taskPrice:'',

    questionnaireArray: [],
    // questionnaireArray: [
    //   {
    //     "type": "SCQ",
    //     "content": {
    //       "description": "Which fruit do you like best?",
    //       "options":
    //         [
    //           { "id": 1, "name": "Lua", "isSelected": false },
    //           { "id": 2, "name": "Java", "isSelected": false },
    //           { "id": 3, "name": "C++", "isSelected": false }
    //         ]
    //     }
    //   },
    //   {
    //     "type": "MCQ",
    //     "content": {
    //       "description": "Which fruit do you like?",
    //       "options":
    //         [
    //           { "id": 1, "name": "OK", "isSelected": false },
    //           { "id": 2, "name": "Java", "isSelected": false },
    //           { "id": 3, "name": "C++", "isSelected": false }
    //         ]
    //     }
    //   },
    //   {
    //     "type": "SAQ",
    //     "content": {
    //       "description": "What's your name?",
    //       "answer": "i dont know"
    //     }
    //   }
    // ],
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

  getcomm: function (src) {
    var res = "";
    for (var i in src) {
      for (var j in src[i].content.options) {
        if (src[i].content.options[j].isSelected) {
          res += String.fromCharCode('A'.charCodeAt(0) + src[i].content.options[j].id);
        }
      }
      res += "@@";
    }
    res = res.substring(0, res.length - 2);
    return res;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // console.log(options.id);
   
    var that = this;
    wx.request({
      url: 'http://118.89.117.52//transaction/detail/' + options.taskid,
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
            that.setData({ questionnaireArray: that.convertToUIData(res.data)})
            that.setData({ taskPrice: res.data.result.task_price })
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

  // fun : function(){
  //   var q = {
  //     test: this.data.test,
  //     test2: this.data.test2
  //   }
  //   wx.cloud.callFunction({
  //     name: 'release_questionnaire',
  //     data: {
  //       content: JSON.stringify(q)
  //     },
  //     success: res => {
  //       // test = JSON.stringify(res)
  //       // this.setData({
  //       //   test : JSON.stringify(res.result.results.data[0].description)
  //       // })
  //       console.log('success')
  //     }
  //   })
  // },

  // fun2 : function(){
  //   wx.cloud.callFunction({
  //     name: 'get_all_questionnaire',
  //     success: res => {
  //       console.log(res)
  //       var last = res.result.results.data[8].content
  //       this.setData({
  //         test: JSON.parse(last).test
  //       })
  //       console.log('success')
  //     }
  //   })
  // }
  goBack: function () {
    console.log('to task page')
    wx.switchTab({
      url: '../task/task',
    })
  },

  getTempFatherIndex: function (input) {
    var tempFatherIndex = input.currentTarget.dataset.id;
    //console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },

  radioChangeSCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  checkboxChangeMCQ: function (input) {
    // console.log(input.detail.value);
    var flag = false;
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      flag = false;
      for (var j in input.detail.value) {
        if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value[j]) {
          flag = true;
        }
      }
      if (flag == true) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurAnswerOfSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.answer = input.detail.value;
    // console.log(tempArray[tempIndex].content);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  complete: function () {
    this.data.respData.result.committion = this.getcomm(this.data.questionnaireArray);
    console.log(this.data.respData.result.committion);
  },
})
