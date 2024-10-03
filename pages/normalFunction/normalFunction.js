//合法性判断,这个地方先长读即可

//弹窗设置
function showToast(text,icon){
  wx.showToast({
    title: text,
    icon:icon,
  })
}

//跳转界面-tabbar
function switchTab(url){
  wx.switchTab({
    url: url,
  });
}

//跳转界面-正常界面
function navigateTo(url){
  if(url){
    wx.redirectTo({
      url: url,
    })
  }
}

//缓存同步问题
// 使用 Promise 封装异步的缓存方法
function setStorageSync(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}

//同步取缓存的函数
// 使用 Promise 封装异步的缓存方法
function getStorageData(key) {
  return new Promise((resolve, reject) => {
    try {
      const data = wx.getStorageSync(key);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function randomChoiceFromString(string) {
  var choices = string.split(',');
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

//加载中
function showLoading(){
  wx.showLoading({
    title: '加载中',
    mask:true
  })
}

//处理我的eyeUserFile_resultImage数据得到，完成信息数，和总的信息数
function getLengthOfEyeUserFile_resultImage(eyeUserFile_resultImage){
  let allLength = eyeUserFile_resultImage.length;
  let finishLength = 0;
  for (let i = 0; i < allLength ; i++){
    if(eyeUserFile_resultImage[i].finish){
      finishLength++;
    }
  }
  return [allLength,finishLength]
}

function getUrl(fileId, date) {
  console.log("saaww")
  let persion = wx.getStorageSync('student');
  _id = persion._id;
  console.log('开始转化')
  wx.cloud.getTempFileURL({
    fileList: [fileId],
    success: res => {
      console.log("获取url地址：", res.fileList[0].tempFileURL);
      //调用云函数实现，用户信息添加
      //事务触发的添加
      console.log('开始调用云函数')
      wx.cloud.callFunction({
        name: 'storage_post',
        data: {
          // 传递给云函数的参数
          fileId: fileId,
          _id: _id,
          date: date,
          downloadUrl: res.fileList[0].tempFileURL
        },
        success: res => {
          console.log(res.result); // 云函数执行成功的返回结果
          wx.hideLoading()
          if (res.result == '事务完成') {
            normalFunction.showToast('上传成功', '')
          } else {
            normalFunction.showToast('服务器异常', 'error')
          }
        },
        fail: err => {
          console.error(err); // 云函数执行失败的错误信息
          wx.hideLoading();
          if (res.result == '事务完成') {
            normalFunction.showToast('上传成功', '')
          } else {
            normalFunction.showToast('服务器异常', 'error')
          }
        }
      });
    },
    fail: res => {
      console.log('error')
    }
  })
}

//获取当前时间时间表达式为string，格式：年-月-日T时-分-秒
function getNowTime(){
  var now = new Date();
  var year = now.getFullYear();       // 获取当前年份
  var month = now.getMonth() + 1;     // 获取当前月份（注意月份从0开始，所以要加1）
  var day = now.getDate();            // 获取当前日期
  var hour = now.getHours();          // 获取当前小时数
  var minute = now.getMinutes();      // 获取当前分钟数
  var second = now.getSeconds();      // 获取当前秒数
  return (year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second);
}

module.exports = {
  //legalGudgment:legalGudgment,
  showToast:showToast,
  navigateTo:navigateTo,
  switchTab:switchTab,
  setStorageSync:setStorageSync,
  getStorageData:getStorageData,
  randomChoiceFromString:randomChoiceFromString,
  showLoading:showLoading,
  getLengthOfEyeUserFile_resultImage:getLengthOfEyeUserFile_resultImage,
  getNowTime:getNowTime,
}
