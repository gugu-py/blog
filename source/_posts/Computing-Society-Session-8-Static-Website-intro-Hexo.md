---
title: 'Computing Society: Session 8 Static Website intro(Hexo)'
date: 2025-01-24 10:42:58
tags: [Computing Society]
categories: code
---

### **Session 8: Building Websites with Hexo (Static Website Generator)**  
**Total Time: 60 minutes**

---

### **1 Setting Up the Environment** (15 minutes)  
#### Explanation:  
🔹 **Node.js** is a JavaScript runtime required for Hexo.  
🔸 **Git** is a version control tool for tracking changes and managing your codebase.  

🔹 **Version Control** Benefits:  
- Tracks changes over time.  
- Enables collaboration through branching and merging.  

#### Activity Breakdown:  
- **(5 minutes)** Installing Node.js.  
  - **Noobs Task**: Download and install Node.js from [nodejs.org](https://nodejs.org). Verify installation using `node -v`.  

- **(5 minutes)** Install and Configuring Git.  
  - Install  [Git](https://git-scm.com/)
  - **Noobs Task**: Set up Git by configuring your username and email:  
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "you@example.com"
    ```  

- **(5 minutes)** Brief introduction to version control.  
  - **Challenging Task** 🏆: Clone a simple repository from GitHub and explore it locally using Git commands.  

---

### **2 Introduction to Static Site Generators** (10 minutes)  
#### Explanation:  
🔹 **Static Website Generators**: Tools that pre-render content into static HTML files.  
🔸 **Hexo** uses Markdown for content creation, combined with templates for structure.  

🔹 **Advantages**:  
- Faster loading times compared to dynamic sites like Flask.  
- Easier to host (no server needed).  

🔸 **Comparison with Flask**:  
- Flask dynamically generates content with Python; Hexo pre-renders content as static files.  

#### Activity Breakdown:  
- **(5 minutes)** Overview of static site generators and use cases.  
  - **Noobs Task**: Compare and list examples of sites that could benefit from static vs dynamic frameworks.  

- **(5 minutes)** Brief mention of Hexo’s mechanism: Markdown to HTML via templates.  
  - **Challenging Task** 🏆: Explain how Flask templates and Hexo achieve similar outcomes with different approaches.  

---

### **3 Setting Up Hexo** (15 minutes)  
#### Explanation:  
🔹 Install Hexo and set up a project.  
- run `npm install -g hexo-cli` in your terminal(If you encounter any error, switch another terminal)
- go into your project directory using `cd <foldername>`
- run `hexo init my-blog` (`my-blog` can be changed to whatever name you want)
- run `cd my-blog` and `npm install` (This will install the dependency)
- (Optional) `code .` Open VScode at this directory.
🔸 Understand the file structure:  
- `source/`: Markdown files for content.  
- `themes/`: Contains templates for styling.  
- `public/`: Output directory for the generated website.  

#### Activity Breakdown:  
- **(5 minutes)** Installing Hexo and initializing a project.  
  - **Noobs Task**: Run `npm install hexo-cli -g` and initialize a new project.  

- **(5 minutes)** Understanding the file structure.  
  - **Noobs Task**: Identify key folders in the project structure and their purposes.  

- **(5 minutes)** Configuring `config.yml` for basic setup.  
  - **Challenging Task** 🏆: Modify configuration settings to include a custom subtitle and social media links.  

---

### **4 Customizing Your Hexo Website** (15 minutes)  
#### Explanation:  
🔹 Add content with Markdown, apply themes, and extend functionality with plugins.  
🔸 Markdown is simple:  
- `# Heading 1`  
- `**Bold Text**`  
- `[Link Text](url)`  

🔹 Themes define the look and feel. Plugins add extra features like search bars or SEO optimization.  

> **SEO (Search Engine Optimization)** is the process of optimizing a website to improve its visibility and ranking on search engine results pages (SERPs) for specific keywords or phrases. The goal is to attract more organic (non-paid) traffic from search engines like Google, Bing, or Yahoo.

#### Activity Breakdown:  
- **(5 minutes)** Adding and organizing content with Markdown.  
  - **Noobs Task**: Create a simple blog post in Markdown and preview it locally.  

- **(5 minutes)** Installing and applying themes.  
  - **Noobs Task**: Switch between two themes and observe the changes.  

- **(5 minutes)** Exploring plugins.  
  - **Challenging Task** 🏆: Install a plugin to add a contact form or enhance SEO.  

---

### **6.5 Deploying Your Hexo Website with Cloudflare Pages** (5 minutes)  
#### Explanation:  
🔹 **Cloudflare Pages**: A platform for deploying static websites with fast global delivery and seamless integration for Git-based workflows.  

🔹 Benefits of Cloudflare Pages:  
- Global content delivery network (CDN) for high-speed performance.
- Free proxy and proof against DDos
- Free

#### Activity Breakdown:  
- **(5 minutes)** Deploy to Cloudflare Pages:  
  - Create a repository on GitHub and push the Hexo project to it.  
  - Log in to the Cloudflare dashboard and set up a Pages project. 
  - `hexo g`
  - zip all content ==in your public folder==(not outside), that means the `index.html` is at the root directory.
  - upload the zip

  - **Noobs Task**: Complete the Cloudflare Pages setup with default settings.  
  - **Challenging Task** 🏆: Set up a custom domain or enable advanced caching options in Cloudflare’s dashboard.  Or explore other hosting options.

---

### **Wrap-Up and Q&A** (5 minutes)  
- Summarize the session with key takeaways:  
  - Hexo simplifies creating and hosting websites with Markdown and templates.  
  - Vercel offers an easy and professional way to deploy static websites.  
  - Version control (Git) helps track changes and manage your code effectively.  

- Open the floor for questions and feedback from members 🙋‍♂️.  

---
