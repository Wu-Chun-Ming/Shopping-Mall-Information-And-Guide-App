import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
db = sqlite3.connect('users_info.sqlite')

cursor = db.cursor()

# Create 'users' table
db.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)
''')

users = [
    {
        "username": "john_doe92",
        "password": "Passw0rd!"
    },
    {
        "username": "jane_smith23",
        "password": "5ecureP@ss"
    }
]

def insert_user(username, password):
    try:
        cursor.execute('''
            INSERT INTO users(username, password)
            VALUES (?, ?)
        ''', (username, password))
        
        # Commit the transaction
        db.commit()
        print(f"Inserted user: {username}")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

for user in users:
    insert_user(user['username'], user['password'])

input("Database and tables created successfully.")