---
title: How I Built iron.cs-csc.online
date: 2024-11-02 20:27:36
tags: [Re, Website, Python, ]
categories: code
---

# How I Built iron.cs-csc.online

## Introduction: Purpose and Main Function

Inspired by [财神猫猫](https://space.bilibili.com/439176875)'s live stream featuring the sound of an iron pole dropping, I decided to build a similar platform for my own enjoyment. While the original stream had functions such as triggering an iron pole drop sound, playing meme sounds upon entering, and using dynamic colors, [iron.cs-csc.online](http://iron.cs-csc.online) is more like a song request system where memes play upon clients' commands. Additionally, clients can interrupt the current meme with the powerful `drop` command.

## The Overall Structure

![[HiddenBlue/code/_resources/flowchart iron.png]]

Three main components make up this meme-streaming system:

1. **Storage Bucket**: This is where the meme sound files are stored, using a Tencent COS bucket.
2. **Frontend**: The user interface (UI) that sends client commands, displays other clients' messages, plays meme sounds, and reacts to the `drop` command, built with `React.js`.
3. **API**: An API that connects clients with the storage bucket and frontend, broadcasting messages to all clients and translating commands into URLs for the storage bucket, based on `Python FastAPI WebSocket`.

### Storage Bucket

The bucket is for storing and retrieving data. The basic setup involves creating a bucket with [Tencent COS bucket](https://www.tencentcloud.com/zh/products/cos), selecting a region outside mainland China (to avoid registration requirements). After that, you simply upload your sound files, and you're all set. More details can be found in the official documentation. The sound files I used are from [SoundEffectsArchive](https://github.com/Schutzecute/SoundEffectsArchive).

For additional security, I recommend using your own domain instead of the one provided by Tencent COS.

### API

There are numerous ways to build an API, but `FastAPI` was my choice for its simplicity.

To connect with the COS bucket, you’ll need the `coscmd` library from Tencent. Follow the [official documentation](https://cloud.tencent.com/document/product/436/10976) to configure `CosConfig` with the basic domain configuration method.

The process of handling client messages and broadcasting them:
![[HiddenBlue/code/_resources/Pasted image 20241102162325.png]]

### Frontend

The app connects to a WebSocket server to receive and send chat messages in real-time. Users can send messages with meme names or `drop` commands, triggering the 'iron pole drop' effect. The app displays the latest 10 messages in a chat component. When a meme message is received, the meme name appears as a pop-up, and the associated sound plays briefly. User inputs are limited to 50 characters, and there’s a 1.5-second interval between messages to prevent spamming.

## Implementation Details and Deployment

The link to the repo: [gugu-py/iron-pipe-open](https://github.com/gugu-py/iron-pipe-open). Feel free to check out the code.

For the API, I deployed it on a [Tencent Lighthouse](https://cloud.tencent.com/document/product/1207) instance for 45 RMB/month. The frontend is hosted on Tencent COS bucket alongside the sound files, costing around 1 RMB per month, depending on the data transfer rate.

## Possible Improvements

Future expansions include adding more sound files.

Additionally, a SQL database could be used to manage the sound files and names more effectively for an improved command experience. ~~The absence of this isn’t due to a lack of skill.~~

> Special thanks to 财神猫猫 for providing guidance and encourage me to complete this project.
