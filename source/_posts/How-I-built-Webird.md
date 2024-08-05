---
title: How I built Webird
date: 2024-07-29 21:54:53
tags: [website, re, Python, bird]
categories: code
---

# Current Situation

> Birding data management and interpretation are two gaps that need to be filled in our Zhixing. We **lack of a easy tool** to administrate as well as **a platform to show these data** to the public. Webird is born to fill these gaps.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240729212201.png> "a")

We lack of tools that is easy to use to manage the data, birding records of considerable quantity. Our school has a variety of bird species, *79 different species had been spotted* until 2024. In addition, the population of the birds is also stunning. On the March 20th in 2024, for example, we observed a swarm of around fourty Pied Avocet; the population of the coots also took the land around the internal lake every winter. Usually, we use excel to manage these data, which is stable, but requires additional effort to learn how to operate with it. Since most of our members are not computer science students, it would be too difficult for them to manage the data using excel.

We also lack of a platform to show people the data. When cooperating with the Campus Operation on the theme of 'Keeping the Weeds', we failed to persuade them to preserve the weeds permanentaly. One factor is that we did not present the data to intuitively show the effect of keeping weeds, because Excel lacks of flexibility and 'visualibility'. Not only the faculty, but also the students, are not aware of the biodiversity on our campus. During the Bird Conservation Week, participants seldom recognize the bird species, nor having a rough idea of why we are protecting them. As an amateur developer, the first step for the Bird Conservation Zhixing to raise the related awareness is to *make our data public*, and then to *make the data presents itself* to our community to tell the whole story of birds on campus.

## Similar Product

> These products are mature and powerful, but not useful for a small region like our campus.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240725114045.png> "a")

The most famous application to keep record and share these data is Ebird, developed by Cornell Lab. 

> Our goal is to gather this information in the form of checklists of birds, archive it, and freely share it to power new data-driven approaches to science, conservation and education. At the same time, we develop tools that make birding more rewarding. From being able to manage lists, photos and audio recordings, to seeing real-time maps of species distribution, to alerts that let you know when species have been seen, we strive to provide the most current and useful information to the birding community. - Ebird About page

It is one of the world's largest biodiversity-related science projects, started from long time ago, so it is quite a mature tool.

However, when using this tool to manage the records myself, I found that *Ebird does not work well on a tiny region* like our campus. Although it supports location based on latitude and langtitude, the decimals are not accurate enough to distinguish the sub-places on campus. Thus, it cannot show the overall distribution of birds on campus. Furthermore, Ebird does not support recording for bird strike on windows. These all make Ebird disqualified for the job in our Zhixing.

# History of Webird

## Initial Plan
Features:
 - A beautiful map to show birds distribution over space;
 - Record management(add/delete/filtering/edit), distinguishing normal records and strikes;
 - Species management(connected with record);
 - Gallery to show images(Optional)

I had never made a great project like this myself, so I did not take time to design the detail. I just made a list of functions like above.

The Gallery function is to greet a senior student who was the founder of the Bird Conservation Zhixing and built an app to view bird images.

## Low Code Platform (Budibase)

> Very easy, but cost and lack of customization(support DIY, but not that DIY).

This website(https://asdg.budibase.app/builder) does not require any coding experience, and has a GUI to build these pages with simple logics. It has a friendly interface to accustom your tables to store data, and a nice way to present these data using different types of chart.

However, this tools does not allow me to build a beautiful map as I expected, so this plan is dropped after some failed attempts.

## Static Website plus Excel Database (Pelican)

> Meet the requirement, but it is clumsy either to maintain or add new funtions to it.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240725104655.png> "a")
> I did not find a single screenshot of the final project. All I found was a not finished project folder. Hope you could get it through this rough image.

