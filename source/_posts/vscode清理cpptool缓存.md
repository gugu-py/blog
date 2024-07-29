---
title: vscode清理cpptool缓存
date: 2024-07-21 11:47:08
tags: [VScode, C++]
categories: foreigners
---


![](https://img-blog.csdnimg.cn/20190810162709150.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNjg4NTU4,size_16,color_FFFFFF,t_70)

ipch文件夹是Intelli Sense（好像是预编译头文件之类的）这个东西产生的缓存文件，占用空间很大！！！每编译一次文件就会产生ipch里对应的一个文件夹。我看了我的ipch文件夹产生了121个对应的文件夹，总共产生了6G多。。。惊人啊！

在VSCode找到设置→扩展→C/C++→Intelli Sense Cache Path，如上图。1处写明了vscode默认Intelli Sense缓存文件路径是在C盘的，2处可以更改为你要保存缓存文件的位置。据我所知，这些缓存文件删了也不影响的之前的文件的，所以可以随时删~只是每次编译又会重新产生，所以还是把缓存路径改为别的盘吧
