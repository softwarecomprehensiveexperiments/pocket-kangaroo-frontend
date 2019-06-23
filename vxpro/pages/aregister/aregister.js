Page({

  data: {

    phone: '',

    password: '',

    name: '',

    sex: ''

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



  // 登录 

  comfirmreg: function () {
    //验证手机号
    var reg = /^[1](([3][0-9])|([4][5,7,9])|([5][4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/
    var r = this.data.phone.match(reg)
    //验证密码
    var reg2 = /(?=[a-zA-Z0-9!@#$%^&*]{8,16})^.*(?=([0-9](?=[a-zA-Z!@#$%^&*]))|([!@#$%^&*](?=[a-zA-Z0-9]))|([a-zA-Z](?=[0-9!@#$%^&*]))).*$/
    var r2 = this.data.password.match(reg2)
    //验证用户名
    var reg3 = /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/
    var name1 = this.data.name.replace(/[\u4e00-\u9fa5]/g,"a")
    console.log(name1)
    var r3 = name1.match(reg3)

    if (this.data.phone.length == 0 || this.data.password.length == 0||this.data.sex.length==0||this.data.name.length==0) {

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

        icon:'loading',

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
    else {

      // 这里修改成跳转的页面 

      wx.showToast({

        title: '注册成功',

        icon: 'success',

        duration: 2000

      })
      wx.navigateTo({
        url: '../alogin/alogin',
      })

    }

  }

})