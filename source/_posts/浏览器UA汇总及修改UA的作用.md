---
title: 浏览器UA汇总及修改UA的作用
date: 2024-07-21 11:48:16
tags: [web crawler]
categories: foreigners
---

> Photo by [freestocks.org](https://link.zhihu.com/?target=http%3A//freestocks.org) from Pexels

浏览器标识（UA）可以使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件，从而判断用户是使用电脑浏览还是手机浏览，让网页作出自动的适应。 　　

可理解为网站通过对UA标示的判别，可按相应的格式进行网页的布局调整，使用户获得更好的浏览体验。

访问这个网站：[https://tool.lu/useragent](https://link.zhihu.com/?target=https%3A//tool.lu/useragent)

页面会显示正在使用的浏览器UA、浏览器内核等数据

## 如何修改UA

对于桌面端chrome用户可以利用扩展：User Agent Switcher 来修改UA

桌面火狐用户也可以使用附件组件：User-Agent Switcher and Manager 来修改UA

手机用户修改UA则更为方便，通常依次点击：设置—通用—浏览器UA标识，即可更换或者自定义UA

下面是可以自定义UA的手机浏览器，点击名称可查看自定义教程

极速浏览器（可以自定义多个UA）、[QQ浏览器](https://link.zhihu.com/?target=https%3A//www.3xiazai.com/view/view_2781.html)、[UC浏览器](https://link.zhihu.com/?target=https%3A//jingyan.baidu.com/article/03b2f78c2740045ea237aefd.html)、[360浏览器](https://link.zhihu.com/?target=https%3A//jingyan.baidu.com/article/d8072ac4d6f1ebec95cefd19.html)

几乎所有手机浏览器都可以自定义UA，如果有不支持的请在评论区提出

下面是**不支持**自定义UA的手机浏览器

魅族手机自带浏览器、

## 下面是一些有特殊作用的UA

**1.简单搜索UA：去除百度搜索广告**

简单搜索是百度出的一款搜索无广告浏览器，因此使用这个UA在百度搜索不会看到竞价排名的广告

```
Mozilla/5.0 (Linux; Android 8.0; MI 6 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/10.3 SearchCraft/2.6.3 (Baidu; P1 8.0.0)  
```

**2.微信UA：用浏览器打开只有微信可以访问的页面**

有些网页限制只允许用微信打开，通过修改浏览器UA，使得网站误以为你是用微信内置浏览器访问的

```
Mozilla/5.0 (Linux; Android 6.0; NEM-AL10 Build/HONORNEM-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043906 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060133) NetType/WIFI Language/zh_CN
```

**3.百度网盘UA**

```
netdisk;5.5.1;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia
```

**4.塞班UA：网页会变得非常干净or原始**

```
Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba  作者：lfpwhy 链接：https://www.jianshu.com/p/314c7d4e9fda 来源：简书 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 下面是一些UA的汇总

**IE浏览器**

IE10.0

```
Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)
```

IE6.0~IE9.0

```
IE 9.0
User-Agent:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;
IE 8.0
User-Agent:Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)
IE 7.0
User-Agent:Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)
IE 6.0
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)
```

The World 2.x

```
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)
```

The World 3.x

```
User-Agent:?Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)
```

傲游浏览器

```
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)
```

腾讯TT浏览器

```
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)
```

搜狗浏览器 1.x

```
User-Agent:?Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)
```

360SE

```
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)
```

几大浏览器UA

```
safari 5.1 – MAC
User-Agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50

safari 5.1 – Windows
User-Agent:Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50

Firefox 4.0.1 – MAC
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1
Firefox 4.0.1 – Windows
User-Agent:Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1

Opera 11.11 – MAC
User-Agent:Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11
Opera 11.11 – Windows
User-Agent:Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11

Chrome 17.0 – MAC
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11
```

一些移动端设备UA

```
safari iOS 4.33 – iPhone
User-Agent:Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5
safari iOS 4.33 – iPod Touch
User-Agent:Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5
safari iOS 4.33 – iPad
User-Agent:Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5
Android N1
User-Agent: Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
Android QQ For android
User-Agent: MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
Android Opera Mobile
User-Agent: Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/build-1107180945; U; en-GB) Presto/2.8.149 Version/11.10
Android Pad Moto Xoom
User-Agent: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
BlackBerry
User-Agent: Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+
WebOS HP Touchpad
User-Agent: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.70 Safari/534.6 TouchPad/1.0
Nokia N97
User-Agent: Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaN97-1/20.0.019; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.1.18124
Windows Phone Mango
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; HTC; Titan)
```

本文部分资料参考如下，非常感谢以下作者

___

本文原创，转载请注明出处

**关于我们**

软件探索是一个致力于推荐实用软件与网站的自媒体

如果您喜欢我们的文章，欢迎关注我的[知乎专栏](https://zhuanlan.zhihu.com/appexplore)(>▽<)
