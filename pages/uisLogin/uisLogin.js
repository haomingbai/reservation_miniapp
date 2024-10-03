// const { noneParamsEaseFuncs } = require("XrFrame/xrFrameSystem");

// pages/uisLogin/uisLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrUrl: "",
    inter: "",
    sessionCookie: "",
    detailData: "",
    checkQr: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: "https://uis.nwpu.edu.cn/cas/qr/init",
      success: res => {
        console.log(res);
        const timestamp = res.data.data.qrCode.timestamp;
        this.setData({
          sessionCookie: res.header["Set-Cookie"]
        })
        // console.log(timestamp);

        const codeUrl = "https://uis.nwpu.edu.cn/cas/qr/qrcode?r=" + (timestamp);
        wx.request({
          url: codeUrl,
          header: {
            "Cookie": this.data.sessionCookie
          },
          responseType: "arraybuffer",
          success: res => {
            if (res.header["Set-Cookie"]) {
              this.setData({
                sessionCookie: res.header["Set-Cookie"]
              })
            }

            if (res.statusCode == 200) {
              let url = "data:image/png;base64," + wx.arrayBufferToBase64(res.data);
              this.setData({
                qrUrl: url
              });
              this.setData({
                inter: setInterval(() => {
                  const checkUrl = "https://uis.nwpu.edu.cn/cas/qr/comet";
                  wx.request({
                    url: checkUrl,
                    method: "POST",
                    data: null,
                    header: {
                      'Content-Type': 'application/json',
                      'Cookie': this.data.sessionCookie
                    },
                    success: res => {
                      if (res.header["Set-Cookie"]) {
                        this.setData({
                          sessionCookie: res.header["Set-Cookie"]
                        })
                      }
                      // console.log(res.data.data.qrCode.status);
                      const data = res.data.data;
                      if (this.data.checkQr && res.data.code == 1) {
                        console.log("二维码过期", res);

                        wx.showToast({
                          title: '二维码过期',
                          icon: 'error'
                        }).then(() => {
                          wx.navigateBack();
                        });


                      } else if (data.qrCode.status == '3') { // 登录状态
                        const appToken = data.qrCode.apptoken;
                        const stateKey = data.stateKey;
                        console.log(stateKey);
                        wx.request({
                          url: 'https://uis.nwpu.edu.cn/cas/login',
                          data: {
                            service: "https://jwxt.nwpu.edu.cn/student/sso-login",
                            qrCodeKey: stateKey,
                          },
                          redirect: "manual",
                          header: {
                            'Content-Type': 'application/json',
                            'Cookie': this.data.sessionCookie
                          },
                          success: res => {

                            if (res.header["Set-Cookie"]) {
                              this.setData({
                                sessionCookie: res.header["Set-Cookie"],
                                checkQr: false
                              });
                            }

                            // console.log(res.statusCode);
                            console.log(res);

                            if (res.statusCode != 302) {
                              console.log("登陆失败[1]");
                              wx.showToast({
                                title: '登录失败',
                                icon: 'error',
                              }).then(() => {
                                wx.navigateBack();
                              })
                            } else {
                              wx.request({
                                url: res.header.Location,
                                redirect: "manual",
                                header: {
                                  'Content-Type': 'application/json',
                                  'Cookie': this.data.sessionCookie
                                },
                                success: res => {
                                  if (res.header["Set-Cookie"]) {
                                    this.setData({
                                      sessionCookie: res.header["Set-Cookie"],
                                      checkQr: false
                                    });
                                  }
                                  console.log(res);
                                  if (res.statusCode != 302) {
                                    console.log("登陆失败[2]");
                                    wx.showToast({
                                      title: '登录失败',
                                      icon: 'error',
                                    }).then(() => {
                                      wx.navigateBack();
                                    })
                                  } else {
                                    wx.request({
                                      url: res.header.Location,
                                      redirect: 'manual',
                                      success: res => {
                                        if (res.header["Set-Cookie"]) {
                                          this.setData({
                                            sessionCookie: res.header["Set-Cookie"],
                                            checkQr: false
                                          });
                                        }
                                        console.log(res);
                                        if (res.statusCode != 302) {
                                          console.log("登陆失败[2]");
                                          wx.showToast({
                                            title: '登录失败',
                                            icon: 'error',
                                          }).then(() => {
                                            wx.navigateBack();
                                          })
                                        } else {} // 我昨天晚上写到这里
                                      },
                                      fail: err => {
                                        console.log("err", err);
                                        wx.showToast({
                                          title: '登陆失败',
                                          icon: 'error'
                                        })
                                      }
                                    })
                                  }
                                },
                                fail: err => {
                                  console.log("err", err);
                                  wx.showToast({
                                    title: '登陆失败',
                                    icon: 'error'
                                  })
                                }
                              })
                            }
                          },
                          fail: err => {
                            console.log("err: ", err);
                            wx.showToast({
                              title: '登陆失败',
                              icon: 'error'
                            })
                          }
                        })
                      }
                    },
                    fail: err => {
                      console.log(err);
                      wx.showToast({
                        title: '网络错误',
                        icon: 'error'
                      }).then(() => {
                        wx.navigateBack();
                      });

                    }
                  })
                }, 1000)
              })
            } else {
              console.log("服务出错", res);
              wx.showToast({
                title: '接口错误',
                icon: "error",
              })
            }
          },
          fail: err => {
            console.log("Error", err);
          }
        })
        // console.log(codeUrl);
        /*
        this.setData({
          qrUrl: codeUrl
        });
        */
      },
      fail: err => {
        console.log(err);
        wx.navigateBack();
        return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.inter);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  testButton() {}
})