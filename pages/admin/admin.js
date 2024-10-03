var app = getApp();
var util = require('../utils/util.js');
const utils = require('../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //顶部栏
    barInfo: app.globalData.barInfo,
    team: "",
    name: "",
    captain: false,
    groupdate: [],
    count: '',
    agreeCount: '',
    modalHidden: true,
    meetCnt: '',
    reserveNumber:'',
  },
  //退回
  navigeteBack(){
    wx.navigateBack();
  },
  /**
   * 显示弹窗
   */
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  //导航
  urlNoTabbar(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  url(e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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