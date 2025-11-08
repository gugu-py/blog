---
title: Hexo Re
date: 2024-07-17 13:44:19
tags: [Hexo, re, Website, recommended]
categories: code
---

## 0. Intro

For some reasons(see the blog yourself), I wanted to **start my personal blog**. The requirements of the blogger platform are: easy maintenance(including deployment and easy fee), and allowing custom configurations(themes, domain, font, etc.). In order to meet these requirements ~~as well as to be cool~~, I finally chose Hexo, a .js based static website generator.

### why Hexo

About the website, I first thought of flasks, as it can do most of the job if you code it properly. However, coding stuffs is time consuming when it comes to make something elegant from scratch. Although there was a good and open-source one on GitHub called [Blog_mini](https://github.com/xpleaf/Blog_mini), I still forsaked the plan, as I just don't prefer to do **too much programming** this time, even I merely need to make modification on finished product. In addition, since the website using flask will be based on a database. When it comes to deployment, it will **cost** a bit. In that way, I dropped my plan about dynamic ones~~, although it would be a perfect opportunity to show off~~.

The only option for me, then, is **static website**. I would definitely NOT code one from scratch, so I needed to choose a pre-built tool to help me generate one. Compared to other pre-built generators, Hexo has a **good community eco-system**, making its customization effective. Alongside its **aptness to deploy** and intergation with git for version control, this becomes an ideal tool to keep my blogs.

## 1. Environment

Hexo requires Node.js and git. To install the prequisites and Hexo itself, the official document of Hexo has given detailed steps to follow along. Here is a copy from [Documentation | Hexo](https://hexo.io/docs/).


### Requirements

Installing Hexo is quite easy and only requires the following beforehand:

-   [Node.js](http://nodejs.org/) (Should be at least Node.js 10.13, recommends 12.0 or higher)
-   [Git](http://git-scm.com/)

If your computer already has these, congratulations! You can skip to the [Hexo installation](https://hexo.io/docs/#Install-Hexo) step.

If not, please follow the following instructions to install all the requirements.

### Install Git

-   Windows: Download & install [git](https://git-scm.com/download/win).
-   Mac: Install it with [Homebrew](https://brew.sh/), [MacPorts](http://www.macports.org/) or [installer](http://sourceforge.net/projects/git-osx-installer/).
-   Linux (Ubuntu, Debian): `sudo apt-get install git-core`
-   Linux (Fedora, Red Hat, CentOS): `sudo yum install git-core`

> **For Mac users**
> 
> You may encounter some problems when compiling. Please install Xcode from App Store first. After Xcode is installed, open Xcode and go to **Preferences -> Download -> Command Line Tools -> Install** to install command line tools.

### Install Node.js

Node.js provides [official installer](https://nodejs.org/en/download/) for most platforms.

Alternative installation methods:

-   Windows: Install it with [nvs](https://github.com/jasongin/nvs/) (recommended) or [nvm](https://github.com/nvm-sh/nvm).
-   Mac: Install it with [Homebrew](https://brew.sh/) or [MacPorts](http://www.macports.org/).
-   Linux (DEB/RPM-based): Install it with [NodeSource](https://github.com/nodesource/distributions).
-   Others: Install it through respective package manager. Refer to [the guide](https://nodejs.org/en/download/package-manager/) provided by Node.js.

nvs is also recommended for Mac and Linux to avoid possible permission issue.

> **Windows**
> 
> If you use the official installer, make sure **Add to PATH** is checked (it’s checked by default).

> **Mac / Linux**
> 
> If you encounter `EACCES` permission error when trying to install Hexo, please follow [the workaround](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) provided by npmjs; overriding with root/sudo is highly discouraged.

> **Linux**
> 
> If you installed Node.js using Snap, you may need to manually run `npm install` in the target folder when [initializing](https://hexo.io/docs/commands#init) a blog.

### Install Hexo

Once all the requirements are installed, you can install Hexo with npm:

```
<span>$ npm install -g hexo-cli</span><br>
```

### Advanced installation and usage

Advanced users may prefer to install and use `hexo` package instead.

```
<span>$ npm install hexo</span><br>
```

Once installed, you can run Hexo in two ways:

1.  `npx hexo <command>`
2.  Linux users can set relative path of `node_modules/` folder:

```
<span><span>echo</span> <span>'PATH="$PATH:./node_modules/.bin"'</span> &gt;&gt; ~/.profile</span><br>
```

then run Hexo using `hexo <command>`

### Required Node.js version

If you are stuck with older Node.js, you can consider installing a past version of Hexo.

Please note we do not provide bugfixes to past versions of Hexo.

We highly recommend to always install the [latest version](https://www.npmjs.com/package/hexo?activeTab=versions) of Hexo and the [recommended version](https://hexo.io/docs/#Requirements) of Node.js, whenever possible.

| Hexo version | Minimum (Node.js version) | Less than (Node.js version) |
| --- | --- | --- |
| 7.0+ | 14.0.0 | latest |
| 6.2+ | 12.13.0 | latest |
| 6.0+ | 12.13.0 | 18.5.0 |
| 5.0+ | 10.13.0 | 12.0.0 |
| 4.1 - 4.2 | 8.10 | 10.0.0 |
| 4.0 | 8.6 | 8.10.0 |
| 3.3 - 3.9 | 6.9 | 8.0.0 |
| 3.2 - 3.3 | 0.12 | unknown |
| 3.0 - 3.1 | 0.10 or iojs | unknown |
| 0.0.1 - 2.8 | 0.10 | unknown |
(End of copy)

## 2. Build Respository

Select a folder for your Hexo project. *It is recommended that the path of the folder does not contain characters other than English.* Run these command to initilize Hexo.

```shell
hexo init <folder>  
cd <folder>  
npm install
```

To test the initilization, use:
```shell
hexo s
```

This will print out something like:
```
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop. 
```

And the http://localhost:4000/ will look like:
![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240715220318.png> "a")

If you see those, it means your initialization is successful.

## 3. Put into use

> `/` or `\` means the root directory of your Hexo project

### New Post

If you want to write a new post, type in the terminal:
```shell
hexo new post '<post title>'
# or
hexo new <scaffolds> '<post title>' # later explained
```

Hexo will create a Markdown file as your post file in the `\source\_posts\<post title>.md`. **Edit this markdown file to modify your blog content.**

#### Front Matter

In your newly created blog, titled `a`, for example, you will find this at the start of the file:

```yaml
---
title: '''a'''
date: 2024-07-15 22:06:57
tags:
---
```

This is called **Front Matter** in Hexo, a yaml config header. As you can see, this header contains meta-data of your blog, like the title, date, and tags. The basic idea of yaml is to use a `key: value` to let Hexo get these information. There are also other options which you can find in official document [Front-matter](https://hexo.io/docs/front-matter). In this example, I used `categories`. To use multiple value for one key, the format is `key: [value1, value2, etc.]`. In that way, my Front Matter will look like this:
```yaml
---
title: '''a'''
date: 2024-07-15 22:06:57
tags: [Anime, Frieren]
categories: Thought
---
```

After this Front Matter, you can write your content happily in Markdown now. However, if I need to add the categories every time I create a post, I will go crazy. To avoid that we should apply Scaffolds.

#### Scaffolds

This time the official document works, here is a copy:

When creating posts, Hexo will build files based on the corresponding file in `scaffolds` folder. For example:

```shell
hexo new photo "My Gallery"
```

When you run this command, Hexo will try to find `photo.md` in the `scaffolds` folder and build the post based on it. 
(End of copy)

For example, you created `a.md` in `\scaffolds\` based on `post.md`:
```yaml
---
title: {{ title }}
date: {{ date }}
tags:
categories: # this line is added; you can also add default value(s) to it
---
```

Then you can type `hexo new a '1'` to create a blog titled '1', with `categories` in the front matter. 

#### Modify post

Just edit the markdown file will work.

### Generate your site

Very simple:
```shell
hexo g
```

All the source files are in the `/public/`. They can be used to deploy on other servers.

## 4. Customization

If you want to go further by customizing your site, you will need to configure your theme.

### Basic Configuration

The basic meta-data of your blog, like authorship, title, description, etc. is configured in the `/_config.yml`. **Simply follow the comments wrote in the file to add on your information.** Part of my site configuration:

```yml
title: Less is More
subtitle: ''
description: ''
keywords:
author: HiddenBlue
language: en
timezone: ''
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: http://blog.gu33gu.asia
```

### Install Themes

Explore your theme here: [Themes | Hexo](https://hexo.io/themes/)

In this Re blog, I will use `NexT` as example.

First, get into its document website: [Getting Started | NexT (theme-next.js.org)](https://theme-next.js.org/docs/getting-started/)

Follow its tutorial to install the theme. *If you encounter any problem, turn down your VPN completely.*

```shell
cd hexo-site # your project folder
git clone https://github.com/next-theme/hexo-theme-next themes/next
```

In the `/_config.yml`, search for `theme`, and change the its value to `next` (your theme's name):
```yml
theme: next
```

Copy the content of `/themes/next/_config.yml` to a new file `/_config.next.yml`. If it is other theme, the new file's name should be `_config.<theme name>.yml`.This is the file where you can configure your theme.
### Configure your Theme

Basically, you just need to follow the comments in the `/_config.next.yaml` to edit the configuration. If you are looking for a specific setting, just search the keyword in the file, and you will locate the related key. For example, you want to enable dark mode. Search for `dark`, you will locate the line:
```yml
darkmode: true # change this to false to disable darkmode
```
There is just a few things that the comment does not state clearly. Here is the explanation for these parts:

#### Customize Menu

If you want to add your own options under the main menu, add the following code under the `menu` section in `/_config.next.yaml`:

```yaml
home: / || fa fa-home
about: /about/ || fa fa-user
Code: /categories/code/ || fa fa-code
Elucidator: /categories/thought/ || fa fa-pen-nib # newly added
tags: /tags/ || fa fa-tags # newly added
```

This will add two options linking to the category `code` or `thought`. The code after `||` is the name of icon from [Font Awesome](https://fontawesome.com/). Copy its code similar to the format as the example provided in the `/_config.next.yaml`.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240716230513.png> "a")

By adding these code, my menu became:

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240716230725.png> "a")


## 5. Deployment

### Host
There are several ways to host Hexo pages. There are mainly three ways:
- Host on GitHub (for free)
- **Host on an object storage bucket** (cost nearly none)
- Host on a server (cost)

Personally, I prefer the second option, as it has much fun. The first option has already lots of tutorials on the Internet, search them yourself.

Most of the object storage platforms, like Google, Tencent, etc., support to host static website on it. I used Tencent, because it is cheap and easy. This bucket costs based on network flowing out of the bucket. 1 GB of network costs 

All the buckets are the same to **setup the bucket**:
1. When choosing region of the bucket, just not choose area in mainland China, so that you can skip filing ~~which is shit~~ in order to get an SSL certificate. The region should be near your location to guarantee the speed.
2. set the permissions of all users to be able to view the content of file. Read only!
3. upload all the files in the `/public/` folder. Make sure the root directory of your bucket does not contain `public` folder, but the content in it(you know what I mean).
4. see the url of your bucket, then access this url on your browser. You should be able to see your landing page.

After modifying your website locally, do the following actions to **update the bucket** remotely:
1. run `hexo g`
2. sync local `public` folder and remote root directory
3. your website is then up-to-date

### Domain (Optional)

#### Register

There are many popular platforms to register domain, like Google Cloud, GoDaddy, Cloudflare, Tencent, etc. The prize varies a lot, and I suggest you can try platform in China, because they are much cheaper. I purchased a domain `gu33gu.asia` for only 6 RMB (0.9 US\$) for the first year. The regular prize for a year is 30 RMB (4.2 US\$). That is totally acceptable.

#### Add record

To let the domain function, you have to add record to trace your bucket's IP. Most bucket platform will provide its own domain, so you just add a `CNAME` record with the value of the provided domain. For example:

```
type: CNAME
name: blog (this part can be whatever you want)
target: (your bucket url)
TTL: 600 (time(in second) to trace the IP, the smaller value the better)
```

After the record takes effect(usually after the TTL time), you should be able to access through your custom domain. For example, my domain is `gu33gu.asia`, with the record's name `blog`, I am able to access my blog at `blog.gu33gu.asia`.

#### Cloudflare (Optional)
Using Cloudflare provides free `SSL` and protection against `ddos attack`(this usually won't happen). In addition, its DNS is free. 

Register an account on Cloudflare, and follow its guidance to add Cloudflare as the DNS server. 

#### SSL (Optional)
Other ways to apply SSL for your domain for free other than Cloudflare, you can try Tencent free certificate. The certificate can endure 3 months. After it expires, you need to register one again. Follow its guidance will do.

## 6. Image Hosting (Optional)

Usually your blogs contain image. **Hexo recommends remote URL**. You can either use a third-party image hosting platform, or **build your own**. I built my own using a object bucket. 

Create a folder on the root directory of your bucket called `_resources`. You should be able to access the content within using direct URL. Upload your pictures to this folder, and format all the URL in your markdown blogs.

To format them automatically, I wrote a script to help me(`imageFormat.js`):

```javascript
const fs = require('fs');
const path = require('path');

// String to replace the root directory of the images
const newRootDir = '/new/root/directory';

// Get the directory where the script is located
const directoryPath = path.dirname(__filename);

// Function to replace image paths in a single Markdown file
function replaceImagePaths(filePath, newRootDir) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }

        // Regular expression to match image paths in the format ![[path]]
        const imgRegex = /!\[\[[^\]]*_resources\/([^\]]+)\]\]/g;
        const newData = data.replace(imgRegex, (match, imgPath) => {
            const fileName = path.basename(imgPath); // Extract the file name
            const newPath = path.join(newRootDir, fileName); // Construct the new path
            return `![[${newPath}]]`;
        });

        fs.writeFile(filePath, newData, 'utf8', err => {
            if (err) {
                console.error(`Error writing file ${filePath}:`, err);
                return;
            }
            console.log(`Successfully updated image paths in ${filePath}`);
        });
    });
}

// Function to process all Markdown files in a directory
function processDirectory(directoryPath, newRootDir) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directoryPath}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            if (path.extname(file) === '.md') {
                replaceImagePaths(filePath, newRootDir);
            }
        });
    });
}

// Start processing
processDirectory(directoryPath, newRootDir);

```

Modify accordingly in reference to the comments, especially the `newRootDir` and `imgRegex`.

Put this script under the directory with your blogs (`_posts` folder), and use `node imageFormat.js` to run it. This will automatically format the image URL of all the markdown files under the same directory.

## 7. END?

I have just built a personal blog, a new body without an interesting soul. To inject soul into this meaningless body to make it of significance, I need to keep adding content into it. **Building a blog is just the beginning. Keep updating it to achieve eminence.**

> 问渠那得清如许？为有源头活水来。 ——朱熹《观书有感》

