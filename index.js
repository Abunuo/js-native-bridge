/*
 * @Date: 2021-11-11 16:49:00
 * @Description: a jsBridge for native
 */
const createNativeBridge = (nativeBridge, BridgeName = 'jsBridge') => {
  let callbacks = {};

  window[BridgeName] = {
    invoke: (type, data) => {
      // 生成回调函数对应的标识
      const callbackId = new Date().getTime();

      callbacks[callbackId] = {
        success: data.success,
        fail: data.fail,
      }

      nativeBridge.postMessage({
        type,
        data: data || {},
        callbackId: callbackId
      })
    },
    receiveMessage: (msg) => {
      // code: 是否成功
      // data: 返回的数据
      // callbackId: 回调函数的标识
      let { code, data = {}, callbackId } = msg;

      if (callbackId && callbacks[callbackId]) {
        if(code == 0) {
          callbacks[callbackId].success(data)
        } else {
          callbacks[callbackId].fail(data)
        }
      } else {
        nativeBridge.postMessage({ // 回调 Native
          type: 'callback-notfount',
        })
      }
    }
  }
}

module.exports = createNativeBridge;