---
title: 'Computing Society: Session 5+6 Flask intro and Database'
date: 2025-01-24 10:41:26
tags: [Computing Society]
categories: code
---

### **Session 5+6: Flask Introduction and Advanced Concepts**

---

#### **5.1 Environment Setup and Dependency Installation** (5 minutes)
- **Setup**:
  - 🛠️ **Install Flask and Flask-SQLAlchemy**:
    ```bash
    pip install flask flask-sqlalchemy
    ```
  - ✅ **Verify Installation**:
    - Run this sample `app.py` to confirm everything works:
      ```python
      from flask import Flask
      app = Flask(__name__)

      @app.route('/')
      def hello():
          return "Hello, World!"

      if __name__ == '__main__':
          app.run(debug=True)
      ```

---

#### **5.2 Routing in Flask** (20 minutes)
- **Basic Routing Syntax**:
  - 🌐 **Concept**: Routing links each URL to a function in Flask.
  - 📌 **Basic Route Example**:
    ```python
    @app.route('/home')
    def home():
        return "Welcome to the Sports App!"
    ```

- **Advanced Routing**:
  - 🔀 **Capturing URL Parameters**:
    - Syntax for dynamic routes, e.g., `<int:id>` or `<string:name>`.
    - **Example Task**: Create routes like `/team/<int:team_id>` for specific team details.
      ```python
      @app.route('/team/<int:team_id>')
      def show_team(team_id):
          return f"Details for Team {team_id}"
      ```
  - 🛑 **Custom Error Handling**:
    - Define error routes for user-friendly error messages:
      ```python
      @app.errorhandler(404)
      def page_not_found(e):
          return "Page not found. Please check the URL.", 404
      ```

---

#### **5.3 Template Rendering with Jinja2 and HTML Basics** (25 minutes)
- **Basic Template and HTML Syntax**:
  - 📝 **Concept**: Use templates to render dynamic HTML.
  - 💡 **HTML Basics**:
    - Create a simple `greet.html` template:
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <title>Sports App</title>
      </head>
      <body>
          <h1>Welcome, {{ name }}!</h1>
      </body>
      </html>
      ```

  - **Rendering in Flask**:
    - **Example**:
      ```python
      from flask import render_template

      @app.route('/greet/<name>')
      def greet(name):
          return render_template('greet.html', name=name)
      ```

- **Advanced Template Rendering**:
  - 🔄 **Loops and Conditionals**:
    - Use `for` loops to iterate over lists and `if` statements for conditional content.
    - **Example Task**: Create a list of teams and display them in an HTML table.
      ```html
      <ul>
          {% for team in teams %}
              <li>{{ team.name }} - {{ team.points }} points</li>
          {% endfor %}
      </ul>
      ```

  - **Filters**:
    - ✨ **Transform Text**:
      ```html
      <p>{{ team.name|upper }}</p>  <!-- Displays name in uppercase -->
      <p>Teams Count: {{ teams|length }}</p>
      ```

---

#### **5.4 Introduction to Forms in Flask** (30 minutes)
- **HTML Forms**:
  - 📋 **Basic Form Example**:
    - Create a simple HTML form to collect user data:
      ```html
      <form action="/submit" method="POST">
          <label for="teamName">Team Name:</label>
          <input type="text" id="teamName" name="teamName" required>
          <button type="submit">Submit</button>
      </form>
      ```

  - **Handling Form Data in Flask**:
    - Example route to handle form submission:
      ```python
      from flask import request

      @app.route('/submit', methods=['POST'])
      def submit():
          team_name = request.form['teamName']
          return f"Team {team_name} has been added!"
      ```

- **Flask-WTF for Forms**:
  - 📦 **Installing Flask-WTF**:
    ```bash
    pip install flask-wtf
    ```
  - 📝 **Creating a Form Class**:
    - Example of using Flask-WTF:
      ```python
      from flask_wtf import FlaskForm
      from wtforms import StringField, SubmitField
      from wtforms.validators import DataRequired

      class TeamForm(FlaskForm):
          team_name = StringField('Team Name', validators=[DataRequired()])
          submit = SubmitField('Submit')
      ```

  - **Rendering Flask-WTF Forms**:
    - Example route with a Flask-WTF form:
      ```python
      from flask import render_template
      from forms import TeamForm  # Assume forms.py contains the TeamForm class

      @app.route('/add_team', methods=['GET', 'POST'])
      def add_team():
          form = TeamForm()
          if form.validate_on_submit():
              team_name = form.team_name.data
              return f"Team {team_name} has been added!"
          return render_template('add_team.html', form=form)
      ```

  - **Creating the Template**:
    - Create `add_team.html`:
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <title>Add Team</title>
      </head>
      <body>
          <h1>Add a New Team</h1>
          <form method="POST">
	          {{ form.hidden_tag() }}
              {{ form.team_name.label }} {{ form.team_name() }}
              {{ form.submit() }}
          </form>
      </body>
      </html>
      ```

