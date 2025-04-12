---
title: pip Missing dependencies for SOCKS support
date: 2025-02-13 23:17:24
tags: python
categories: code
---

When using linux with proxy, one may encounter error like this:

```bash
$ pip install -r requirements.txt 
ERROR: Could not install packages due to an OSError: Missing dependencies for SOCKS support.

WARNING: There was an error checking the latest version of pip.

```

This one line will solve the issue:

```bash
export all_proxy=''
```

