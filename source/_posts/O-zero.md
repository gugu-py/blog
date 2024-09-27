---
title: O(zero)
date: 2024-09-08 19:40:38
tags: 
categories: foreigners
---
> [O(zero) (koliber.com)](https://koliber.com/articles/o-zero)


Algorithmic complexity — everyone’s favorite concept for geeking out and squeezing out performance.

You have a problem to solve. You come up with a solution and it’s O(n^2). You see that it won’t work and need to make it better. You tweak it a bit and get to linear complexity — O(n). You’re happy because things are looking brighter.

You sleep on it, and wake up with an epiphany that brings the algo complexity down to logarithmic O(log(n)) and you’re feeling pretty good about yourself. Later in the week you read a paper and realize that you can bring it down to constant time — O(1). You are done. It won’t get better than this.

Wrong!

You haven’t tried going for O(zero).

![O(zero) reigns supreme](https://koliber.com/static/images/articles/o-zero.webp)

What? Zero time? “That’s impossible”, you say. Never heard about it. Your hard core computer science professor said that constant time is as good as it gets. All of your career you heard that the best you can do is O(1).

It’s been there all along, but it was called other things.

Some code does not need to execute at all. Some tools can be thrown away. Some things don’t need to be done at all, and you’ll still accomplish a similar of better result, if you tweak something else.

You might have heard the adage that the fastest code is the code that does not get called at all? That’s what O(zero) is!

One of the most powerful questions an engineer can ask themselves is “Is there a way to get X done without doing this work at all?” Surprisingly, sometimes the answer is “yes”.

Sometimes, we do something long and complicated, where not doing anything might be a good enough solution. Sometimes we run a process once per minute, when once-per-month would suffice. Sometimes we build complicated mechanisms that are used but whose benefits are never needed (YAGNI is a close relative of O(zero) ).

Do you want to be a 10x engineer? Sometimes deciding that something does not need to be done at all provides more efficiency than doing something useless 100 times more efficiently.