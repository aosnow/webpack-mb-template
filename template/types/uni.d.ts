// ------------------------------------------------------------------------------
// name: uni.d
// author: mudas( mschool.tech )
// created: 2020.05.06
// ------------------------------------------------------------------------------

/**
 * Uni 实例变量
 */
declare const uni: Uni;

declare class Uni {
  /**
   * 显示 loading 提示框
   *
   * 参考: [http://uniapp.dcloud.io/api/ui/prompt?id=showloading](http://uniapp.dcloud.io/api/ui/prompt?id=showloading)
   */
  showLoading(options?: ShowLoadingOptions): void;

  /**
   * 保留当前页面，跳转到应用内的某个页面
   *
   * 参考: [http://uniapp.dcloud.io/api/router?id=navigateto](http://uniapp.dcloud.io/api/router?id=navigateto)
   */
  navigateTo(options?: NavigateToOptions): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面
   *
   * 参考: [http://uniapp.dcloud.io/api/router?id=redirectto](http://uniapp.dcloud.io/api/router?id=redirectto)
   */
  redirectTo(options?: RedirectToOptions): void;

  /**
   * 关闭所有页面，打开到应用内的某个页面
   *
   * 参考: [http://uniapp.dcloud.io/api/router?id=relaunch](http://uniapp.dcloud.io/api/router?id=relaunch)
   */
  reLaunch(options?: ReLaunchOptions): void;

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   *
   * 参考: [http://uniapp.dcloud.io/api/router?id=switchtab](http://uniapp.dcloud.io/api/router?id=switchtab)
   */
  switchTab(options?: SwitchTabOptions): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面
   *
   * 参考: [http://uniapp.dcloud.io/api/router?id=navigateback](http://uniapp.dcloud.io/api/router?id=navigateback)
   */
  navigateBack(options?: NavigateBackOptions): void;

  /**
   * 发送消息
   */
  postMessage({ data: MessageOption }): void;

  /**
   * 检测h5中的小程序环境
   * @param func
   */
  getEnv(func: (res: EnvCallbackRes) => void): void;
}

interface EnvCallbackRes {
  // App
  plus: boolean;

  // 微信小程序/支付宝小程序
  miniprogram: boolean;

  // 百度小程序
  smartprogram: boolean;
}

interface MessageOption {
  [key: string]: any
}

interface ShowLoadingOptions {
  /**
   * 提示的内容
   */
  title?: string;
  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask?: boolean;
  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: () => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

interface NavigateToOptions {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
   */
  url?: string;
  /**
   * 窗口显示的动画类型
   * - auto: 自动选择动画效果
   * - none: 无动画效果
   * - slide-in-right: 从右侧横向滑动效果
   * - slide-in-left: 左侧横向滑动效果
   * - slide-in-top: 从上侧竖向滑动效果
   * - slide-in-bottom: 从下侧竖向滑动效果
   * - fade-in: 从透明到不透明逐渐显示效果
   * - zoom-out: 从小到大逐渐放大显示效果
   * - zoom-fade-out: 从小到大逐渐放大并且从透明到不透明逐渐显示效果
   * - pop-in: 从右侧平移入栈动画效果
   */
  animationType?: 'auto' | 'none' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'pop-in';
  /**
   * 窗口显示动画的持续时间，单位为 ms
   */
  animationDuration?: number;
  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: () => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

interface RedirectToOptions {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
   */
  url?: string;
  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: () => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

interface ReLaunchOptions {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
   */
  url?: string;
  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: () => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

interface SwitchTabOptions {
  /**
   * 需要跳转的 tabBar 页面的路径，路径后不能带参数
   */
  url?: string;
  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: () => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

interface NavigateBackOptions {
  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
   */
  delta?: number;
  /**
   * 窗口关闭的动画类型
   * - auto: 自动选择动画效果
   * - none: 无动画效果
   * - slide-out-right: 横向向右侧滑出屏幕动画
   * - slide-out-left: 横向向左侧滑出屏幕动画
   * - slide-out-top: 竖向向上侧滑出屏幕动画
   * - slide-out-bottom: 竖向向下侧滑出屏幕动画
   * - fade-out: 从不透明到透明逐渐隐藏动画
   * - zoom-in: 从大逐渐缩小关闭动画
   * - zoom-fade-in: 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画
   * - pop-out: 从右侧平移出栈动画效果
   */
  animationType?: 'auto' | 'none' | 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'pop-out';
  /**
   * 窗口关闭动画的持续时间，单位为 ms
   */
  animationDuration?: number;
}
