/*
 * @Date: 2021-11-11 16:49:00
 * @Description: a jsBridge for native
 */
const cenvertData = data => JSON.stringify(data)
const NOOP = () => {}

const createNativeBridge = (bridgeName = 'jsBridge', nativeBridge = window.ReactNativeWebView) => {
  let callbacks = {};

  window[bridgeName] = {
    invoke: (type = 'sendMessage', data = {}) => {

      // 生成回调函数对应的标识
      const callbackId = new Date().getTime();

      callbacks[callbackId] = {
        success: data?.success || NOOP,
        fail: data?.fail || NOOP
      }

      data.bridgeName = bridgeName
      data.type = type
      data.callbackId = callbackId
      
      if(nativeBridge) {
        nativeBridge.postMessage(cenvertData(data));
      } else {
        console.error(`nativeBridge is not Found`)
      }
    },
    receiveMessage: (msg) => {
      // code: 是否成功
      // data: 返回的数据
      // callbackId: 回调函数的标识
      let { code = 0, data = {}, callbackId } = msg;

      if (callbackId && callbacks[callbackId]) {
        if(code == 0) {
          callbacks[callbackId].success(data)
        } else {
          callbacks[callbackId].fail(data)
        }
      } else {
        window[bridgeName].invoke('callbackNotFound')
      }
    }
  }
}

export default createNativeBridge;