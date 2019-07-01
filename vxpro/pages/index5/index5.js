Page({

  data: {

    phone: '',

    password: '',

    password2: '',

    name: '',

    sex: '',

    sexs: [
      { num: '0', value: "男", checked:false},
      { num: '1', value: "女", checked:false},
    ]

  },



  radioChange: function (e) {
    this.setData({
      sex: e.detail.value,
    })
    console.log(e.detail.value)
  },


  // 获取输入手机号 

  phoneInput: function (e) {

    this.setData({

      phone: e.detail.value

    })

  },

  // 获取输入性别 

  sexInput: function (e) {

    this.setData({

      sex: e.detail.value

    })

  },

  // 获取输入用户名 

  nameInput: function (e) {

    this.setData({

      name: e.detail.value

    })

  },



  // 获取输入密码 

  passwordInput: function (e) {

    this.setData({

      password: e.detail.value

    })

  },


  // 获取输入密码2 

  passwordInput2: function (e) {

    this.setData({

      password2: e.detail.value

    })

  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://118.89.117.52/user/current_user',
      method:"GET",
      header:{
        'authorization': wx.getStorageSync("token")
      },
      success: function (res) {  
        if (res.statusCode == 200) {
          if (res.data.success == true) {  
            that.setData({
              name:res.data.result.user_name,
              phone:res.data.result.user_phone,
              sex:res.data.result.user_sex
            })
            if(res.data.result.user_sex == 0){
              that.data.sexs[0].checked = true;
              that.data.sexs[1].checked = false;
            }
            else{
              that.data.sexs[0].checked = false;
              that.data.sexs[1].checked = true;
            }
          }
        }
        else {
          console.log("alogin.js wx.request" + res.statusCode);
        }

      }
    })


  },


  // 登录 

  comfirmreg: function () {
    //验证手机号
    var reg = /^1(?:(3[0-9])|(4[5-7])|(5[0-9])|(7[0-9])|(8[0-9]))+\d{8}$/
    var r = this.data.phone.match(reg)
    //验证密码
    var reg2 = /(?=[a-zA-Z0-9!@#$%^&*]{8,16})^.*(?=([0-9](?=[a-zA-Z!@#$%^&*]))|([!@#$%^&*](?=[a-zA-Z0-9]))|([a-zA-Z](?=[0-9!@#$%^&*]))).*$/
    var r2 = this.data.password.match(reg2)
    //验证用户名
    var reg3 = /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/
    var name1 = this.data.name.replace(/[\u4e00-\u9fa5]/g, "a")
    console.log(name1)
    var r3 = name1.match(reg3)

    if (this.data.phone.length == 0 || this.data.password.length == 0 || this.data.sex.length == 0 || this.data.name.length == 0) {

      wx.showToast({

        title: '不能为空',

        icon: 'loading',

        duration: 2000


      })

    }
    else if (r == null) {
      wx.showToast({

        title: '手机号格式错误',

        icon: 'loading',

        duration: 2000
      })
    }
    else if (r2 == null) {
      wx.showToast({

        title: '密码格式错误',

        icon: 'loading',

        duration: 2000
      })
    }
    else if (r3 == null) {
      wx.showToast({

        title: '名称格式错误',

        icon: 'loading',

        duration: 2000
      })
    }
    else if (this.data.password != this.data.password2) {
      wx.showToast({
        title: '两次密码不相同',
        icon: 'loading',
        duration: 2000
      })
    }
    else {

      // 这里修改成跳转的页面
      wx.request({
        url: 'http://118.89.117.52/user/current_user',
        data: { phone: this.data.phone, name: this.data.name, password: this.data.password, sex: this.data.sex },
        method: 'PUT',
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.success) {
              console.log("111");
              wx.navigateTo({
                url: '../index4/index4',
              })
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              console.log("222");
              wx.showToast({
                title: res.data.description,
                icon: 'loading',
                duration: 2000
              })
            }
          }
          else {
            console.log("aregister.js wx.request" + res.statusCode);
          }
        },
        fail: function () {
          console.log("aregister.js wx.request CheckCallUser fail");
        },
        complete: function () {

        }
      })
    }

  }

})