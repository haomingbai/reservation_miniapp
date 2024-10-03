const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barInfo: app.globalData.barInfo,
    //抽屉
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    //select是否展示
    selectAll:false,
    //测试使用可以删除
    list:[1,2,3,4,5,6,7,8,9,10],
    //选择考试类型
    typeofExam: ["C语言", "C++语言", "高级程序语言"],
    indexExam: 0,
    //选择考试地点
    typeofPlace: ["实验大楼105", "实验大楼106", "实验大楼107"],
    indexPlace: 0,
    //滚轮长度
    calculatedHeight: 0,
  },
  //导航到预约界面
  navigateUrl(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  //是否展示出全部签到
  selectKind(e){
    console.log(e)
    this.setData({
      selectAll:e.currentTarget.dataset.target
    })
  },
  pickExam(e){
    console.log(e.detail.value);
    this.setData({
      indexExam: e.detail.value
    })
  },

  navigateToTabbar (event) {
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

  //抽屉模型
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
      modalName: e.currentTarget.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
    
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //计算一下滚轮的长度
  initScrollV(){
    //垂直导航的计算
    let barInfo = {
      barH: 50 // 假设 barH 是 50px，你需要根据实际情况获取
    };
    barInfo.barH = app.globalData.barInfo.barH;
    // 获取屏幕的安全区域信息
    
    const safeAreaInsetBottom = wx.getSystemInfoSync().safeArea.bottom || 0;
    // 计算 height = 82vh - 200rpx - safe-area-inset-bottom / 2 - (barH + 30)
    const height = `calc(100vh - 8vh - 198rpx - ${(barInfo.barH )}px - 100rpx - env(safe-area-inset-bottom) / 2)`;
    console.log(height)
    // 更新到页面的 data
    this.setData({
      calculatedHeight: height
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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