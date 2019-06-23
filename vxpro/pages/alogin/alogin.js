Page({

  data: {

    phone: '',

    password: ''

  },



  // 获取输入账号 

  phoneInput: function (e) {

    this.setData({

      phone: e.detail.value

    })

  },
  onLoad: function (options) { 
    wx.switchTab({
      url: '../index/index',
    });
  },


  // 获取输入密码 

  passwordInput: function (e) {

    this.setData({

      password: e.detail.value

    })

  },



  // 登录 

  login: function () {
    var header = getApp().globalData.header;
    var reg = /^1(?:(3[0-9])|(4[5-7])|(5[0-9])|(7[0-9])|(8[0-9]))+\d{8}$/
    var r = this.data.phone.match(reg)
    var reg2 = /(?=[a-zA-Z0-9!@#$%^&*]{8,16})^.*(?=([0-9](?=[a-zA-Z!@#$%^&*]))|([!@#$%^&*](?=[a-zA-Z0-9]))|([a-zA-Z](?=[0-9!@#$%^&*]))).*$/
    var r2 = this.data.password.match(reg2)

    if (this.data.phone.length == 0 || this.data.password.length == 0) {

      wx.showToast({

        title: '不能为空',

        icon: 'loading',

        duration: 2000


      })

    }


    else {
      console.log(this.data.phone + '---' + this.data.password)
      // 这里修改成跳转的页面 
      wx.request({
        url: 'http://118.89.117.52/user/login',
        data: { key: this.data.phone, password: this.data.password },
        method: 'PUT',
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.is_success == true) {
              wx.setStorageSync("token", res.header.Authorization);
              console.log(res.header.Authorization)
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '../index/index',
              });
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

  },


  register: function () {
    wx.navigateTo({
      url: '../aregister/aregister',
    })
  }

})

