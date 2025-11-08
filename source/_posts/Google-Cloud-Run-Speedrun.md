---
title: Google Cloud Run Speedrun
date: 2025-11-08 13:25:18
tags: [re, deployment]
categories: code
---

### 1. setup Google Cloud Run

click `Connect Repo`

choose your repository and select `Dockerfile`; choose your git `branch`

use reasonable `service name`  and `region`

select `request-based` billing

set `auto-scaling` from `0` to a small number (no need for 100), save budget

#### 1.0 You need a working Dockerfile

template:

```Dockerfile
# Use the official lightweight Python image
FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=8080
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app.py

# Expose port 8080 for the application
EXPOSE 8080

# Use Gunicorn as the application server
# RUN python init.py
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app", "--log-level", "debug"]

```

### 2. trigger by tag instead of commit

#### 2.0 the setup

click `edit repo settings`

in Event, select `Push new tag`

set Tag to `^v.*$`, so that when a new tag like `v1.0.1`, `v0.2.1` is tagged in the newest commit, build will be triggered

#### 2.1 push with tags

```bash
git tag v1.0.0 # set tag to current commit or right click on current commit on VScode
git push --tags # push all tags
```

then a new build is triggered.

### 3. if you use google cloud storage

#### 3.0 create a service account

goto `IAM&Admin`, left panel `Service Account`, click `Create Service Account`

give reasonable name

grant role of `Storage Object Admin` or other role you prefer

click on `action ...`, `manage keys`, and download the json key (keep it secure)


