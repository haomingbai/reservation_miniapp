/**
 * 语音提示封装
 * @param {String} content 提示的文字内容
 * 插件链接文档: https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx069ba97219f66d99&token=1799717629&lang=zh_CN
 */
const plugin = requirePlugin('WechatSI');
export const sayTips = async (text) => {  
  return new Promise((resolve, reject) => {  
      const innerAudioContext = wx.createInnerAudioContext();  

      // 监听播放结束事件  
      innerAudioContext.onEnded(() => {  
          console.log('语音播放结束');  
          resolve(); // 播放结束后解析Promise  
      });  

      // 调用插件的方法  
      plugin.textToSpeech({  
          lang: 'zh_CN',  
          content: text,  
          success: function (res) {  
              console.log(res);  
              innerAudioContext.src = res.filename;  
              innerAudioContext.play();  
          },  
          fail: function(err) {  
              console.log("fail tts", err);  
              innerAudioContext.stop(); // 停止可能正在进行的播放  
              reject(err); // 播放失败时拒绝Promise  
          }  
      });  

      // 注意：这里我们没有直接处理播放过程中的错误，比如网络错误等。  
      // 你可能需要添加额外的错误处理逻辑。  
  });  
};  

// 使用 async/await 调用 sayTips 函数  
(async () => {  
  try {  
      await sayTips('你的文本内容');  
      console.log('语音念完了');  
  } catch (err) {  
      console.error('语音播放失败', err);  
  }  
})();