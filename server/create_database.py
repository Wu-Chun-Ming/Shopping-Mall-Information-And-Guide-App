import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('mall_info.db')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create 'user' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS user (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_contact INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_picture TEXT
)
''')

# Create 'store' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS store (
    sid INTEGER PRIMARY KEY AUTOINCREMENT,
    sname VARCHAR(255) NOT NULL,
    store_description VARCHAR(500),
    store_contact INTEGER,
    store_type VARCHAR(255),
    store_location VARCHAR(255),
    store_map DOUBLE,
    store_picture TEXT
)
''')

# Create 'event' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS event (
    eid INTEGER PRIMARY KEY AUTOINCREMENT,
    ename VARCHAR(255) NOT NULL,
    event_description VARCHAR(500),
    event_location VARCHAR(255),
    store_map DOUBLE,
    store_picture TEXT
)
''')

# Create 'comment' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS comment (
    cid INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INTEGER,
    comment VARCHAR(500),
    rating INTEGER,
    sid INTEGER,
    FOREIGN KEY (uid) REFERENCES user(uid),
    FOREIGN KEY (sid) REFERENCES store(sid)
)
''')
# Create 'qna' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS qna (
    qid INTEGER PRIMARY KEY AUTOINCREMENT,
    question VARCHAR(500),
    answer VARCHAR(500)
   )
''')


# Commit the transaction
conn.commit()

# Close the connection
conn.close()

print("Database and tables created successfully.")

