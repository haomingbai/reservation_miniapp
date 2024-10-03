const normalFunction = require("../normalFunction/normalFunction")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uiop: '',
    ium: "",
    mingz: '',
    mima: '',
    yanzs: '',
    
    gois: 23,
    flag: true,
    borderH: 4,
    nimama: 2,
    flagTrue: true,
    //用户输入的手机号码
    phone: '',

    //头部栏数据
    barInfo: app.globalData.barInfo,

    //验证码刷新时间
    second: 60,

    //登录消失
    logoIn: true,
    logoIntoGet: true,
    animationData: {},

    //是否显示密码
    isShowPassword: false,
    psdStatus: "../image/logoIn/hidePassword.png",

    //是否发送了验证码
    sendMessage: false,

    //判断是否为新注册用户
    isNewUser: false,
    isSendSms : false,

    //是否同意协议
    isAgree : false 
  },
  isShowPsd() {
    if (!this.data.isShowPassword) {
      this.setData({
        isShowPassword: true,
        psdStatus: "../image/logoIn/showPassword.png"
      })
    } else {
      this.setData({
        isShowPassword: false,
        psdStatus: "../image/logoIn/hidePassword.png"
      })
    }
  },
  privateUserSign(){
    wx.navigateTo({
      url: '/pages/userSign/userSign',
    })
  },
  privateSign(){
    wx.navigateTo({
      url: '/pages/privacySign/privacySign',
    })
  },
  toNext() {
    /* TODO:这里需要加入判断题条件
    if (null) {
      wx.showToast({
        icon: 'none',
        title: '请先完善账号和密码',
      })
      return
    } */
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画效果
    })
    // 设置 opacity 属性为 0
    animation.opacity(0).step()
    // 导出动画数据
    this.setData({
      animationData: animation.export(),
    })
    let that = this
    setTimeout(
      function () {
        animation.opacity(10).step()
        // 导出动画数据
        that.setData({
          animationData: animation.export(),
          logoIntoGet: false
        })
      }, 500)
  },

  toBack2() {
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画效果
    })
    // 设置 opacity 属性为 0
    animation.opacity(0).step()
    // 导出动画数据
    this.setData({
      animationData: animation.export(),
    })
    let that = this
    setTimeout(
      function () {
        animation.opacity(10).step()
        // 导出动画数据
        that.setData({
          animationData: animation.export(),
          logoIn: false,
          logoIntoGet: true,
          mima: "",
          mingz: ""
        })
      }, 500)
  },

  toBack() {
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画效果
    })
    // 设置 opacity 属性为 0
    animation.opacity(0).step()
    // 导出动画数据
    this.setData({
      animationData: animation.export(),
    })


    let that = this
    setTimeout(
      function () {
        animation.opacity(10).step()
        // 导出动画数据
        that.setData({
          animationData: animation.export(),
          logoIn: true,
          ium: "",
          uiop: ""
        })
      }, 500)
  },
  bandleChange(){
    // 1 获取单选框中的值
    let isAgree = this.data.isAgree

    // 2 把值赋值给 data 中的数据
    this.setData({
      isAgree:!isAgree
    })
    console.log("isAgree",isAgree)
  },
  //现在注册动画一
  toggle() {
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 1000, // 动画持续时间
      timingFunction: 'ease', // 动画效果
    })
    // 设置 opacity 属性为 0
    animation.opacity(0).step()
    // 导出动画数据
    this.setData({
      animationData: animation.export(),
      isShowPassword: false,
      psdStatus: "../image/logoIn/hidePassword.png"
    })
    let that = this
    setTimeout(
      function () {
        animation.opacity(10).step()
        // 导出动画数据
        that.setData({
          animationData: animation.export(),
          logoIn: false

        })
      }, 500)

  },

  toUIS() {
    wx.navigateTo({
      url: '../uis/uis',
    });
  },


  selectedColor() {
    this.setData({
      borderH: 4,
      flag: true
    })
    this.setData({
      borderH1: 0
    })
  },

  selectedColor1() {
    this.setData({
      borderH1: 4,
      flag: false
    })
    this.setData({
      borderH: 0
    })
  },
  toNavigate(url) {
    wx.redirectTo({
      url: url,
    });
  },
  toNavigate2() {
    wx.navigateBack();
  },
  //生成一段指定长度大小的字符串（验证码）
  generateMixed(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 9);
      res += chars[id];
    }
    return res;
  },
  //判断输入的号码的格式是否正确
  judgePhoneNumber() {
    let that = this
    let s = that.data.phone.substr(0, 1)
    let str = this.data.phone;
    let hasLetter = /[a-zA-Z]/.test(str);
    if (hasLetter) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      console.log("字符串中包含字母");
      return false
    }
    if (that.data.phone.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      return false
    }
    if (s != 1) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      return false
    }
    return true
  },
  sendSmsF() {
    //判断是不是正在发送验证码
    /* if(this.data.isSendSms){
      return;
    }  */

    //判断输入的手机号是否符合规范
    let that = this
    if (!that.judgePhoneNumber()) {
      return
    }
    that.setData({
      sendMessage: true
    })
    //获取随机验证码
    let sa = that.generateMixed(6)
    that.setData({
      gois: sa
    })

    
    //这个地方是发送验证码的代码，需要你调试一下
    /* wx.cloud.callFunction({
      name: 'sendsms',
      data: {
        mobile: that.data.phone,
        nationcode: '86',
        params: [that.data.gois]
      },
      success: res => {
        console.log('[云函数] [sendsms] 调用成功')
        console.log(res)
        this.setData({
          isSendSms : true
        })
      },
      fail: err => {
        console.error('[云函数] [sendsms] 调用失败', err)
      }
    }) */
    this.timer()
  },

  //登录用户的触发事件
  logoInUser() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true,
              isSendSms : false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
      this.setData({
        sendMessage: false
      })
    })
  }
})