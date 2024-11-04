const normalFunction = require("../normalFunction/normalFunction")

const app = getApp();
const srvurl = app.globalData.srvurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Personal information
    userEmail: "",
    userPassword: "",
    verificationCode: "",
    userName: "",

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
    isSendSms: false,

    //是否同意协议
    isAgree: false
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
  privateUserSign() {
    wx.navigateTo({
      url: '/pages/userSign/userSign',
    })
  },
  privateSign() {
    wx.navigateTo({
      url: '/pages/privacySign/privacySign',
    })
  },
  toNext() {
    /* TODO:这里需要加入判断题条件 */

    let flag = (this.data.userName.length > 0 && this.data.userPassword.length >= 8)

    if (!flag) {
      wx.showToast({
        icon: 'none',
        title: '请先完善账号和密码',
      })
      return;
    }
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
  bandleChange() {
    // 1 获取单选框中的值
    let isAgree = this.data.isAgree

    // 2 把值赋值给 data 中的数据
    this.setData({
      isAgree: !isAgree
    })
    console.log("isAgree", isAgree)
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
  isValidEmail: function (email) {
    // 检查 ASCII 长度是否不超过 50
    if (email.length > 50) {
      wx.showToast({
        title: '地址过长',
        icon: 'error'
      })
      return false;
    }

    // 正则表达式匹配邮箱格式
    const emailPattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let res = emailPattern.test(email);
    if (!res) {
      // console.log(res);
      wx.showToast({
        title: '地址非法',
        icon: 'error'
      })
    }
    return res;
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
              isSendSms: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
      this.setData({
        sendMessage: false
      })
    })
  },

  // 设置账号调用这个函数
  setUserName: function (e) {
    let value = e.detail.value;
    // console.log(e);
    this.setData({
      userName: value.trim()
    });
  },

  // Set 系列函数用来处理输入
  setPassword: function (e) {
    let value = e.detail.value;
    // console.log(e);
    this.setData({
      userPassword: value.trim()
    });
  },

  setEmail: function (e) {
    let value = e.detail.value;
    this.setData({
      userEmail: value.trim()
    });
  },

  setVerificationCode: function (e) {
    let value = e.detail.value;
    this.setData({
      verificationCode: value.trim()
    });
  },

  // 发送验证码
  sendCode: function () {
    const email = this.data.userEmail;
    const flag = this.isValidEmail(email);
    if (flag) {
      wx.request({
        url: srvurl + '/sendcode',
        method: 'POST',
        data: {
          email: email
        },
        success: (res) => {
          this.setData({
            sendMessage: true
          });
          this.timer();
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        },
      })
    }
  },

  // 注册用户
  userRegister: function (e) {
    if (this.data.isAgree == false) {
      wx.showToast({
        title: '请同意《用户协议》和《隐私协议》',
        icon: 'none'
      })
      return;
    }
    const username = this.data.userName;
    const password = this.data.userPassword;
    const email = this.data.userEmail;
    const code = this.data.verificationCode;
    console.log(username, password, email, code);
    if (!(username && password && email && code)) {
      wx.showToast({
        title: '信息不全',
        icon: 'error'
      })
      return;
    }


    wx.showLoading({
      title: '处理中',
    })
    wx.request({
      url: srvurl + "/register",
      method: 'POST',
      data: {
        email: email,
        username: username,
        password: password.toString(),
        code: code.toString()
      },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '注册成功',
          });
        } else {
          console.log(res.data.message);
          switch (res.data.message) {
            case "Invalid request data":
              wx.showToast({
                title: '数据不全',
                icon: 'error'
              })
              break;
            case "Invalid verification code":
              wx.showToast({
                title: '验证码无效',
                icon: 'error'
              });
              break;
            case "The email has been registered!":
              wx.showToast({
                title: '已经注册',
                icon: 'error'
              })
              break;
            default:
              wx.showModal({
                title: '未知错误',
                content: '请联系"haomingbai@hotmail.com"寻求帮助',
                complete: (res) => {
                  if (res.cancel) {}
                  if (res.confirm) {}
                }
              })
              break;
          }
        }
        this.toBack2();
        this.toBack();
      },
      fail: err => {
        console.log(err);
        wx.hideLoading();
        wx.showModal({
          title: '请求失败',
          content: '网络不畅或服务器正在维护',
          complete: (res) => {
            if (res.cancel) {}
            if (res.confirm) {}
          }
        });
        this.toBack2();
        this.toBack();
      },
    })
  },

  //登录用户
  userLogin(e) {
    if (this.data.isAgree == false) {
      wx.showToast({
        title: '请同意《用户协议》和《隐私协议》',
        icon: 'none'
      })
      return;
    }
    const email = this.data.userEmail;
    const password = this.data.userPassword;
    // 检查用户的登陆信息是否有效
    if (!(email && password)) {
      wx.showToast({
        title: '信息不全',
        icon: 'error'
      });
      return;
    }
    wx.showLoading({
      title: '登陆中',
    })
    wx.request({
      url: srvurl + '/login',
      method: 'POST',
      data: {
        email: email,
        password: password
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        switch (res.statusCode) {
          case 200:
            wx.showToast({
              title: '登陆成功',
            })
            wx.setStorageSync('userName', res.data.username);
            wx.setStorageSync('userPassword', password);
            wx.setStorageSync('userEmail', email);
            break;

          case 400:
            switch (res.data.message) {
              case "Invalid email or password":
                wx.showToast({
                  title: '用户名或密码错误\n请检查登陆信息。',
                  icon: 'none'
                });
                break;

              case "Invalid request data":
                wx.showToast({
                  title: '请求无效',
                  icon: 'error'
                });
                break;

              default:
                break;
            }
            break;

          default:
            break;
        };


      },

      fail: err => {
        wx.hideLoading();
        console.log(err);
      }
    })
  },
})