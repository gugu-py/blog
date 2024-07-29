---
title: 'Error: Unable to determine SOCKS version'
date: 2024-07-21 11:43:06
tags: [Python, linux]
categories: foreigners
---

In `~/.bashrc`, add:
```bash
export all_proxy="socks5://127.0.0.1:<port>"
```
where `<port>` is your VPN's sock port (default V2ray: 20170)

Then, problem is solved.

## python 报错 Missing dependencies for SOCKS support 解决方法

```bash
$ unset all_proxy && unset ALL_PROXY # 取消所有 socks 代理
$ pip install pysocks
```
最近在创建新的 Python Virtualenv 时出现了 `Missing dependencies for SOCKS support` 的错误，经检查后发现为 Python 本身在没有安装 pysocks 时并不支持 socks5 代理，而环境变量中则设置了 socks5 的代理。
> https://blog.csdn.net/whatday/article/details/109287343