Pelican(https://getpelican.com/), 'Static site generator that supports Markdown and reST syntax. Powered by Python.' This tool's original aim is to help you build a content-oriented blog website, but the simplicity draws my attention. With just a line of command, I can generate the whole static website. I soon started to work using this tool.

Since this is a static website generator and one of my aim was to create a dynamic one, *I thought of a way to make it dynamic without knowing anything about database*. As I learnt how to operate with Excel using Python in the past, I created a script with several functions to use Excel as a database, not aware of myself building a database. I created several sheets as different table to store data: 
- Records(id, species unique name, quantity, time, location unique name)
- Species(id, species unique name, description, translated name)

A script was created to allow adding record data. The user just needs to write a markdown file as a post with the category `record` and current date, and after that with record data like the following format:
```yaml
LittleEgret: 3
Coot: 2
Unknown: 2
```

When generating the website, a script will automatically sync the data in these markdown posts with the Excel file, and use these aggregate functions I wrote to get the location and species' sum, average and median. To make a beautiful map, I created a post with the date 2077, so that it always stays on top, with an HTML code illustrating the map with markers embedded in it.

Although this tool achieves all the goals I set, this is still not ideal. The biggest issue is that this system lacks of an easy way for members to add records. Adding records without a GUI is completely unacceptable for any member of the Bird Conservation Zhixing. Thus, I headed another way.

## Dynamic Website from Scratch (Django)

> Meet the requirement, easy to maintain or add new function, but takes time to learn how to master it (still not quite a master of it).

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240725104937.png> "a")

I took time to learn how to operate with database(SQL) and Django through Bilibili(https://www.bilibili.com/video/BV1rT4y1v7uQ) for at least a month, and with the assistance from ChatGPT. Finally, I settled down using Django. I first followed the course on Bilibili, but did not finish the course, as I thought it was just teaching some excessive detail that is not quite useful. When I encounter some questions, I would *ask ChatGPT*, and use its answer to look on web to figure out the concept. I settled down on this method.

# Current Version

## Overall Structure

> Disjointed structure of main program and image hosting to allow better traffic experience.

I divide the system into two parts: one is the *main program* which operates with the record database, and the other one for *image hosting*. They could be built on the same server, but by doing so will allow more flexibility, if I want to build a faster image hosting platform or use a third-party one.

## Main App(Webird)

### Databases

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240729221852.png> "a")

Table `webird_records` **serves the main function of records management** and uses the `webird_birdinfo` to indicate its species and `webird_location` to show its location. The table `webird_birdclasses` categorizes the species in the table `webird_birdinfo`. 

Table `webird_img` is for the gallery function (**management of images**). Since a picture can sometimes depict at least two kinds of birds, `webird_img_species` table is developed to store the 'many-to-many' relationship between the `webird_img` and `webird_info`. It also uses a foreign key with the table `webird_location` to indicate picture's location. 

The naming of these tables and fields still need to be improved, as they are hard to remember and quite easy to cause obfuscation.

The following are some important notes on fields in some tables.
#### `webird_records`

In the table `webird_records`, the field `rtype` is for distinguishing the type of record(bird death or normal record).

#### `webird_img`

In table `webird_img`, field `src` is for the compressed image's url, while the field `ori_src` is for the url of the image with original size.

#### `webird_location`

`display` controls whether the place is displayed as a marker on the data page. For example, the place `unknown` cannot be seen as a marker on the distribution map at url `/`. (see yourself)

### Main Functions
#### Core Function: `record_query`

> Basically, the function `record_query` is to construct a SQL according to the input dictionary(filtering constrains entered by user).

Since some fields are allowed to be left blank, and the logic of filtering can be complicated(have both `AND` and `OR` logics), manually construct a `Q` query is neccesary. In addition, there are three functions need the same filter mechanism, a function was created to make code neat.

The code first go over these fields, construct sub `Q` filters, and finally add them together using the logic `AND`. Most of the fields only requires detection if it is empty, but a special case is the field `bird_class_ids`. In this field, the bird classes are transformed into a list of bird species respectively, which are then added into the sub filter `bird_filter`.

