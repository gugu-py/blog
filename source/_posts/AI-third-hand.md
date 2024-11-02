---
title: AI third hand
date: 2024-11-01 20:29:04
tags: [AI, workflow]
categories: thought
---

# Workflow to Make AI Your Third Hand

## Introduction

As someone who loves coding, I know it can be a bit overwhelming at times. But AI changes everything. I’ve found that working with AI can simplify the app development process in ways I never expected. Let me share how I’ve integrated AI into my workflow to help me build apps and websites more smoothly.

## 1. Ideation

Every great project starts with a solid idea. **Brainstorming** is key, and I’ve found that bouncing ideas off AI can lead to some exciting possibilities. For Webird, I used AI to explore features that could make a real impact, allowing me to refine my initial concept.

## 2. Defining Functions

Once you have your idea, it’s essential to dig deeper into its specific functions. **The more detailed you can be, the better.** Do this by yourself or with AI. When I was working on a QR code generator app, I prompted AI with the following:

```plaintext
I want to build a React app. The user can enter a string, and it will turn the string into a QR code and show it on the screen. The user is allowed to add background, change the color of the code, add captions, etc., to decorate it. Finally, the user can download it.
```

This helped me clarify the features I wanted and set a clear direction for the development process.

## 3. Selecting Your Tech Stack

Next, it’s time to choose the technologies that will help you achieve your app's functions. Personally, I love using React for the front end, and I’m a big fan of FastAPI and Flask for the back end. For example, when I wanted to create a live website where users could send messages with meme names, I used this prompt:

```plaintext
I want to make a Python script that will host live on a website. Maybe use React to build the front end. On the website, users can send messages that contain the name of the meme. Then the message will go into the live, and the website will play the sound of the meme until any user interrupts it by sending 'drop' to play the sound of an iron tube dropping sound. What module am I using?
```

AI suggested several options, and I decided to go with FastAPI using WebSocket for real-time communication, which fit my needs perfectly.

## 4. Planning the Project

With your tech stack in place, it’s time to create a rough plan for how you’ll build your app. Having a structured outline makes a world of difference. **This rough plan keeps AI from forgetting the original goal.** Prompt AI to develop a plan based on the specified desired functions and features.

## 5. Coding with AI

Now comes the fun part—coding! I’ve found that AI is most effective when you start with simple tasks. **Begin with basic functions and gradually tackle more complex features.** If you find the app getting too complicated, take the reins on the overall code and let AI assist with smaller segments instead of the full code.

For instance, I had AI help me set up routes in my FastAPI project first, and then add more detailed function later. 

## 6. Testing and Troubleshooting

Test everything locally. If something isn’t working right, don’t panic—just pivot to troubleshooting. **Describe what is going wrong to the AI as detailed as you can.** When I ran into an issue with an icon not displaying in my meme app, AI provided insights that helped me resolve a CSS problem I had missed.

## 7. Enhancing Design and User Experience

Aesthetics matter! After coding, it’s time to make your app visually appealing. Prompt AI using keywords 'modern', 'reactive', etc. Provide enough detail to AI for how the buttons, font look like. For my bird conservation blog, AI helped me select color schemes that really enhanced the look and feel of the site.

## 8. Conclusion

In summary, integrating AI into my coding workflow has made the process not only easier but also more enjoyable. By following this structured approach—from ideation to design—you can harness AI as your third hand in app development. I encourage you to give it a try and share your experiences or any questions you might have.

## Some Examples

These are some applications that I completely used AI to make:
- [gugu-py/hash: Create a unqiue slice of your reality.](https://github.com/gugu-py/hash)
- [gugu-py/ascii-cube](https://github.com/gugu-py/ascii-cube): a rotating cube in react.js, similar to donut.c
- [gugu-py/nothing](https://github.com/gugu-py/nothing)
- [gugu-py/qr-code-generator](https://github.com/gugu-py/qr-code-generator)