---

#### **5.5 Database Integration with SQLite and Flask-SQLAlchemy** (20 minutes)
- **Setting Up the Database and Model**:
  - 🗄️ **Define Models with SQLAlchemy**:
    - Example `Team` model:
      ```python
      from flask import Flask
      from flask_sqlalchemy import SQLAlchemy

      app = Flask(__name__)
      app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sports.db'
      db = SQLAlchemy(app)

      class Team(db.Model):
          id = db.Column(db.Integer, primary_key=True)
          name = db.Column(db.String(50), nullable=False)
          points = db.Column(db.Integer, default=0)

      with app.app_context():
          db.create_all()
      ```
- **Basic CRUD Operations**:
  - 🔄 **Add Data**:
    ```python
    new_team = Team(name="Lions", points=55)
    db.session.add(new_team)
    db.session.commit()
    ```
  - 👀 **Retrieve Data**:
    ```python
    teams = Team.query.all()
    ```
  - **Display Data**:
    - **Example Route**:
      ```python
      @app.route('/leaderboard')
      def leaderboard():
          teams = Team.query.order_by(Team.points.desc()).limit(3).all()
          return render_template('leaderboard.html', teams=teams)
      ```

---

#### **5.6 Graph Data Structure and SQL Relation (Tree Example)** (10 minutes)
- **Graph Theory Basics**:
  - 🌳 **Competition Bracket as a Tree Structure**:
    - Represents hierarchical data with parent-child relationships.

- **Tree Structure in Python with SQLAlchemy**:
  - 🔗 **Defining Parent-Child Relationships**:
    ```python
    from flask_sqlalchemy import SQLAlchemy
    db = SQLAlchemy(app)

    class Match(db.Model):
        match_id = db.Column(db.Integer, primary_key=True)
        team1_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
        team2_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
        winner_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=True)

        team1 = db.relationship('Team', foreign_keys=[team1_id])
        team2 = db.relationship('Team', foreign_keys=[team2_id])
        winner = db.relationship('Team', foreign_keys=[winner_id])

    # Sample entry
    match = Match(team1_id=1, team2_id=2, winner_id=1)
    db.session.add(match)
    db.session.commit()
    ```
  - **Query Example**: Fetch teams advancing in each round by querying the `winner_id` field.
    ```python
    # Retrieve all matches with determined winners
    matches = Match.query.filter(Match.winner_id.isnot(None)).all()
    for match in matches:
        print(f"Match {match.match_id}: Winner - Team {match.winner_id}")
    ```

- **Tree Structure in SQL**:
  - 🔗 **Parent-Child Relationships**:
    ```sql
    CREATE TABLE matches (
        match_id INTEGER PRIMARY KEY,
        team1_id INTEGER,
        team2_id INTEGER,
        winner_id INTEGER,
        FOREIGN KEY (team1_id) REFERENCES Team(id),
        FOREIGN KEY (team2_id) REFERENCES Team(id),
        FOREIGN KEY (winner_id) REFERENCES Team(id)
    );
    ```
  - **Query**: Fetch teams by bracket round:
    ```sql
    SELECT * FROM matches WHERE winner_id IS NOT NULL;
    ```
