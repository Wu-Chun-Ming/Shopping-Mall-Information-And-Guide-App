import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
db = sqlite3.connect('mall_info.sqlite')

# Create 'shops' table
db.execute('''
CREATE TABLE IF NOT EXISTS shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    contact INTEGER,
    type VARCHAR(255),
    location VARCHAR(255)
)
''')

# Create 'event' table
db.execute('''
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL, 
    description VARCHAR(500), 
    location VARCHAR(255)
)
''')

# Create 'enquiries' table
db.execute('''
CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    enquiry VARCHAR(500) NOT NULL
)
''')

# Create 'faq' table
db.execute('''
CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question VARCHAR(500),
    answer VARCHAR(500)
   )
''')

# Commit the transaction
db.commit()

# Close the connection
db.close()

print("Database and tables created successfully.")