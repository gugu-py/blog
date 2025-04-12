---
title: CSC Archive Re
date: 2025-03-22 10:46:49
tags: [Python, Flask, website, Re, recommended]
categories: code
---

# How I built archive.cs-csc.online

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250322104422.png> "a")

## It all began with a random talk...

It was a routine supper, but I happened to sit with Joseph, Giulio, and Richard Yiu. During our random conversation, as we were talking about Joseph's role at the *Challenger*, our school newspaper, he told us they were seeking to make a website to display them. I agreed to help him, and a proposal was developed soon.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250322102929.png> "a")

Right after the dinner, I began to work on this project. My knowledge on Flask and MySQL paid off, enabling me to finish the prototype less than 24 hours. I made a brief demonstration to the coreteam. Everyone was astonished by my productivity. Soon a further plan was made, with a friendly and proactive atmosphere set.


![](<https:/blog.gu33gu.asia/_resources/d466f2f80a40bed8901d2190027c806.png> "a")


We even met with the principal and the market department of the school to further propagate this project.

This project is the first most production-ready application I have ever made. Different from previous projects, I spent most of the time on improving the stability and performance instead of developing all different functions.

## Features and Cores

### Overall Design

The project ends up with 3 parts: Flask as the core unit, MySQL for database, and a seperate service for file proxy.

Given the moderate expected traffic, I chose Flask for its simplicity, ease of deployment, and proven stability. Although frameworks like FastAPI offer better performance, Flask provided the ideal balance of speed and maintainability for our use case.

For MySQL, I used it because it was the only database I was good at. MySQL is famous for its enterprise-level stability and simplicity to act with Flask, but it is also infamous for its cost. If given enough time on this project in the future, I will consider to use MongoDB as a better alternative for its flexibility and cost efficiency. (I learnt this database in a new project ClioCard.)

The reason why I decided to use a seperate file proxy, is to hide the real file blob of the pdf files. The proxy links should expire after a certain amount of time. This would protect the pdf files from unauthorized sharing. Taking account of Flask's synchronous nature, proxying one file will use a whole thread of the web server. This will severely degrade the performance when multiple users are requesting files simultaneously. Therefore, the best approach is to apply a seperate microservice. Because of the proxy unit's simplicity, I used a Cloudflare worker to do the job.

### Database Overview

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250115133012.png> "a")

I keep the database setup simple. 

The database consists of four main tables:

1. **Category**: Organizes newspaper issues into categories (`1-to-many` relationship with `newspaper_issue`).
2. **Newspaper Issue**: Stores issue metadata (e.g., `title`, `author`, `issued_time`), PDF paths, and `view_power` for access control.
3. **User**: Manages login credentials, roles, and `view_power` to enforce access restrictions.
4. **Config**: Holds global settings like stopwords for search and "About" page content.

**Key Notes**:

- **Relationships**: Categories link to issues; access control uses `view_power` matching between users and issues.
- **Focus**: Simplicity for scalability, with clear access control and category-based organization.

### Features and notable details

1. User Experience & Navigation

- **Homepage**
    - Provides a general overview of the application and its purpose.
- **Archive Viewing**
    - Seamlessly access and browse archived issues.
- **Date-based Navigation**
    - Quickly find issues by specific months or days.
- **Search Functionality**
    - Perform efficient keyword-based searches.
- **Document Viewing**
    - Easily access full documents or their text content.

2. Content Management

- **About Page Management**
    - Edit and update the "About" section directly from the admin panel.
- **Category Management**
    - Add, edit, or remove categories to organize content effectively.
- **File Uploading**
    - Upload and manage files or documents with ease.
- **Issue Management**
    - Edit or delete specific newspaper issues in the archive.
- **Stopword Management**
    - Customize and edit stopwords to improve search results.

3. User Administration & Security

- **User Authentication**
    - Enable secure login for existing users and registration for new users.
- **User Management**
    - Admins can manage user accounts, including adding, updating, or removing users.
- **Admin Dashboard**
    - A centralized panel for managing all application features and settings.

Here are some important details:

#### Viewing Issue

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123100319.png> "a")

Metadata are displayed nicely with Jinja template, while handling document display required additional effort. These document(pdf) files are stored in a private Google Cloud Storage bucket. When a file is requested, a signed url expiring in `FILE_LINK_EXPIRE_TIME_SEC` seconds will be generated to ensure security.

> I spent nights and days wrestling with Google PDF proxy issue. I even got a little depressed after figuring out the PDF viewer's strict url format. Fortunately, the idea of utilizing Cloudflare proxy as microservice saved my day.

