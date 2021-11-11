# jsBridge

>a webview jsBridge for native(ios, Android, react-native)

## Installation

```shell
npm install @abunuo/js-bridge --save
```

## Usage for frontEnd

```js
import createNativeBridge from 'jsBridge'

// eg: nativeBridge
// ios: window.webkit.messageHandlers.nativeBridge
// Android: window.nativeBridge
// rn: window.reactNativeWebview
createNativeBridge(nativeBridge, BridgeName = 'jsBridge')

jsBridge.invoke(type, data)

```

## Usage for afterEnd

对于 ios 的 WKWebview
```
[wkWebView evaluateJavaScript:javaScriptString completionHandler:completionHandler];
```

对于 Android 的 Kitkat（4.4）之后版本
```
webView.evaluateJavascript(javaScriptString, new ValueCallback<String>() {
    @Override
    publicvoidonReceiveValue(String value){

    }
})
```