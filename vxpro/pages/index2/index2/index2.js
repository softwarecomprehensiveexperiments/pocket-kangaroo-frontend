var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();




Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "点击更改任务截止日期",
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
    addIconPath1: '../../icons/addIcon1.png',
    deletePath: '../../icons/delete.png',
    deletePath1: '../../icons/cancel.png',
    typeArray: ['单选', '多选'],
    newIndex: 0,
    addIconPath: "../../icons/addIcon.png",
    currentFatherIndex: 0,
    questionnaireArray: [
      { "type": "SCQ", "content": { "description": "单选", "options": [{ "id": 1, "name": "", "isSelected": false }, ] }   }, 
    ],
    currtab: 0,
    swipertab: [
      {
        name: '问卷', index: 0
      },
      {
        name: '跑腿', index: 1
      },
      {
        name: '凉了', index: 2
      },
      {
        name: '撒旦', index: 3
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
    this.getDeviceInfo()
    this.orderShow()
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

  bindTypeChange: function (e) {
    this.setData({
      newIndex: e.detail.value
    });
    console.log(e.detail.value);
    var tempArray = this.data.questionnaireArray;
    if (this.data.newIndex == 0) {
      var temp0 = {
        "type": "SCQ",
        "content": {
          "description": "单选",
          "options":
            [
              { "id": 1, "name": "请输入问题", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 1) {
      var temp0 = {
        "type": "MCQ",
        "content": {
          "description": "多选",
          "options":
            [
              { "id": 1, "name": "请输入问题", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 2) {
      var temp0 = {
        "type": "SAQ",
        "content": {
          "description": "",
        }
      };
      tempArray.push(temp0);
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteSCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  getTempFatherIndex: function (input) {
    var tempFatherIndex = input.currentTarget.dataset.id;
    console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },

  deleteOneOfSCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    //console.log(tempSonIndex);
    var tempArray = this.data.questionnaireArray;
    //console.log(tempArray[tempFatherIndex].content.options[tempSonIndex]);
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteOneOfMCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    // console.log('tempFatherIndex: ' + tempFatherIndex);
    // console.log('tempSonIndex: ' + tempSonIndex);
    var tempArray = this.data.questionnaireArray;
    // console.log(tempArray[tempFatherIndex].content.options[tempSonIndex]);
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addSCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempSCQ = { "id": 1, "name": "", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempSCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempMCQ = { "id": 1, "name": "", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempMCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },



  bindblurSCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurOneOfSCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options[tempSonIndex].name = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurOneOfMCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options[tempSonIndex].name = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
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














  pickerTap: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },




  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "-" + day ;
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "-" + day;
    }

    var startDate = "2019-" + monthDay + " " + hours + ":" + minute + ":" + "00";
    that.setData({
      startDate: startDate
    })
  },






























  _00Input: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  _01Input: function (e) {
    this.setData({
      des: e.detail.value
    })
    console.log(this.data.des)
  },
  _02Input: function (e) {
    this.setData({
      money: e.detail.value
    })
  },



//  { "type": "SCQ", "content": { "description": "单选", "options": [{ "id": 1, "name": "", "isSelected": false }, { "id": 2, "name": "", "isSelected": false }, { "id": 3, "name": "", "isSelected": false }] } }, { "type": "MCQ", "content": { "description": "多选", "options": [{ "id": 1, "name": "", "isSelected": false }, { "id": 2, "name": "", "isSelected": false }, { "id": 3, "name": "", "isSelected": false }] } }, 



//  {
//               "question_id":1,
//               "question_description":"Which fruit do you like best?",
//               "if_multiple_select":true,
//               "options_count":3,
//               "options":"asbfsjakf@@asdsad@@asdas",
//             },



  getcomm: function (src) {
    var res = new Array();
    for (var i in src) {
      var ques = src[i];
      res[i] = {};
      if(src[i].type=='SCQ'){
      res[i].if_multiple_select = false;
      res[i].question_description = src[i].content.description;
        res[i].question_id = parseInt(i)+1;
      res[i].options_count = 0;
      res[i].options = '';
      for(var j in src[i].content.options){
        res[i].options_count++;
        res[i].options += src[i].content.options[j].name + '@@';
      }
        res[i].options = res[i].options.substring(0, res[i].options.length - 2);
      }
      else{
        res[i].if_multiple_select = 1;
        res[i].question_description = src[i].content.description;
        res[i].question_id = parseInt(i) + 1;
        res[i].options_count = 0;
        res[i].options = '';
        for (j in src[i].content.options) {
          res[i].options_count++;
          res[i].options += src[i].content.options[j].name + '@@';
        }
        res[i].options = res[i].options.substring(0, res[i].options.length - 2);
      }


    }
    
    return res;

    },



  showQ: function () {
    this.data.text = this.getcomm(this.data.questionnaireArray);
    var lo = {
      task_title: this.data.title,
      task_description: this.data.des,
      task_type: 0,
      task_price: parseInt(this.data.money),
      max_receivers_count: 5,
      task_deadline: this.data.startDate,
      questionnaire: this.data.text
    };
    console.log(lo)

    wx.request({
      url: 'http://118.89.117.52/task',
      method: 'POST',
      data: {
        task_title:this.data.title,
        task_description: this.data.des, 
        task_type:0,
        task_price: parseInt(this.data.money), 
        max_receivers_count:5,
        task_deadline: this.data.startDate,
        questionnaire: this.data.text
  		},
  
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





    console.log(this.data.questionnaireArray)
    console.log(this.data.text);

  },


})