However, since the Google PDF viewer does not support file url with `GET` parameters, I deployed a microservice for specifically handling file proxy. When a document is requested, the signed URL is sent to the proxy, which converts it into a parameter-free URL, which is then embedded into the template. When the document page is rendered by the user, the proxy forwards the request to the original signed URL. This approach effectively secures the URLs while ensuring smooth functionality.

#### Searching with fields

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123100629.png> "a")

This is achieved through SQL ORM technology, similar to [core code of Webird](https://blog.gu33gu.asia/2024/07/29/How-I-built-Webird/#Main-Functions). Being different from the core code of webird, the fields are obtained through `GET params`. Since several pages have the same searching form, a standalone template for searching field is reused.

#### Auth and Access Control

Considering some students deliver some sensitive ideas on the newspaper, we may control the access to the whole database.

Library `flask_login` is applied to manage user. I customized the original user model, where I added a column `view_power`. The `view_power` determines the power of the user to access to articles. Each document has its own view power. Only if the user has equal or greater `view_power`, he is able to access to it.

A customizable stopword list is applied to filter searching keywords. This can be modified easily by admin.

#### Admin Panel

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123101857.png> "a")

The panel can only be accessed by admin users, and its portal is only visible to admin in the menu. In this panel, I enable admin user to operate with the database in a friendly manner. It enables the admin to manage any data, including the categories, document itself, stopwords, and about (markdown). It even allows admin to add, delete, and manage the users, including their username, password, view power.

This section will introduce several notable details of some functions.

##### Upload

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123105737.png> "a")

Admin can simply fill in the form to complete an upload.

The uploaded pdf's text is extracted directly (not OCR) to ensure simplicity, using `pdfplumber`. Data type `Long text` is applied to store the text in the db. The file is uploaded to the Google storage.

##### Manage User

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123110145.png> "a")

Users can be managed on the page.

The backend makesure the admin cannot change its own name or password to improve maintainbility.

### Cache Optimization

Everything requiring db quests are cached to enhance performance and reduce cost. `flask_caching` is applied.

Every operation of questing db is written as standalone function with cache decorators. Example:

```Python
@cache.cached(key_prefix="get_archive", timeout=86400)
def get_archive() -> list:
    """
    Retrieves a list of newspaper issues that the current user has permission to view,
    ordered by issued time in descending order.

    Returns:
        list: A list of `NewspaperIssue` objects that the current user can view.
    """
    # Query for issues the current user can view
    issues = NewspaperIssue.query.filter(
        NewspaperIssue.view_power <= current_user.view_power
    ).order_by(NewspaperIssue.issued_time.desc()).all()
    
    return issues
```

Everytime admin modifies document data through admin panel, cache are deleted by calling:

```python
def update_cache(modified_issue: NewspaperIssue) -> None:
    """
    Updates the application cache to ensure consistency after a newspaper issue is modified.

    This function invalidates cache entries that might be affected by changes to the 
    given issue, ensuring stale data is removed. Specifically, it clears cached results for:
    - Issue retrieval by ID, date ranges, and specific time intervals (year, month, day).
    - Functions retrieving the archive or related metadata like issue date intervals.
    - Category-related functions to reflect potential changes in categorization.

    Args:
        modified_issue (NewspaperIssue): The newspaper issue object that was modified.

    Cache Entries Invalidated:
        - `get_issue_date_interval`: Clears the date range cache.
        - `get_archive`: Clears the entire archive cache.
        - `get_issue`: Clears the cache for the specific issue by ID.
        - `get_year_month_issues`: Clears cached issues for the issue's year and month.
        - `get_day_issues`: Clears cached issues for the issue's specific day.
        - `get_all_category`: Clears category-related caches in case of category updates.

    Returns:
        None
    """
    cache.delete('get_issue_date_interval')
    cache.delete('get_archive')
    cache.delete_memoized(get_issue, modified_issue.id)
    cache.delete_memoized(
        get_year_month_issues,
        modified_issue.issued_time.year,
        modified_issue.issued_time.month
    )
    cache.delete_memoized(
        get_day_issues,
        modified_issue.issued_time.year,
        modified_issue.issued_time.month,
        modified_issue.issued_time.day
    )
    cache.delete('get_all_category')
```

The only problem here is the `timeout` param in the decorator. You get error when using `current_app.config` to obtain expiring time. 

