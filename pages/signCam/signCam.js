const app = getApp();
const normalFunction = require("../normalFunction/normalFunction");
// const db = wx.cloud.database();
// const _ = db.command;
//全局记录标识
var _id = '';

Page({
  data: {
    //导航栏高度
    barInfo: app.globalData.barInfo,
    //闪光和打开时候的控制
    flashFlag: 'off',
    positionFlag: 'front',
    //打开摄像头
    kuang: true,
    //api认证
    access_token: '',
    //计时器的起始时间
    antiSecond: 16,
    //闪光
    flashFlag: false,
    //闪光和翻转
    flashFlag: 'off',
    positionFlag: 'front',
    //是否开启实时人脸监测
    isOpenCheckFace: false,
    //记录录像中不满足要求的次数
    invalidCount: 0,
    //记录如果一次录视频中不合规限制次数
    limitCount: 4,
    //选择的医院
    hospital: '',
    //是否获取了麦克风权限
    scopeRecord: false

  },
  
  goToHistory() {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  //退出
  exit() {
    wx.navigateBack();
  },
  //闪光
  flash() {
    if (lock) {
      normalFunction.showToast('正在录像', 'error')
    } else {
      this.setData({
        flashFlag: this.data.flashFlag == 'torch' ? 'off' : 'torch'
      })
    }
  },
   baiduCloud(tempImagePath) {
    let that = this
    //baidu云api
    console.log(tempImagePath)
    wx.getFileSystemManager().readFile({
      filePath: tempImagePath, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: (res) => { //成功的回调
        // console.log('data:image/png;base64,' + res.data),
        wx.request({
          url: "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + that.data.access_token,
          //这个是发送给百度云格式的标准数据
          data: {
            image: res.data,
            image_type: "BASE64",
            max_face_num: 1,
            //申请得到脸的类型、面罩是否穿戴、眼镜是否待了，
            face_field: "facetype,mask,glasses,eye_status,completeness"
          },
          method: 'POST',
          dataType: "json",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            console.log(res.data)
            //获得百度云返回的数据
            if (res.data.error_code != 0) {
              //未检测到人脸
              normalFunction.showToast('未检测到人脸', 'error');
            } else {
              that.checkFaceStatus(res.data.result.face_list[0]);
            }
          },
          fail: (res) => {
            normalFunction.showToast('人脸异常', 'error');
            wx.hideLoading()
          }
        })
      },
      fail: (res) => {
        normalFunction.showToast('人脸异常', 'error');
        wx.hideLoading();
      }
    })
  },

  onLoad: function (options) {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  onShow() {
    
  },
})