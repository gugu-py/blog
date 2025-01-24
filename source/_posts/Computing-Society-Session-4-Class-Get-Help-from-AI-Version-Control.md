---
title: 'Computing Society: Session 4 Class, Get Help from AI, Version Control'
date: 2025-01-24 10:40:19
tags: [Computing Society]
categories: code
---

### **Session 4: Class Concept, Interact with Chatbots, Version Control**

---

#### **4.1 Class Concept and OOP Basics (30 minutes)**
- **Explanation** (10 minutes):
  - 🏛️ **Introduction to Classes** and **Objects** in Python.
  - 🛠️ Key concepts: **Attributes**, **Methods**, **self** parameter.
  - 💡 **Syntax Example**:
    - **How to define a class**:
      ```python
      class Car:
          def __init__(self, make, model):
              self.make = make
              self.model = model
          
          def drive(self):
              print(f"{self.make} {self.model} is driving.")
      ```
    - **How to create an object**:
      ```python
      my_car = Car("Toyota", "Corolla")
      ```
    - **How to call a class’s attribute and method**:
      ```python
      print(my_car.make)  # Output: Toyota
      my_car.drive()      # Output: Toyota Corolla is driving.
      ```
  - 🧠 **OOP vs Non-OOP**: Explain the differences between **object-oriented** languages (like Python) and **non-OOP** languages (e.g., Haskell).

- **📝 Simple Task (for noobs)** (10 minutes):
  - Create a basic Python class, e.g., a "Student" class with `name` and `age` attributes and a method to introduce the student.
  - Example:
    ```python
    class Student:
        def __init__(self, name, age):
            self.name = name
            self.age = age
            
        def introduce(self):
            print(f"My name is {self.name} and I am {self.age} years old.")
    
    # Create an object and call the method
    student = Student("John", 16)
    student.introduce()  # Output: My name is John and I am 16 years old.
    ```

- **🚀 Challenging Task (for advanced students)** (10 minutes):
  - Implement a complex class with **inheritance** and **method overriding**, e.g., a "Vehicle" superclass with "Car" and "Bike" subclasses.
  - Example:
    ```python
    class Vehicle:
        def __init__(self, make, model):
            self.make = make
            self.model = model
        
        def drive(self):
            print(f"{self.make} {self.model} is driving.")
    
    class Bike(Vehicle):
        def drive(self):
            print(f"{self.make} {self.model} is riding.")
    
    car = Vehicle("Toyota", "Camry")
    bike = Bike("Yamaha", "MT-07")
    car.drive()  # Output: Toyota Camry is driving.
    bike.drive()  # Output: Yamaha MT-07 is riding.
    ```

---

#### **4.2 Interacting with Chatbots for Project Assistance (20 minutes)**
- **Explanation** (5 minutes):
  - 🤖 **How Chatbots Can Help**: Use chatbots (like ChatGPT or Copilot) for **project design**, **coding assistance**, and **deployment help**.
  - 💬 Ethical Reminder: Stress the importance of **responsible use**, avoiding chatbots for academic tasks (like exams or homework).
  
- **📝 Simple Task (for noobs)** (7 minutes):
  - Use a chatbot to ask basic Python-related questions:
    - "How do I define a class in Python?"
    - "What is inheritance in OOP?"

- **🚀 Challenging Task (for advanced students)** (8 minutes):
  - Advanced students use a chatbot to help **build an HTML webpage**:
    - Prompt: "Help me create a basic HTML page with a title, heading, and paragraph."
    - Implement the chatbot's advice and enhance the page with simple CSS.

---

#### **4.3 Introduction to Version Control (Git) with GUI (10 minutes)**
- **Explanation** (5 minutes):
  - 📂 **Version Control Overview**: Why version control is essential for managing code changes and collaborating on projects.
  - 🛠️ **Basic Git Concepts**: Commits, branches, repositories.
  - 🖥️ Using **PyCharm** or **VSCode**'s built-in Git support to simplify version control through a **Graphical User Interface (GUI)**.

- **📝 Simple Task (for noobs)** (3 minutes):
  - Guide students to:
    - Create a GitHub account.
    - Initialize a repository in their IDE, make a commit, and push it to GitHub.

- **🚀 Challenging Task (for advanced students)** (2 minutes):
  - Advanced students:
    - Create and switch between branches.
    - Merge changes and resolve a basic conflict using the GUI.

