// const { noneParamsEaseFuncs } = require("XrFrame/xrFrameSystem");
// pages/uisLogin/uisLogin.js

// import "weapp-cookie"
// import cookies from 'weapp-cookie'

const app = getApp();
const srvurl = app.globalData.srvurl;

// 明天删掉cookie相关代码，由npm包保管

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrUrl: "",
    inter: "",
    detailData: "",
    checkQr: true,
    instruction: "请扫描二维码",
    progress: "0%"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(srvurl);
    wx.request({
      url: "https://uis.nwpu.edu.cn/cas/qr/init",
      success: res => {
        console.log(res);
        const timestamp = res.data.data.qrCode.timestamp;
        // console.log(timestamp);

        const codeUrl = "https://uis.nwpu.edu.cn/cas/qr/qrcode?r=" + (timestamp);
        wx.request({
          url: codeUrl,
          responseType: "arraybuffer",
          success: res => {

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
                    success: res => {
                      // console.log(res);
                      const data = res.data.data;
                      if (this.data.checkQr && res.data.code == 1) {
                        console.log("二维码过期", res);
                        wx.showToast({
                          title: '二维码过期',
                          icon: 'error'
                        }).then(() => {
                          cookies.clearCookies()
                          wx.navigateBack();
                          clearInterval(this.data.inter)
                        });


                      } else if (data.qrCode.status == '3') { // 登录状态

                        const appToken = data.qrCode.apptoken;
                        const stateKey = data.stateKey;
                        // console.log(stateKey);
                        wx.request({
                          url: 'https://uis.nwpu.edu.cn/cas/login',
                          data: {
                            service: "https://jwxt.nwpu.edu.cn/student/sso-login",
                            qrCodeKey: stateKey,
                          },
                          redirect: "manual",

                          success: res => {

                            console.log(res);

                            if (res.statusCode != 302) {
                              console.log("登陆失败[1]");
                              wx.showToast({
                                title: '登录失败',
                                icon: 'error',
                              }).then(() => {
                                cookies.clearCookies()
                                wx.navigateBack();
                              })
                            } else {
                              console.log(res.header.Location);
                              wx.request({
                                url: res.header.Location,
                                redirect: "manual",
                                success: res => {
                                  console.log(res); // 打印结果
                                  if (res.statusCode != 302) {
                                    console.log("登陆失败[2]");
                                    wx.showToast({
                                      title: '登录失败',
                                      icon: 'error',
                                    }).then(() => {
                                      cookies.clearCookies()
                                      wx.navigateBack();
                                    })
                                  } else {
                                    console.log(res.header.Location);
                                    wx.request({
                                      url: res.header.Location,
                                      redirect: 'manual',
                                      success: res => {


                                        console.log(res); // 打印结果
                                        if (res.statusCode != 302) {
                                          console.log("登陆失败[3]");
                                          wx.showToast({
                                            title: '登录失败',
                                            icon: 'error',
                                          }).then(() => {
                                            cookies.clearCookies(domain)
                                            wx.navigateBack();
                                          })
                                        } else { // 从这个else之后，就算是登录成功了
                                          console.log(res.header.Location);
                                          wx.request({
                                            url: 'https://jwxt.nwpu.edu.cn/student/for-std/student-portrait/getStdInfo?bizTypeAssoc=2&cultivateTypeAssoc=1',

                                            success: res => {
                                              this.setData({
                                                instruction: "登陆完成",
                                                progress: "100%",
                                              })
                                              console.log(res);
                                              // 数据的示例存储在旁边的studentDataExample.json中，res.data.student.code 是学号，res.data.student.person.country.nameEn是国籍，如果是"CHINA"就是中国人，名字在res.data.student.person.nameZh，否则在res.data.student.person.nameEn
                                              // 其实我觉得有时候，受限于错误的技术选择，直接用nameEn会更安全一点
                                              wx.setStorageSync('studentID', res.data.student.code);
                                              if (res.data.student.person.country.nameEn == "CHINA") {
                                                wx.setStorageSync('studentName', res.data.student.person.nameZh);
                                              } else {
                                                wx.setStorageSync('studentName', res.data.student.person.nameEn);
                                              }
                                              wx.request({
                                                url: srvurl + '/useruploadstudentinfo',
                                              });
                                              clearInterval(this.data.inter);
                                              wx.showToast({
                                                title: '成功！',
                                                icon: 'success'
                                              }).then(() => {
                                                cookies.clearCookies("");
                                                wx.navigateBack();
                                              })
                                            },
                                            fail: err => {
                                              console.log("err", err);
                                              wx.showToast({
                                                title: '网络错误',
                                                icon: 'error',
                                              }).then(() => {
                                                cookies.clearCookies(domain)
                                                wx.navigateBack();
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
                                        }).then(() => {
                                          cookies.clearCookies(domain)
                                          wx.navigateBack();
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
                                  }).then(() => {
                                    cookies.clearCookies(domain)
                                    wx.navigateBack();
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
                            }).then(() => {
                              cookies.clearCookies(domain)
                              wx.navigateBack();
                            })
                          }
                        })
                      } else if (data.qrCode.status == "2") {
                        this.setData({
                          instruction: "在你的手机上确认登录",
                          progress: "50%",
                        })
                      } else {
                        this.setData({
                          progress: "0%",
                          instruction: '请扫描二维码',
                        })
                      }
                    },
                    fail: err => {
                      console.log(err);
                      wx.showToast({
                        title: '网络错误',
                        icon: 'error'
                      }).then(() => {
                        cookies.clearCookies(domain)
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
              }).then(() => {
                cookies.clearCookies(domain)
                wx.navigateBack();
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
        cookies.clearCookies(domain)
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
    this.setData({
      progress: "0%",
      instruction: '请扫描二维码',
    })

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