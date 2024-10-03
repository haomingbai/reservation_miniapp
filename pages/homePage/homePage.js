var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barInfo: app.globalData.barInfo,
    //选择那个月份
    TabCur: 0,
    scrollLeft: 0,
    //日的轮播数据
    scrollLeftMonth: 0,
    //日份的初始化
    toShowStruct: [{
        day: '11',
        weekday: '星期一',
      },
      {
        day: '12',
        weekday: '星期二',
      },
      {
        day: '13',
        weekday: '星期三',
      },
      {
        day: '14',
        weekday: '星期四',
      },
      {
        day: '15',
        weekday: '星期五',
      },
      {
        day: '16',
        weekday: '星期六',
      },
      {
        day: '17',
        weekday: '星期天',
      }
    ],
    TabCurDay: 0,
    scrollLeftDay: 0,
    //选择考试类型
    typeofExam: ["C语言", "C++语言", "高级程序语言"],
    indexExam: 0,
    //选择考试时间
    typeofTime: ["2024年", "2025年", "2026年"],
    indexTime: 0,
    //选择考试地点
    typeofPlace: ["实验大楼105", "实验大楼106", "实验大楼107"],
    indexPlace: 0,
    //垂直导航的信息
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCurH: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    swiperList: [{
      url: "https://image.meiye.art/FlqKg5bugFQD5Qzm_QhGM7ET4Mtx?imageMogr2/thumbnail/450x/interlace/1"
    }, {
      url: "https://image.meiye.art/FhHGe9NyO0uddb6D4203jevC_gzc?imageMogr2/thumbnail/450x/interlace/1"
    }, {
      url: "https://image.meiye.art/Fha6tqRTIwHtlLW3xuZBJj8ZXSX3?imageMogr2/thumbnail/450x/interlace/1"
    }],
    //垂直导航的高度的计算
    calculatedHeight: '',
    //抽屉
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    

  },
  //showModal抽屉
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  
  //navigateUrl导航去考试报名地址
  navigateUrl(e){
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //垂直导航的信息
  initScrollV() {
    //垂直导航的计算
    let barInfo = {
      barH: 50 // 假设 barH 是 50px，你需要根据实际情况获取
    };
    barInfo.barH = app.globalData.barInfo.barH;
    // 获取屏幕的安全区域信息
    
    const safeAreaInsetBottom = wx.getSystemInfoSync().safeArea.bottom || 0;
    // 计算 height = 82vh - 200rpx - safe-area-inset-bottom / 2 - (barH + 30)
    const height = `calc(68vh - 200rpx - ${(barInfo.barH + 30)}px)`;

    // 更新到页面的 data
    this.setData({
      calculatedHeight: height
    });
    //
    let list = [{}];
    for (let i = 0; i < 18; i++) {
      list[i] = {};
      let hour = 9 + i; // 从9开始，每次增加1小时
      let time = (hour < 10 ? '0' + hour : hour) + ':00'; // 格式化为'09:00'到'18:00'
      list[i].hour = time;
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    });

  },
  tabSelectH(e) {
    this.setData({
      TabCurH: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCurH: list[i].id
        })
        return false
      }
    }
  },
  //导航
  navigateToTabbar(event) {
    console.log(event);
    wx.switchTab({
      url: event.currentTarget.dataset.url,
    }).then(
      e => {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    )
  },
  //月份的前段控制代码
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //日的滚轮
  hideModal(e) {
    this.setData({
      modalName: null,
      scrollLeftMonth: '0rpx'
    })
  },
  //日的选择
  tabSelectDay(e) {
    this.setData({
      TabCurDay: e.currentTarget.dataset.id,
      scrollLeftDay: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //选择考试类型
  pickExam(e) {
    console.log(e.detail.value);
    this.setData({
      indexExam: e.detail.value
    })
  },
  //选择时间
  pickTime(e) {
    console.log(e.detail.value);
    this.setData({
      indexTime: e.detail.value
    })
  },
  //选择地点
  pickPlace(e) {
    console.log(e.detail.value);
    this.setData({
      indexPlace: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      scrollLeftMonth: '0rpx'
    })
    this.initScrollV();
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

  }
})