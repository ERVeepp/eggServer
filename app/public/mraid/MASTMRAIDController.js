/* eslint-disable */
// 判断平台
var platform = (function getPlatform() {
  var ua = navigator.userAgent
  // test
  // return 'web'
  if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
    return 'Android'
  }
  if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'iOS'
  }
  return 'web'
})()
// 重写console方法
if (platform !== 'web') {
  console = {}
  console.debug = console.log
  console.info = console.log
  console.warn = console.log
  console.error = console.log
  console.log = function(log) {
    // MASTMRAIDWebView为客户端对象
    MASTMRAIDWebView.nativeInvoke('console://localhost?' + log)
  }
}
// mraid init
window.mraid_init = function() {
  // 初始化完成
  console.log('mraid_init')
  // 创建mraid对象
  var mraid = (window.mraid = {})
  // 返回的对象变为参数
  mraid.returnInfo = function(call) {
    var info = ''
    var result = call()
    for (property in result) {
      if (info) {
        info += '&'
      }
      info +=
        encodeURIComponent(property) +
        '=' +
        encodeURIComponent(result[property])
    }
    return info
  }
  // 调用native方法
  mraid.nativeInvoke = function(call) {
    console.log(call)
    if (platform !== 'web') {
      MASTMRAIDWebView.nativeInvoke(call)
    }
  }
  // mraid事件
  var EVENTS = (mraid.EVENTS = {
    READY: 'ready',
    ERROR: 'error',
    STATE_CHANGE: 'stateChange',
    VIEWABLE_CHANGE: 'viewableChange',
    SIZE_CHANGE: 'sizeChange',
    EXPOSURE_CHANGE: 'exposureChange',
    AUDIO_VOLUME_CHANGE: 'audioVolumeChange'
  })
  // 订阅事件队列
  var listeners = {}
  // 添加订阅事件
  mraid.addEventListener = function(event, listener) {
    console.log('addEventListener')
    var handlers = listeners[event]
    if (!handlers) {
      listeners[event] = []
      handlers = listeners[event]
    }
    for (var i = 0; i < handlers.length; ++i) {
      if (listener === handlers[i]) {
        return
      }
    }
    handlers.push(listener)
  }
  // 删除订阅事件
  mraid.removeEventListener = function(event, listener) {
    console.log('removeEventListener')
    var handlers = listeners[event]
    if (handlers) {
      if (listener) {
        delete handlers[listener]
      } else {
        listeners[event] = null
      }
    }
  }
  // 发布修改mraid各状态事件
  mraid.fireChangeEvent = function(event, newValue) {
    console.log('fireChangeEvent handler:' + event + ' with:' + newValue)
    var handlers = listeners[event]
    if (handlers) {
      for (var i = 0; i < handlers.length; ++i) {
        console.log('fireChangeEvent invoked handler')
        handlers[i](newValue)
      }
    }
  }
  // 发布错误事件
  mraid.fireErrorEvent = function(message, action) {
    console.log('fireErrorEvent handler:' + message + ' action:' + action)
    var handlers = listeners[EVENTS.ERROR]
    if (handlers) {
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i](message, action)
      }
    }
  }
  // 发布一般事件
  mraid.fireEvent = function(event) {
    console.log('fireEvent handler:' + event)
    var handlers = listeners[event]
    if (handlers) {
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i]()
      }
    }
  }
  // 获取版本
  mraid.getVersion = function() {
    console.log('getVersion')
    return '3.0'
  }
  // supports支持方法
  var FEATURES = (mraid.FEATURES = {
    SMS: 'sms',
    TEL: 'tel',
    CALENDAR: 'calendar',
    STORE_PICTURE: 'storePicture',
    INLINE_VIDEO: 'inlineVideo',
    VPAID: 'vpaid'
  })
  // 预支持方法存储对象
  var supportedFeatures = {}
  // 设置是否支持的方法
  mraid.setSupports = function(feature, supported) {
    supportedFeatures[feature] = supported
  }
  // 检查是否支持指定方法
  mraid.supports = function(feature) {
    console.log('supports')
    return supportedFeatures[feature]
  }
  // mraid状态
  var STATES = (mraid.STATES = {
    LOADING: 'loading',
    DEFAULT: 'default',
    EXPANDED: 'expanded',
    RESIZED: 'resized',
    HIDDEN: 'hidden'
  })
  // 默认状态为加载中
  var state = STATES.LOADING
  // 设置状态
  mraid.setState = function(newState) {
    var diff = state != newState
    state = newState
    if (diff) {
      mraid.fireChangeEvent(EVENTS.STATE_CHANGE, state)
    } else if (state === STATES.RESIZED) {
      mraid.fireChangeEvent(EVENTS.STATE_CHANGE, state)
    }
  }
  // 获取状态
  mraid.getState = function() {
    console.log('getState')
    return state
  }
  // placementType 广告类型, 客户端使用对象
  var PLACEMENT_TYPES = (mraid.PLACEMENT_TYPES = {
    INLINE: 'inline',
    INTERSTITIAL: 'interstitial'
  })
  // 默认是inline类型
  var placementType = PLACEMENT_TYPES.INLINE
  // 获取广告类型
  mraid.getPlacementType = function() {
    console.log('getPlacementType')
    return placementType
  }
  // isViewable 是否展示 3.0中已弃用
  var isViewable = false
  mraid.setViewable = function(viewable) {
    var diff = isViewable != viewable
    isViewable = viewable
    if (diff) {
      mraid.fireChangeEvent(EVENTS.VIEWABLE_CHANGE, isViewable)
    }
  }
  // 获取isViewable
  mraid.isViewable = function() {
    console.log('isViewable')
    return isViewable
  }
  // open
  mraid.open = function(url) {
    console.log('open')
    var invoke = 'mraid://open?url=' + encodeURIComponent(url)
    console.log(invoke)
    mraid.nativeInvoke(invoke)
  }
  // close
  mraid.close = function() {
    console.log('close')
    var invoke = 'mraid://close'
    mraid.nativeInvoke(invoke)
  }
  // unload 广告调用以解除或删除 web, 因为它无法加载或呈现资源。主机可以删除 web、替换为其他文档或用新的广告呼叫刷新
  mraid.unload = function() {
    mraid.nativeInvoke('mraid://unload')
  }
  // playVideo
  mraid.playVideo = function(url) {
    console.log('playVideo')
    var invoke = 'mraid://playVideo?url=' + encodeURIComponent(url)
    mraid.nativeInvoke(invoke)
  }
  // 扩展参数
  var expandProperties = {
    width: 0,
    height: 0,
    useCustomClose: false,
    isModal: true
  }
  // 设置扩展参数
  mraid.setExpandProperties = function(properties) {
    console.log('setExpandProperties')
    var writableFields = ['width', 'height', 'useCustomClose']
    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        expandProperties[field] = properties[field]
      }
    }
    var invoke =
      'mraid://setExpandProperties?' +
      mraid.returnInfo(mraid.getExpandProperties)
    mraid.nativeInvoke(invoke)
  }
  // 获取扩展参数
  mraid.getExpandProperties = function() {
    console.log('getExpandProperties')
    return expandProperties
  }
  // useCustomClose 3.0中已弃用
  mraid.useCustomClose = function(useCustomClose) {
    console.log('useCustomClose')
    var property = {
      useCustomClose: useCustomClose
    }
    mraid.setExpandProperties(property)
  }
  // expand 扩展
  mraid.expand = function(url) {
    var invoke = 'mraid://expand'
    if (url) {
      invoke += '?url=' + encodeURIComponent(url)
    }
    console.log(`invoke======>${invoke}`)
    mraid.nativeInvoke(invoke)
  }
  // resize
  // 关闭按钮位置
  var RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = (mraid.RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    CENTER: 'center',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
  })
  // 尺寸参数
  var resizeProperties = {
    width: 0,
    height: 0,
    customClosePosition: RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION.TOP_RIGHT,
    offsetX: 0,
    offsetY: 0,
    allowOffscreen: false
  }
  // 设置尺寸参数
  mraid.setResizeProperties = function(properties) {
    console.log('setResizeProperties')
    var writableFields = [
      'width',
      'height',
      'customClosePosition',
      'offsetX',
      'offsetY',
      'allowOffscreen'
    ]
    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        resizeProperties[field] = properties[field]
      }
    }
    var invoke =
      'mraid://setResizeProperties?' +
      mraid.returnInfo(mraid.getResizeProperties)
    mraid.nativeInvoke(invoke)
  }
  // 获取尺寸
  mraid.getResizeProperties = function() {
    console.log('getResizeProperties')
    return resizeProperties
  }
  // 广告请求容器大小更改以适应新的广告大小
  mraid.resize = function() {
    console.log('resize')
    var invoke = 'mraid://resize'
    mraid.nativeInvoke(invoke)
  }
  // 屏幕朝向参数
  var ORIENTATION_PROPERTIES_FORCE_ORIENTATION = (mraid.ORIENTATION_PROPERTIES_FORCE_ORIENTATION = {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    NONE: 'none'
  })
  // 屏幕参数
  var orientationProperties = {
    allowOrientationChange: true,
    forceOrientation: ORIENTATION_PROPERTIES_FORCE_ORIENTATION.NONE
  }
  // 设置屏幕参数
  mraid.setOrientationProperties = function(properties) {
    console.log('setOrientationProperties')
    var writableFields = ['allowOrientationChange', 'forceOrientation']
    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        orientationProperties[field] = properties[field]
      }
    }
    var invoke =
      'mraid://setOrientationProperties?' +
      mraid.returnInfo(mraid.getOrientationProperties)
    mraid.nativeInvoke(invoke)
  }
  // 获取屏幕参数
  mraid.getOrientationProperties = function() {
    console.log('getOrientationProperties')
    console.log(JSON.stringify(orientationProperties))
    return orientationProperties
  }
  // position and size
  // 当前广告容器的坐标
  var currentPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  // 最大广告容器
  var maxSize = {
    width: 0,
    height: 0
  }
  // 默认容器的坐标
  var defaultPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  // 设备屏幕尺寸
  var screenSize = {
    width: 0,
    height: 0
  }
  // 设置广告容器坐标
  mraid.setCurrentPosition = function(position) {
    var previousSize = mraid.getSize()
    currentPosition = position
    var currentSize = mraid.getSize()
    if (
      previousSize.width === currentSize.width &&
      previousSize.height === currentSize.height
    ) {
      return
    }
    var handlers = listeners[EVENTS.SIZE_CHANGE]
    if (handlers) {
      var width = currentPosition.width
      var height = currentPosition.height
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i](width, height)
      }
    }
  }
  // 获取广告容器坐标
  mraid.getCurrentPosition = function() {
    console.log('getCurrentPosition')
    var invoke = 'mraid://updateCurrentPosition'
    mraid.nativeInvoke(invoke)
    return currentPosition
  }
  // 获取广告容器大小
  mraid.getSize = function() {
    console.log('getSize')
    var size = {
      width: currentPosition.width,
      height: currentPosition.height
    }
    return size
  }
  // 设置最大广告容器
  mraid.setMaxSize = function(size) {
    maxSize = size
  }
  // 获取最大广告容器
  mraid.getMaxSize = function() {
    console.log('getMaxSize')
    return maxSize
  }
  // 设置广告容器的默认坐标
  mraid.setDefaultPosition = function(position) {
    defaultPosition = position
  }
  // 获取广告容器的默认坐标
  mraid.getDefaultPosition = function() {
    console.log('getDefaultPosition')
    return defaultPosition
  }
  // 设置设备屏幕尺寸
  mraid.setScreenSize = function(size) {
    screenSize = size
  }
  // 获取设备屏幕尺寸
  mraid.getScreenSize = function() {
    console.log('getScreenSize')
    return screenSize
  }
  // picture 保存图片
  mraid.storePicture = function(url) {
    console.log('storePicture')
    var invoke = 'mraid://storePicture?url=' + encodeURIComponent(url)
    mraid.nativeInvoke(invoke)
  }
  // 创建设备日历
  mraid.createCalendarEvent = function(parameters) {
    console.log('createCalendarEvent')
    var invoke =
      'mraid://createCalendarEvent?event=' +
      encodeURIComponent(JSON.stringify(parameters))
    mraid.nativeInvoke(invoke)
  }
  // vpaid
  mraid._vpaidObjcet = {}
  // 初始化vpaid对象
  mraid.initVpaid = function(vpaidObject) {
    this._vpaidObjcet = vpaidObject
    //通知sdk vpaid 初始化完成
    if (platform !== 'web') {
      CTMRAIDVpaidClient.nativeInitVpaid()
    }
  }
  // startAd
  mraid.startAd = function() {
    this._vpaidObjcet.startAd()
  }
  // 订阅vpaid事件
  mraid.subscribe = function(eventName) {
    var mraidCallbacks = {
      AdClickThru: this.onAdClickThru,
      AdError: this.onAdError,
      AdImpression: this.onAdImpression,
      AdPaused: this.onAdPaused,
      AdPlaying: this.onAdPlaying,
      AdVideoStart: this.onAdVideoStart,
      AdVideoFirstQuartile: this.onAdVideoFirstQuartile,
      AdVideoMidpoint: this.onAdVideoMidpoint,
      AdVideoThirdQuartile: this.onAdVideoThirdQuartile,
      AdVideoComplete: this.onAdVideoComplete
    }
    if (eventName in mraidCallbacks) {
      this._vpaidObjcet.subscribe(mraidCallbacks[eventName], eventName, this)
    }
  }
  // 取消订阅vpaid事件
  mraid.unsubscribe = function(eventName) {
    if (eventName in mraidCallbacks) {
      this._vpaidObjcet.unsubscribe(mraidCallbacks[eventName], eventName, this)
    }
  }
  // 获取视频广告播放时长
  mraid.getAdDuration = function() {
    return this._vpaidObject.getAdDuration()
  }
  // 获取未播放时长
  mraid.getAdRemainingTime = function() {
    return this._vpaidObject.getAdRemainingTime()
  }
  // 点击监测
  mraid.onAdClickThru = function(url, id, playerHandles) {
    console.log('Clickthrough portionof the ad was clicked')
    var adjustedUrl = url
    if (adjustedUrl == undefined) adjustedUrl = ''
    CTMRAIDVpaidClient.vpaidAdClickThruIdPlayerHandles(
      adjustedUrl,
      id,
      playerHandles
    )
  }
  // 错误
  mraid.onAdError = function(message) {
    CTMRAIDVpaidClient.vpaidAdError(message)
  }
  // 曝光
  mraid.onAdImpression = function() {
    CTMRAIDVpaidClient.vpaidAdImpression()
  }
  // 暂停
  mraid.onAdPaused = function() {
    CTMRAIDVpaidClient.vpaidAdPaused()
  }
  // 播放
  mraid.onAdPlaying = function() {
    CTMRAIDVpaidClient.vpaidAdPlaying()
  }
  // 播放进度为0
  mraid.onAdVideoStart = function() {
    CTMRAIDVpaidClient.vpaidAdVideoStart()
  }
  // 播放进度为1/4
  mraid.onAdVideoFirstQuartile = function() {
    CTMRAIDVpaidClient.vpaidAdVideoFirstQuartile()
  }
  // 播放进度为1/2
  mraid.onAdVideoMidpoint = function() {
    CTMRAIDVpaidClient.vpaidAdVideoMidpoint()
  }
  // 播放进度为3/4
  mraid.onAdVideoThirdQuartile = function() {
    CTMRAIDVpaidClient.vpaidAdVideoThirdQuartile()
  }
  // 播放进度为1
  mraid.onAdVideoComplete = function() {
    CTMRAIDVpaidClient.vpaidAdVideoComplete()
  }
  //
  var mraidEnv = {}
  //
  mraid.setEnv = function(env, envv) {
    mraidEnv[env] = envv
  }
  // exposureChange事件在 MRAID 3.0 中引入, 以更准确地反映可见
  var currentExposure = {
    exposedPercentage: 0,
    viewport: {
      width: 0,
      height: 0
    },
    visibleRectangle: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      occlusionRectangle: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  }
  // 设置曝光参数
  mraid.setExposureChange = function(exposure) {
    var handlers = listeners[EVENTS.EXPOSURE_CHANGE]
    if (handlers) {
      currentExposure.exposedPercentage = exposure.exposedPercentage
      currentExposure.visibleRectangle = exposure.visibleRectangle
      currentExposure.occlusionRectangle =
        exposure.visibleRectangle.occlusionRectangle
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i](
          currentExposure.exposedPercentage,
          currentExposure.visibleRectangle,
          currentExposure.occlusionRectangle
        )
      }
    }
  }
  // 发布设置声音参数事件
  mraid.setAudioVolumeChange = function(audioVolume) {
    var handlers = listeners[EVENTS.AUDIO_VOLUME_CHANGE]
    if (handlers) {
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i](audioVolume)
      }
    }
  }
  // App Orientation
  var APP_ORIENTATION_PROPERTIES = (mraid.APP_ORIENTATION_PROPERTIES = {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape'
  })
  // 应用程序方向信息
  var currentOrientation = {
    orientation: APP_ORIENTATION_PROPERTIES.PORTRAIT,
    locked: false
  }
  // 设置请求应用程序的当前方向
  mraid.setCurrentAppOrientation = function(properties) {
    var writableFields = ['orientation', 'locked']
    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        currentOrientation[field] = properties[field]
      }
    }
  }
  // 获取请求应用程序的当前方向
  mraid.getCurrentAppOrientation = function() {
    return currentOrientation
  }
  // location 设备的当前坐标
  var currentLocation = {
    lat: 0,
    lon: 0,
    type: 0,
    accuracy: '',
    lastfix: 0,
    ipservice: ''
  }
  // 设置设备的当前坐标
  mraid.setLocation = function(properties) {
    var writableFields = [
      'lat',
      'lon',
      'type',
      'accuracy',
      'lastfix',
      'ipservice'
    ]
    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        currentLocation[field] = properties[field]
      }
    }
  }
  // 请求设备的当前坐标
  mraid.getLocation = function() {
    if (currentLocation.lat != 0 && currentLocation.lon != 0)
      return currentLocation
    else {
      return -1
    }
  }
  // 告诉webview，mraid初始化完成
  mraid.nativeInvoke('mraid://init')
  // 附加属性
  var mraidEnv = {
    version: '',
    sdk: 'suib',
    sdkVersion: '1.3.0',
    appId: '',
    ifa: '',
    limitAdTracking: false,
    coppa: false
  }
  window.mraidEnv = mraidEnv
  mraid.setEnv = function(env, envv) {
    mraidEnv[env] = envv
  }

  mraid.setEnv = function(properties) {
    var writableFields = [
      'version',
      'sdk',
      'sdkVersion',
      'appId',
      'ifa',
      'limitAdTracking',
      'coppa'
    ]

    for (wf in writableFields) {
      var field = writableFields[wf]
      if (properties[field] !== undefined) {
        mraidEnv[field] = properties[field]
      }
    }
  }
  mraid.setCloseCounters = function(parameters) {
    console.log('parameters___' + parameters)
    console.log('setCloseCounter')
    var invoke =
      'mraid://setCloseCounter?seconds=' +
      encodeURIComponent(JSON.stringify(parameters))
    mraid.nativeInvoke(invoke)
  }
}

if (!window.mraid) {
  console.log('mraid_init')
  window.mraid_init()
}
