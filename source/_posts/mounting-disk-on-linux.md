---
title: mounting disk on linux
date: 2024-07-16 09:30:20
tags: [linux]
categories: code
---

> https://superuser.com/questions/320415/mount-device-with-specific-user-rights

To mount a device with certain rights, you can use the `-o Option` directive while mounting the device.

![a](<https://blog.gu33gu.asia/_resources/Pasted image 20240706213437.png> "a")

In the line `nosuid,nodev,nofail,x-gvfs-show,uid=gugu`, add `uid=gugu` to assign the ownership to user `gugu`. 


