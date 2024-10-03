const db = wx.cloud.database();
const normalFunction = require("./normalFunction")
const Get = require("./first_storage_get")


//base64原生转化
function base64ToArrayBuffer(input) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';

  input = input.replace(/[^A-Za-z0-9+/=]/g, '');

  for (let i = 0; i < input.length;) {
    const enc1 = chars.indexOf(input.charAt(i++));
    const enc2 = chars.indexOf(input.charAt(i++));
    const enc3 = chars.indexOf(input.charAt(i++));
    const enc4 = chars.indexOf(input.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output += String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }

  return output;
}

//图片base64的数据接受后转为地址
function base64ToPath(base64Data, i) {
  const filePath = `${wx.env.USER_DATA_PATH}/temp_image${i}.jpg`; // 可自定义文件名和后缀
  //base64转化为字符对象
  const buffer = base64ToArrayBuffer(base64Data);

  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().writeFile({
      filePath: filePath,
      data: buffer,
      encoding: 'binary',
      success: () => {
        resolve(filePath);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

//发送get请求，获得状态
//状态值存放在本地的缓存和变量中
async function storageGet(videoName, rootName) {
  console.log('get地址:' + 'https://nwpu.space:2017/test/' + videoName)
  //报错返回null
  //需要重新梳理这个地方的代码了
  try {
    //res是拿到的get的数据
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: 'https://nwpu.space:2017/test/' + videoName,
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("成功得到服务器数据")
          console.log(res.data)
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        }
      });
    });
    console.log('res得到的数据：')
    console.log(res)
    //通过拿到的数据来实现对应的功能
    //返回一下状态的值了
    //返回有结果
    //base64转化为本地图片地址
    //如果没有结果则不同的处理方式
    console.log(res.data.img)
    if (res.data.img == "not exist") {
      let answer = {
        img: res.data.img,
        msg: res.data.predict_result,
        state : res.data.state
      }
      //sendUrlRes是存放图片结果和预测文字结果以及状态值
      console.log('这是no exist的处理结果:')
      console.log(answer)
      return answer;
    }
    let filePath = [await base64ToPath(res.data.img[0], 0)];
    //更新云端
    let url = filePath;
    //返回值的数据，一个放url，一个放result
    let sendUrlRes = [];
    //云端存储
    let uploadRes = await wx.cloud.uploadFile({
      cloudPath: rootName + '/' + videoName + '.png',
      filePath: url[0],
    });

    //判断一下是不是存储到了云端
    if (typeof uploadRes.fileID != 'string') {
      //未存储到云端
      //存放下载的云端id
      //加载计算的预测结果
      //存放状态值
      //sendUrlRes是存放图片结果和预测文字结果以及状态值
      let answer = {
        img: res.data.img,
        msg: res.data.predict_result,
        state : res.data.state
      }
      //sendUrlRes是存放图片结果和预测文字结果以及状态值
      console.log('这是no exist的处理结果:')
      console.log(answer)
    }
    let answer = {
      img: uploadRes.fileID,
      msg: res.data.predict_result,
      state : res.data.state
    }
    //sendUrlRes是存放图片结果和预测文字结果以及状态值
    console.log('这是成功的处理结果:')
    console.log(answer)
    //sendUrlRes是存放图片结果和预测文字结果以及状态值
    return answer;
  } catch (error) {
    console.log(error)
    normalFunction.showToast('更新错误', 'error');
    wx.showModal({
      title: '请求出错',
      content: error,
      complete: (res) => {
        if (res.cancel) {
        }
        if (res.confirm) {
        }
      }
    })
    //throw error;
  }
}

async function updateStorage_cloud(msg, _id) {
  try {
    const res = await db.collection('users').doc(_id).update({
      data: {
        eyeUserFile_resultImage: msg
      }
    });
    if (res.stats.updated === 0) {
      //normalFunction.showToast('更新数据失败', 'error');
    } else {
      let persion = wx.getStorageSync('student');
      persion.eyeUserFile_resultImage = msg;
      wx.setStorageSync('student', persion);
      //normalFunction.showToast('更新数据成功', 'error');
    }
  } catch (error) {
    //normalFunction.showToast('更新数据失败', 'error');
  }
}

