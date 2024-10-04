// app.js

App({
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.init({
      env: "eye-miniprogram-6g843hm48c52ae56"
    }),
      this.getTopBarInfo(),
      wx.hideLoading()
  },
  getTopBarInfo() {
    // 获取基础设备信息
    let menuInfo = wx.getMenuButtonBoundingClientRect()
    let sysInfo = wx.getSystemInfoSync()


    // 有关头部导航栏
    let barTop = menuInfo.top
    let barBtnH = menuInfo.height
    let statusH = sysInfo.statusBarHeight
    let barH = statusH + barBtnH + (barTop - statusH) * 2
    let margin = sysInfo.screenWidth - menuInfo.right

    if (sysInfo.safeArea) {
      margin = sysInfo.safeArea.width - menuInfo.right
    }
    this.globalData.barInfo = {
      barTop,
      barBtnH,
      barH,
      margin,
    }

    //手机高度获取
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        //console.log('手机屏幕高度为：', res.screenHeight);
        that.globalData.screenHeight = res.screenHeight
        that.globalData.screenWidth = res.screenWidth
      }
    });
  },
  globalData: {
    openid: '',
  }
})
