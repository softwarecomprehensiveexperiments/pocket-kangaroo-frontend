// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actType: [],
    date: '选择日期',
    time: '选择时间',
    typeDetail: { money: "", cate_name: "" },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var d = new Date();
    var month = new Array(12)
    month[0] = "01"
    month[1] = "02"
    month[2] = "03"
    month[3] = "04"
    month[4] = "05"
    month[5] = "06"
    month[6] = "07"
    month[7] = "08"
    month[8] = "09"
    month[9] = "10"
    month[10] = "11"
    month[11] = "12"
    // 日期
    var dd = d.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }
    var num = [];
    for (let i = 1; i < 22; i++) {
      num[i - 1] = i;
    }
    this.setData({
      num: num,
      actType: app.globalData.menus,
      today: d.getFullYear() + '-' + month[d.getMonth()] + '-' + dd,
    });
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

  // 活动种类
  bindTypeChange: function (e) {
    var typeDetail = this.data.actType[e.detail.value];
    console.log(typeDetail);
    this.setData({
      typeIndex: e.detail.value,
      typeDetail: typeDetail,
    })
  },
  bindContentAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 开始日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 开始时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindMoneyAreaBlur: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  // 确认发布按钮
  formSubmit: function (e) {
    var that = this;
    console.log(e);
    that.num( this.data.typeDetail.money,e.detail.value.name, this.data.date, this.data.time,this.data.money);
  },
})
