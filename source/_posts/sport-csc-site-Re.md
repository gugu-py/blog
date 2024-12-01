---
title: How I built sport-csc.site
date: 2024-07-18 22:55:26
tags: [website, re, Python, recommended]
categories: code
---

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318104320.png> "a")
> How does a website work?
> An example -> sport-csc.site


## structure of a website
![](<https:/blog.gu33gu.asia/_resources/a0cfd58f8f527b78c2ac36046b79978.jpg> "a")
> The **back end** refers to parts of a computer application or a program's code that allow it to operate. 
> The layer above the back end is the **front end** and it includes all software or hardware that is part of a user interface.
>  (www.techtarget.com)

## Database
> A database is an organized collection of structured information, or data, typically stored electronically in a computer system. ([What Is a Database | Oracle](https://www.oracle.com/database/what-is-database/))

Database is a place where we store our data. Data within the most common types of databases in operation today is typically modeled in rows and columns in a series of tables to make processing and data querying efficient, its term is called **Relational Database**. Usually, the language SQL is used to operate it.
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317202330.png> "a")
This is a table to store information of houses. U can see 3 types of information are included: id, name, color. There is sth. special on id's icon. That means it is the **primary key**. In a typical database, every record has its unique primary key.

There is another type of key, called **foreign key**. This type of key connects records and records, even from different tables! Usually, foreign key use its id to describe the reference target.
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317202700.png> "a")
This is a table to store different players. Each of the player has their primary key(id), and also foreign keys (house_id) to connect it with the house table. This example shows how foreign key connect records in two different tables.
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317203029.png> "a")
This table stores information of every match. It uses foreign key to connect records from the same table(see the fields last_match_id).

## Back end
In this website, we use Flask as our Backend system. Flask allows us to build the website in a very neat way, and can be deployed on a light server (make our budget more sustainable). 
![](<https:/blog.gu33gu.asia/_resources/d35e8209171771b082b6a33310ca6ce.jpg> "a")
A more detailed structure.
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317204020.png> "a")
all_matches.html:
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317204202.png> "a")
This is a rough example of how the home page works. The detailed render basics will be introduced in the front end part.
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240317204431.png> "a")
There are many other view functions, with similar structure.

## Front End
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318084717.png> "a")
Front end is the place where clients see things. There are many pages in a website. In the past, programmers code every page manually. In order to make their life more easier, **template** was developed. By using template, we can reuse code effectively, and achieve dynamic views(when used with database). For example:
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318085643.png> "a")
The code enables us to display the management page of a single match, allowing people in the Olympic core team edit the score status. In our python code, we first pass on parameters to our template, using `context` variable.
The page would look like this:
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318085908.png> "a")
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318090202.png> "a")
A more detailed description.

## Deployment and Optimization
After you have done your coding, then you would want to **deploy your code** on a server, so that others can appreciate your masterpiece. However, deployment can be a very frustrating process. There are many things needed to be noticed, so that clients' experience can be **optimized**.

### Deploy on a server
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318091155.png> "a")
There are many ways to deploy code. These ways can be mainly classified as: **serverless**, and **server**. Serverless is rather complicated, so we used the later.
We first rent a lighthouse server on Tencent cloud(we now learnt this is not the best solution). 
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240318091559.png> "a")
It looks very cheap, only 30 RMB. In the end, we chose a solution with 45 RMB/month. For the reason why we choose servers outside mainland, it is because the government forbid people to normally access to a website with a server in mainland without **ICP filing**. The process of filing would cost almost a month or more, so we choose servers outside mainland.
Running your website is rather simple if you want to do it simple without Nginx.
``` shell
lighthouse@VM-8-17-ubuntu:~$ sudo sh ./olpk.sh
```
olpk.sh:
```
#!/bin/bash

cd /home/lighthouse/olympics-csc

nohup python3 -u main.py > nohup.log 2>&1 &
```
It is very similar to running locally.

### Optimization
The website is very slow if you access it directly -> https://dev.sport-csc.site
One factor that affects the speed of access is the location of server and client. Our server is located in Singapore, but we are in mainland(or Hongkong since our VPN). That is quite a long distance. To resolve this, I used a technology called **CDN**.

> A **content delivery network** or **content distribution network** (**CDN**) is a geographically distributed network of [proxy servers](https://en.wikipedia.org/wiki/Proxy_server "Proxy server") and their [data centers](https://en.wikipedia.org/wiki/Data_center "Data center"). (en.wikipedia.org/wiki/Content_delivery_network)

This kind of system allowed proxy servers to help distribute our data, which stores the resources temporarily(like 5 minutes), when the resources was requested by a client.
The detailed mechanism of CDN is quite complicated, so this article is not going talk about the technical detail.

Another way we used, was to **distribute resources on different servers**. A regular size of a page is only a few kb, unless it has media files, like photos. We used a **photo hosting platform** to store and request photos.
[picture of photo hosting]

Using these techniques, our website became very smooth.