When using the code, the filter form filled by user is converted into a dictionary. Then a dictionary is passed into the function as a param to return the result of filter.

part of the code:
```python
def record_query(q_dic):
    bird_filter = None
    if 'species' in q_dic:
        species_ids = q_dic['species']
        for species_id in species_ids:
            if bird_filter:
                bird_filter = Q(bird_id=int(species_id)) | bird_filter
            else:
                bird_filter = Q(bird_id=int(species_id))
    elif 'bird_class_ids' in q_dic:
        classes_ids = q_dic['bird_class_ids']
        for classes_id in classes_ids:
            classes_id = int(classes_id)
            bird_class = BirdClasses.objects.get(id=classes_id)
            birds = bird_class.birdinfo_set.all()
            for bird in birds:
                species_id = bird.id
                if bird_filter:
                    bird_filter = Q(bird_id=int(species_id)) | bird_filter
                else:
                    bird_filter = Q(bird_id=int(species_id))

    # Other sub-filters
	# Add them all together using AND
    api_filter = Q(date__range=time_interval)
    if bird_filter:
        api_filter = bird_filter & api_filter
    if location_filter:
        api_filter = location_filter & api_filter
    if type_filter:
        api_filter = type_filter & api_filter

    return Records.objects.all().filter(api_filter).distinct()
```

#### Data Page (`/`) `show_data`

> This page(view function) is responsible for showing the overall data(the distribution map, charts) and recieve user's filter form to fill out the data.

It first takes in the form. 

If the form is valid, function `record_query` is called to filter the data according to the filter form. Then the filtered data is passed to render the `show_data.html`.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240726101923.png> "a")

Otherwise, it will render the `show_data_initial.html` with the overall data. First, locations are obtained from the database, and for each location, aggregate functions are called to get the life and death data. Then `the total live and death observed` is calculated again through aggregate functions.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240725104937.png> "a")

#### Download data in Json or CSV `record_api` and `record_get_csv`

##### Json `record_api`
After the data is filtered, there will be a button `Json` to allow export the data in the format of Json. 

```python
def record_api(request):
    q_dic = convert_querydict2dict(request.GET)
    record_result = models.record_query(q_dic)
    json_data = RecordsSerializer(record_result, many=True).data
    return JsonResponse(json_data, safe=False)
```

To make the data in Json, a **serializer** is added.

##### CSV `record_get_csv`

Data is obtained through `record_query`, and response type was specified. Then use the `writer` instance to write in the data rows.
```python
response = HttpResponse(content_type='text/csv')
response['Content-Disposition'] = 'attachment; 
	filename="data.csv"'
response.write(codecs.BOM_UTF8)
writer = csv.writer(response)
```

#### location, species, classes pages `location_view` and `species_view` and `classes_view`

Although their content are different, they have nearly the same code structure. First, the aggregated data is obtained from the database, and they are passed to the rendering. Additionally, to allow administrators to modify the content, the function also takes `POST` requests from authenticated users to get the updated content, like `name`, `description`, etc.

#### Other functions

Just use the basic filter to filter out the data accordingly, then render the data on the webpage. I ~~am just lazy~~ think it is too simple to explain.

## Image Hosting App (Pic)

### Database

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20240726104056.png> "a")

Only one table. `Ori_img` is the original image's path in the storage, while `sml_img` is for the compressed images' path. `uploaded_at` is the date when uploaded.

### Core Function: Upload and Manage Portal

It is just a simple example how an image was uploaded and displayed.

```python
def receive_img(request):
    form = ImageForm(request.POST, request.FILES)
    if form.is_valid():
        result = form.save()
        return render(request, 'copy_redirect.html', {'link': result.link})
    print("not valid image")
    return redirect('/img/add/')

def image_list(request):
    images = Img.objects.all()
    return render(request, 'image_list.html', {'images': images, })
```

## Deployment

