# Flask Leaderboard App

## Overview
The Flask Leaderboard App is a web application built using Flask and MySQL that allows players to enter their names and game times. The application maintains a leaderboard that displays the players and their corresponding game times.

## Project Structure
```
flask-leaderboard-app
├── app.py
├── src
│   ├── models.py
│   ├── routes.py
│   └── db.py
├── templates
│   ├── index.html
│   └── leaderboard.html
├── static
│   ├── css
│   │   └── style.css
│   └── js
│       └── main.js
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flask-leaderboard-app
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the MySQL database**
   - Create a MySQL database for the application.
   - Update the database connection settings in `src/db.py`.

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Access the application**
   Open your web browser and go to `http://127.0.0.1:5000`.

## Usage
- On the home page, players can enter their names and game times.
- After submitting, players will be redirected to the leaderboard page, which displays the top players and their game times.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.