see more information about cache in official document:  [Flask-Caching — Flask-Caching 1.0.0 documentation](https://flask-caching.readthedocs.io/en/latest/index.html)

### Database Initialization

Remember to set `auto_increment=True` for `id` column in your models.

Because of the usage of searching in `LongText` in MySQL, we need to `add fulltext index`. The app factory is written like below:

```python
    # Initializes the database, creates tables, and ensures default records exist.
    from .models import Config as db_Config, Category  # Import your Config model
    from .utils import ini_users  # Assuming ini_users is in utils.py
    # print("ini0!!!")
    with app.app_context():
        db.create_all()  # Create all tables if they don't already exist
        
        # Ensure there is at least one Config record
        if not db_Config.query.first():
            default_config = db_Config(stopwords='')
            db.session.add(default_config)
            db.session.commit()
        Category.get_or_create_default()
        # Initialize default users or other essential data
        ini_users()
        try:
            sql = text('ALTER TABLE newspaper_issue ADD FULLTEXT INDEX idx_fulltext_content (content);')
            result = db.session.execute(sql)
        except:
            pass

```

## Deployment

### Web Service

On google cloud run. Docker build. Nice and simple.

The domain does not work at first, if you integrate it directly with the cloud run service. A Cloudflare worker is applied to proxy the default url.

```javascript
export default {
  async fetch(request, env, ctx) {
    // The target Cloud Run URL
    const targetUrl = 'https://cloud_run.url';
    
    // Construct the new URL by appending the requested path and query
    const url = new URL(request.url);
    const target = new URL(targetUrl);
    target.pathname = url.pathname;
    target.search = url.search;

    // Create a request object with the original headers, pointing to the new target URL
    const proxyRequest = new Request(target.toString(), request);
    
    // Fetch the response from the Cloud Run service
    const response = await fetch(proxyRequest);

    // Return the response, passing through the headers and status from Cloud Run
    return new Response(response.body, response);
  },
};

```

### Database

Google SQL database. Most of the fee comes from here. 

Since this project will not serve great traffic, a shared CPU is selected to reduce fee.

The access should remain private, with specific ip address. Do NOT use `0.0.0.0` to expose it to public. The database is accessed through a socket URI like this in production: 
```Python
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://username:password@/database_name?unix_socket=/cloudsql/project-id:region:instance-name"
```

### File Proxy Service

Cloudflare worker + KV database. Completely free.

1. **Create a Cloudflare Worker**:
    
    - Go to your Cloudflare dashboard and create a worker.
2. **Setup KV Namespace**:
    
    - Under "Workers," go to "KV" → "Create Namespace" → Name it (e.g., `TEMP_LINKS`).
3. **Connect KV in worker configuration**:
    
	- Under "Settings" -> "Domains & Routes" -> "Bindings":
	- ![](<https:/blog.gu33gu.asia/_resources/Pasted image 20250123114652.png> "a")
    
4. **Write the Worker Code**: plug in the proxy code: [link to Gist](https://gist.github.com/gugu-py/bc2054831abaf9e57f47d71cb4c44e3f)
    
5. **Deploy**

## Collaboration and Lessons Learned

![](<https:/blog.gu33gu.asia/_resources/b3e1ac0a958b09e402f1f01c92e66670 1.jpg> "a")

> "Just test this one more feature, please!" Their enthusiasm kept me motivated.

I would like to appreciate the effort of members (Giulio and Joseph, on two sides of the image) from the Challenger. Although being busy, they are still willing to spend time on pushing the project forward. These were what we did to make this project progress smooth and productive.

**Small team.** Smaller team is best for communication. There is only one developer for the project, so the code style is consistent.

**Spark passion.** Through multiple face-to-face meetings and random talks, the team resulted in a proactive atmosphere. We were able to develop the blueprint and feature list of the application in a few days.

**Regular Report.** The regular report of development progress not only contributes to the proactive and productive atmosphere, but also enabled new features to be tested in no time by non-tech members.

However, despite being productive and efficient most of the time, there were some incidents that greatly degraded the progress of project. Here is one lesson learnt.

**Instruct with greater care.** When one (especially non-tech) is prompted to do something unfamiliar, their proactivity will be severely impacted, and thus cause considerable delay in work. This happens when I let the Challenger coreteam member to tryout the upload panel, he misunderstood the task and thought it would involve coding. This caused the task be delayed for at least 2 weeks. After a face to face demonstration of the user-friendly admin panel, the testing is finished in no time.

## Future

There will be more customization features, such as:
- color pallete
- background image

Also, there should be mechanism to allow reset admin's password. I would like to migrate MySQL to MongoDB to reduce cost.

If having some time, I want to reconstruct the whole project, using FastAPI + Vue.js to make it more modern.

There are a lot to do to enhance its tech stack, but the most critical and most difficult thing is future maintainance. I want this archive to outlast my time at school, becoming a legacy for future generations of _The Challenger_. That's why finding someone passionate enough to maintain it after I graduate feels so crucial.

> Creating _archive.cs-csc.online_ taught me not only about web development, but also about conversations and perseverance. It reminded me why I love coding—turning small conversations into tangible, meaningful tools for our community.