> Initial on Tencent Lighthouse and Vercel, but the deployment was complicated, so I changed to Google Cloud Run.

I hate deployment, since it always requires me to do configuration stuffs which are annoying. However, to make my application online, I have to do it.

### Host Python things

> Hosting a Python website is suffering. Finally, I host it on Google Cloud Run.

I first managed to deploy my code on a raw server in Tencent Cloud. I managed to configure the Nginx, but failed, despite the fact that I studied the tutorials on the Internet for hours. I then found vercel, but the configuration file was just too complicated, and ChatGPT could not help me. **I finally turned to Google Cloud Run**, which has an example project which is quite simple. It just has an additional `proc` file and a `docker` configuration for me to complete. With little modification, my application successfully got online.

### Bucket

Since my application has media and static files, storing them in the Docker is unacceptable. I used Google's bucket to host both my media and static files. This is again an annoying task,  since the configuration was still a bit complex.

First, you will need `django-storages[google]` and `gcsUtils` in your Python Environment. Then add in the `settings.py`:

```python
STORAGES = {
    "default": {
        "BACKEND": "storages.backends.gcloud.GoogleCloudStorage",
        "OPTIONS": {
            "location": "media/",
        },
    },
    "staticfiles": {
        "BACKEND": "storages.backends.gcloud.GoogleCloudStorage",
        "OPTIONS": {
            "location": "static2/",
        },
    },
}

GS_BUCKET_NAME = os.getenv('GS_BUCKET_NAME')
GS_PROJECT_ID = os.getenv('GS_PROJECT_ID')
GS_DEFAULT_ACL = os.getenv('GS_DEFAULT_ACL')

GS_FILE_OVERWRITE = False

GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    os.path.join(BASE_DIR, 'gcpCredentials.json'),
)

BUCKET_URL = os.getenv('BUCKET_URL')

STATIC_URL = os.path.join(BUCKET_URL, 'static2/')
STATIC_ROOT = os.path.join(BASE_DIR, 'static2')

MEDIA_URL = os.path.join(BUCKET_URL, 'media/')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

Since it's in production, these variables are loaded from the environment(I recommend you to do so). `GS_CREDENTIALS` should be loaded from the `Secret`, but the configuration was rather complex~~(lazy)~~. So, instead, I loaded it from a credential file.

Create a new file `gcsUtils.py` in the same directory with `settings.py`:

```python
from storages.backends.gcloud import GoogleCloudStorage

Static = lambda: GoogleCloudStorage(location='static')
Media = lambda: GoogleCloudStorage(location='media')
```

Although there are just a few lines of modification, it takes me a week to figure them out. Crazy.

### Database

If you want to get a database directly, the cost is significant. To save some money, I chose the lighthouse server on Tencent, and installed the MySQL myself. The server has 2 kernel and 2GB RAM, cost only 45 RMB per month.

### Cloudflare(optional)

I used Cloudflare as my DNS server to reduce bots' requests, to save some network fee.

# Future

There are always things to improve. For example, since the google cloud run costs, it would still better to run my code on a lighthouse server, using the Baota([宝塔面板 (bt.cn)](https://www.bt.cn/new/index.html)). Also, the **readability** of my code should be better. Variables' name and annotation should be less ambiguous and 'random'. There are also **safety concern**, like the image host lack of mechanism to prevent inline linking. There are also lots of other things... ...

Apart from technical improvement, this project lack of social construction, since this project is built by myself alone. I am also looking for contributers to help me maintain and update this project(maybe).

# Personal Reflection

**It was such a rewarding journey.** I learnt almost every process of making a working dynamic website by myself, surprisingly for the first time. It was just a dream when I decided to make this project, and I was not certain I could finish it some day. However, I did it, thanks to my dedication and generative AI which empowered my learning speed.

> _“The future belongs to those who believe in the beauty of their dreams.”_ — Shoyo Hinata "Haikyuu!!"
