---
title: 'Computing Society: Session 3 Functions, Modules, and Data Structure'
date: 2025-01-24 10:38:25
tags: [Computing Society]
categories: code
---

### **Session 3: Functions, Modular Programming, and Data Structures** 🖥️💡

#### **Total Duration**: 60 minutes ⏳  
**Goal**: Students will understand functions, modular programming, and basic data structures (lists, dictionaries, and arrays) in both Python 🐍 and C++ 💻. They will apply this knowledge by building modular programs and manipulating data structures.

---

### **3.1 Understanding Functions** 🔄
**Time Allocation**: 15 minutes ⏰

#### **Concept Explanation**:
- **What are Functions?** ⚙️  
  A function is a block of organized, reusable code that performs a specific task. It helps break down programs into smaller, manageable sections, improving readability and reducing code repetition.

- **Mechanism**: 🔧  
  When a function is called, the program jumps to that function, performs its task, and returns control to the calling code, optionally with a result (return value). Functions can accept inputs (arguments) and return outputs.

- **In Python** 🐍: Functions are defined using the `def` keyword, and return values with the `return` statement.
- **In C++** 💻: Functions are defined with a return type, function name, and parameters. C++ functions specify the type of value they return.

#### **Simple Task (for noobs)** 👶
- **Python** 🐍: Write a function that takes a user’s name as input and prints a greeting. 
  ```python
  def greet(name):
      print(f"Hello, {name}!")
  
  greet("Alice")
  ```
- **C++** 💻: Write a function that adds two numbers and returns the result.
  ```cpp
  int add(int a, int b) {
      return a + b;
  }
  
  int result = add(3, 4);
  ```

#### **Challenging Task (for advanced students)** 🎯
- **Factorial** 🔢: Write a function that calculates the factorial of a number using recursion. $n!$   
- **Fibonacci** ➰: Write a function that calculates the nth Fibonacci number using recursion.

---

### **3.2 Modular Programming** 🧩  
**Time Allocation**: 15 minutes ⏰

#### **Concept Explanation**:
- **What is Modular Programming?** 🛠️  
  Modular programming involves dividing a large program into smaller, manageable parts, often called functions or modules. Each module has a specific responsibility.

- **Mechanism**: 🛠️  
  Functions are the fundamental building blocks of modular programming. A modular program is easier to debug 🐛, understand 👓, and maintain 🔧 because each function handles one specific aspect of the program.

- **Clean Code** 🧼: Keeping functions small, giving them meaningful names, and avoiding repeated code results in more readable and maintainable programs.

#### **Simple Task (for noobs)** 👶
- **Python** 🐍: Break down a program that calculates the area of a rectangle and a circle into separate functions.
  ```python
  def area_rectangle(length, width):
      return length * width
  
  def area_circle(radius):
      return 3.14 * radius * radius
  
  print(area_rectangle(5, 4))
  print(area_circle(3))
  ```

- **C++** 💻: Create a modular program where one function takes input, and another function calculates the square of a number.
  ```cpp
  int get_input() {
      int x;
      cout << "Enter a number: ";
      cin >> x;
      return x;
  }

  int square(int x) {
      return x * x;
  }
  
  int num = get_input();
  cout << square(num);
  ```

---

### **3.3 Working with Lists, Dictionaries, and Arrays** 📚🔢
**Time Allocation**: 20 minutes ⏰

#### **Concept Explanation**:
- **Lists (Python)** 🐍:  
  A list is a mutable, ordered collection of items. You can add ➕, remove ➖, and access elements by their index.

- **Dictionaries (Python)** 📖:  
  A dictionary stores data as key-value pairs 🔑➡️, allowing fast lookup based on keys.

- **Arrays (C++)** 💻:  
  Arrays are fixed-size collections of elements of the same type 🎲. They allow direct access to elements using their index.

- **Mechanism**: 🧠  
  Lists and arrays store elements contiguously in memory, allowing fast access . Dictionaries use hashing to map keys to values for quick lookups 🔍.

#### **Simple Task (for noobs)** 👶
- **Python (Lists & Dictionaries)** 🐍: Create a list of names, add a new name to the list, and print the updated list. Then, create a dictionary with names and ages and access one of the values.
  ```python
  names = ["Alice", "Bob", "Charlie"]
  names.append("David")
  print(names)

  ages = {"Alice": 25, "Bob": 30}
  print(ages["Bob"])
  ```

- **C++ (Arrays)** 💻: Create an array of integers, and print the elements using a loop.
  ```cpp
  int arr[5] = {1, 2, 3, 4, 5};
  for (int i = 0; i < 5; i++) {
      cout << arr[i] << " ";
  }
  ```

#### **Challenging Task (for advanced students)** 🎯
- **C++ (Arrays)** 💻: Write a function to search for a number in a sorted array using binary search, with time complexity O(log n).  
   Challenge: Can you do it using recursion? 🔄

---

### **3.4 Hands-On Practice: Building Functions and Manipulating Data Structures** 🛠️  
**Time Allocation**: 10 minutes ⏰

#### **Task**:
- **Noobs** 👶: Write a function to calculate the sum of all elements in a list/array.
- **Advanced** 🎯: Write a program to implement a sorting algorithm (e.g., bubble sort, selection sort) for an array of numbers.  
   Fast sort explained in 4 minutes 📺 [fast sort (YouTube)](https://www.youtube.com/watch?v=Hoixgm4-P4M)
