---
title: 'Computing Society: Session 9 Intro to Database'
date: 2025-01-24 10:43:41
tags: [Computing Society]
categories: code
---

📚 **Session Note: Introduction to Databases**

**Total Time: 60 minutes**

---

### **1. Why Databases Are Important** 🗂️ (10 minutes)

#### Explanation:

- 🔍 **Overview:**
    
    - Databases store, manage, and retrieve data efficiently.
    - Modern applications heavily rely on databases to power features like user profiles, transactions, and search functionalities.
- 📖 **Examples:**
    
    - **E-commerce:** Customer information, orders, and product inventories.
    - **Social Media:** User posts, comments, and friend connections.
    - **Gaming:** Player progress, scores, and game states.

#### Activity Breakdown:

- **(5 minutes)** Introduction to the importance of databases and examples.
    - **Noobs Task:** Identify 3 real-world applications that likely use databases.
- **(5 minutes)** Group discussion on where data might be stored in these applications.

---

### **2. Types of Databases** 🛠️ (10 minutes)

#### Explanation:

- 🛠️ **SQL Databases:** Structured data stored in tables (e.g., MySQL, SQLite, PostgreSQL).
    
- 🌐 **NoSQL Databases:** Flexible schema for unstructured data (e.g., MongoDB).
    
- 🔮 **Vector Databases:** Optimized for AI and similarity searches (e.g., Pinecone).
    
- **Focus for This Session:** SQL (relational databases).
    

#### Activity Breakdown:

- **(5 minutes)** Overview of SQL vs. NoSQL with examples.
    - **Noobs Task:** Match example data to SQL or NoSQL.
- **(5 minutes)** Group brainstorm on potential use cases for vector databases.

---

### **3. Hands-On: SQL Basics** 🔧 (25 minutes)

#### Explanation:

- ⚙️ **Environment Setup:**
    - Create a virtual environment using `conda`:
        
        ```bash
        conda create -n db_session python=3.10 -y
        conda activate db_session
        ```
        
    - Install required Python packages:
        
        ```bash
        pip install sqlite3 SQLAlchemy
        ```
        
    - Initialize a local SQLite database.

#### Activity Breakdown:

- **(5 minutes)** 🤓 **Simpler Example**:
    - Demonstrates how to create and query a SQLite database.

```python
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("example.db")
cursor = conn.cursor()

# Create a table
cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
);
""")

# Insert data
cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 25))
conn.commit()

# Query data
cursor.execute("SELECT * FROM users")
print(cursor.fetchall())

conn.close()
```

- **(15 minutes)** 🏆 **Challenge Example**:
    - Build a simple application with a user interface for data input.

#### Example Data to use:

Here are some example data entries you can test, along with the code to insert them into the database:

##### Example Data:

|Name|Age|
|---|---|
|Bob|30|
|Charlie|22|
|Diana|28|
|Edward|35|
|Fiona|24|

##### Code to Insert Example Data:

```python
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("example.db")
cursor = conn.cursor()

# Example data
example_data = [
    ("Bob", 30),
    ("Charlie", 22),
    ("Diana", 28),
    ("Edward", 35),
    ("Fiona", 24)
]

# Insert example data into the table
cursor.executemany("INSERT INTO users (name, age) VALUES (?, ?)", example_data)
conn.commit()

# Query data to verify insertion
cursor.execute("SELECT * FROM users")
print("Data in the database:")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, Name: {row[1]}, Age: {row[2]}")

conn.close()
```

##### Expected Output After Insertion:

```
Data in the database:
ID: 1, Name: Alice, Age: 25
ID: 2, Name: Bob, Age: 30
ID: 3, Name: Charlie, Age: 22
ID: 4, Name: Diana, Age: 28
ID: 5, Name: Edward, Age: 35
ID: 6, Name: Fiona, Age: 24
```

This code adds multiple rows of data at once using the `executemany` method, ensuring efficient batch insertion.

---

### **4. SQL Injection and Its Prevention** 🚨 (10 minutes)

> Warning! Do not use the knowledge here to break legacy systems. Hacking is illegal.

#### Explanation:

- **Concept:**
    
    - SQL injection exploits vulnerabilities in SQL queries.
    - Example: A malicious user provides `"1 OR 1=1"` as input.
- ⚠️ **Breaking the Code with SQL Injection:**
    
    - Suppose we modify the challenge example and do not use parameterized queries.

```python
# Vulnerable code
user_input = "1 OR 1=1"
cursor.execute(f"SELECT * FROM users WHERE id = {user_input}")
print(cursor.fetchall())
```

- **What happens?**
    
    - The input `"1 OR 1=1"` bypasses the intended logic, potentially exposing all user records.
- **Example Output:**
    
    ```
    [(1, 'Alice', 25), (2, 'Bob', 30), ...]  # Exposes all data
    ```
    

#### Activity Breakdown:

- **(5 minutes)** Try a basic SQL injection and observe the consequences.
- **(5 minutes)** ✅ **Prevention:** Use parameterized queries to prevent user input from altering the SQL logic.

```python
# Safe parameterized query
cursor.execute("SELECT * FROM users WHERE id = ?", (1,))
```

---

### **5. Introducing ORM with SQLAlchemy** 🐍 (10 minutes)

#### Explanation:

- 🤔 **Why ORM:**
    
    - Simplifies database interactions by using Python objects.
    - Abstracts raw SQL queries, making code cleaner and less error-prone.

- 📜 **SQLAlchemy Basics:**
    
    1. Define models (tables as Python classes).
    2. Perform ==CRUD operations== (Create, Read, Update, and Delete) using the ORM interface.

#### Activity Breakdown:

- **(5 minutes)** Define a simple SQLAlchemy model and create tables.

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

# Define a model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

# Setup database
engine = create_engine("sqlite:///example.db")
Base.metadata.create_all(engine)
```

- **(5 minutes)** Perform CRUD operations.

```python
Session = sessionmaker(bind=engine)
session = Session()

# Add a user
new_user = User(name="Bob", age=30)
session.add(new_user)
session.commit()

# Query users
users = session.query(User).all()
for user in users:
    print(user.name, user.age)
```

---

### **Wrap-Up and Q&A** (5 minutes)

- Summarize the session with a quick review of key concepts 📖.
- Open the floor for questions and additional clarifications 🙋‍♂️.