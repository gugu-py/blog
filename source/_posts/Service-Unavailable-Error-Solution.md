---
title: Service Unavailable Error Solution
date: 2024-10-14 18:30:07
tags: [Flasks, Python, website]
categories: code
---
# Debugging 'Service Unavailable' Errors in Dockerized Flask Apps with Gunicorn

> Deploying a Flask app with Docker and Gunicorn can sometimes lead to frustrating `"Service Unavailable"` errors without helpful logs. This post explains why these errors occur and how to fix them effectively.

## The Problem

Gunicorn often suppresses error messages, making troubleshooting "Service Unavailable" errors difficult. This lack of visibility can hide issues like missing dependencies or incorrect configurations, leading to wasted time and confusion.

## The Solution

### 1. Use Flask for Testing
To easily spot errors, start by updating the Dockerfile to use the Flask development server:

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Build and run the Docker container:

```bash
docker build -t flask-app .
docker run -p 8080:8080 flask-app
```

This approach makes it easier to identify any missing dependencies or configuration problems before deploying the production version.

### 2. Switch to Gunicorn for Production
After resolving any issues, update the Dockerfile to use Gunicorn for production:

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD exec gunicorn --bind :$PORT --workers 2 --threads 4 --log-level debug app:app
```

Setting the log level to `debug` helps reveal more detailed information if something goes wrong, making it easier to identify potential problems.