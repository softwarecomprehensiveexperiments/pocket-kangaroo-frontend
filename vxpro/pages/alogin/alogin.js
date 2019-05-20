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



  // 获取输入密码 

  passwordInput: function (e) {

    this.setData({

      password: e.detail.value

    })

  },



  // 登录 

  login: function () {
    var reg = /^[1](([3][0-9])|([4][5,7,9])|([5][4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/
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
    else if(r==null){
      wx.showToast({

        title: '手机号格式错误',

        icon: 'loading',

        duration: 2000
      })
    }

    else {

      // 这里修改成跳转的页面 

      wx.showToast({

        title: '登录成功',

        icon: 'success',

        duration: 2000

      })
      wx.request({
        url: 'host/user/login',
        data:{key:this.data.phone,password:this.data.password},
        method:'POST',
        success:function(res){
          if(res.statusCode == 200){

          }
          else{
            console.log("alogin.js wx.request"+res.statusCode);
          }
        },
        fail:function(){
          console.log("alogin.js wx.request CheckCallUser fail");
        },
        complete:function(){

        }
      })
      wx.switchTab({
        url: '../index/index',
      })

    }

  },


  register: function(){
    wx.navigateTo({
      url: '../aregister/aregister',
    })
  }

})