//get申请中的名称获取
async function getFileVedioNameRootName(fileId, data) {
  let name = fileId.replace(/[\\/:\s]/g, '');
  let videoName = name.replace(/\.mp4$/i, '');
  videoName = videoName.replace('.', '')
  let rootName = data._openid;
  return [videoName, rootName]
}
async function sendRegisterInfo(data) {
  let student = wx.getStorageSync('student');
  let data1 = {
    "phone_number": student.phone_number,
    "checkVideoPath": data.downloadUrl,
    "resultImage": data.resultImagePath,
    "check_time": data.date,
    "predict": data.resultInfo,
    "hospital": data.hospital
  }
  console.log(data1),
    wx.request({
      url: 'https://nwpu.space/ReceiveMedia/',
      method: 'POST',
      data: {
        "phone_number": student.phone_number,
        "checkVideoPath": data.downloadUrl,
        "resultImage": data.resultImagePath,
        "check_time": data.date,
        "predict": data.resultInfo,
        "hospital": data.hospital
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("post返回")
        console.log(res.data)
      }
    })
}
//这个函数是遍历发送get请求看看能不能找到对应的结果的
async function forGet(data) {
  //个人眼震数据：图像+结果
  let msg = data.eyeUserFile_resultImage;
  console.log("msg")
  //console.log(msg)
  for (let i = 0; i < msg.length; i++) {
    //是否得到结果
    if (msg[i].finish || msg[i].state == 1) {
      //得到结果
      //console.log(i + '号数据有实验结果')
      //发送给云端
      continue;
    } else {
      //没有在服务器上得到数据结果开始get操作
      //第一步获取
      //第二步存储和返回结果值
      //第一步：
      let [videoName, rootName] = await getFileVedioNameRootName(msg[i].eyeUserFile, data);
      //第二步:
      //返回那些没有结果get后的值
      //console.log('循环过来了')
      let result = await storageGet(videoName, rootName);
      //console.log(msg[i].finish)
      //用返回值来处理一下
      console.log('这是Get检查是否更新的的result：')
      console.log(result)
      if(result.state == 0){
        msg[i].state = 0;
        console.log('模型预测事务，视频不标准，需要重新拍摄')
        continue
      }
      if (result.msg === 'not exist') {
        console.log('数据还不存在')
        continue
      }
      if (result.msg === 'error') {
        msg[i].state = -1;
        msg[i].resultInfo = result.msg;
        console.log('error了')
        continue
      }
      //当返回结果是1时候再存
      if (result.state == 1) {
        msg[i].resultImage = result.img;
        msg[i].resultInfo = result.msg;
        msg[i].state = result.state;
        msg[i].resultImagePath = await getUrl(msg[i].resultImage)
        console.log("msg[i].resultImagePath：", msg[i].resultImagePath);
        msg[i].finish = true;
        //传给服务器
        await sendRegisterInfo(msg[i])
        msg[i].isPost = true
      }
    }
  }
  //console.log(msg)
  return msg;
}

async function httpsGet(_id) {
  //返回值的寻找
  return new Promise(async (resolve, reject) => {
    //缓冲区获取个人信息
    let data = wx.getStorageSync('student');
    if (typeof data._id != 'string') {
      //云端获取到个人的信息
      const res = await db.collection('users').doc(_id).get();
      data = res.data;
      //更新缓冲区
      wx.setStorageSync('student', data)
    }
    let that = this
    //上面获取到个人信息了
    try {
      if (data) {
        //循环get请求,得到需要的eyeUserFile_resultImage的数据
        let msg = await forGet(data);
        //console.log(data)
        await updateStorage_cloud(msg, _id);
        //返回这个res就是msg个人的结果值
        //console.log(msg)
        resolve(msg); // 执行完成后调用 resolve()
      } else {
        normalFunction.showToast('未获取到信息1', 'error');
        reject(-1);
      }
    } catch (error) {
      normalFunction.showToast('未获取到信息2', 'error');
      //返回错误值
      reject(error);
    }
  });
}
async function getUrl(fileId) {
  console.log('开始转化');
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        console.log("获取url地址：", res.fileList[0].tempFileURL);
        resolve(res.fileList[0].tempFileURL);
      },
      fail: res => {
        console.log('error');
        reject("获取链接失败");
      }
    });
  });
}
module.exports = {
  base64ToPath: base64ToPath,
  storageGet: storageGet,
  updateStorage_cloud: updateStorage_cloud,
  httpsGet: httpsGet,
  forGet: forGet,
  base64ToArrayBuffer: base64ToArrayBuffer
}