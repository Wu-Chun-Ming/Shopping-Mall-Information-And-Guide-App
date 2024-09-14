import sqlite3
import os

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('mall_info.sqlite')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Define a function to insert data into the 'shop' table
def insert_shop(name, description, contact, type, location):
    try:
        cursor.execute('''
            INSERT INTO shops (name, description, contact, type, location) 
            VALUES (?, ?, ?, ?, ?)
        ''', (name, description, contact, type, location))
        
        # Commit the transaction
        conn.commit()
        print(f"Inserted shop: {name}")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

# Example data to insert
shops = [
    {
        "name": "popular",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 123456789,
        "type":"bookAndStationary",
        "location": "Floor 1"
    },
    {
        "name": "Smiggle",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
         "type":"bookAndStationary",
        "location": "Floor 2"
    },
    {
        "name": "Loud Speaker",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
         "type":"entertainment",
        "location": "Floor 2"
    },
    {
        "name": "Manekineko",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
          "type":"entertainment",
        "location": "Floor 1"
    },
    {
        "name": "Adidas",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
          "type":"fashion",
        "location": "Floor 2"
    },
     {
        "name": "H&M",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
          "type":"fashion",
        "location": "Floor 2"
    },
     {
        "name": "underArmour",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"fashion",
        "location": "Floor 1"
    },
     {
        "name": "uniQlo",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"fashion",
        "location": "Floor 1"
    },
    {
        "name": "damso korean BBQ restaurant",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"food",
        "location": "Floor 1"
    },
    {
        "name": "KFC",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"food",
        "location": "Floor 1"
    },
    {
        "name": "Mixue Ice Cream and Tea",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"food",
        "location": "Floor 2"
    },
    {
        "name": "Sushi King",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"food",
        "location": "Floor 2"
    },
    {
        "name": "HuaWei",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"gadget",
        "location": "Floor 2"
    },
     {
        "name": "SamSung",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"gadget",
        "location": "Floor 1"
    },
     {
        "name": "Swarovski",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"jewellery",
        "location": "Floor 1"
    },
    {
        "name": "Aeon",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"lifestyle",
        "location": "Floor 1"
    },
     {
        "name": "Akemi",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"lifestyle",
        "location": "Floor 1"
    },
     {
        "name": "Mr Diy",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "contact": 987654321,
        "type":"lifestyle",
        "location": "Floor 2"
    }
]
def insert_event(name, description, location):
    try:
        cursor.execute('''
            INSERT INTO events(name, description, location)
            VALUES (?, ?, ?)
        ''', (name, description, location))
        
        # Commit the transaction
        conn.commit()
        print(f"Inserted event: {name}")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

events = [
    {
        "name": "Food fair",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        "location": "Floor 1"
    },
    {
        "name": "Singing Competition",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        "location": "Floor 2"
    }
]
def insert_qna(question,answer):
    try:
        cursor.execute('''
            INSERT INTO faq(question,answer)
            VALUES (?, ?)
        ''', (question,answer))
        
        # Commit the transaction
        conn.commit()
        print(f"Inserted qna: {question}")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
qnas = [
    {
        "question":"How do I see shop details, such as contact information and rating?",
        "answer":"Once you find the shop in the shop list, click on it to view detailed information, including shop description, contact details, location, and user ratings."
    },
    {
         "question":"Can I leave a review for a shop?",
        "answer":"Yes, after logging in, you can leave a rating and review for any shop by visiting the shop’s detail page."
    },
     {
        "question":"How do I log in or register an account?",
        "answer":"Click the 'Profile' button in the drawer menu. You can either log in with your credentials or sign up for a new account if you don't have one."
    },
     {
        "question":"Where can I find information about upcoming events?",
        "answer":"You can view a list of current and upcoming events by navigating to the 'Events' section in the app. Click on an event to see more details."
    },
      {
        "question":" Can I navigate to a shop using a map?",
        "answer":"Yes, once you are on the shop or event details page, click on the 'Map' button to view directions to the shop or event location within the mall."
    },
      {
        "question":"How do I update my profile information?",
        "answer":"Go to the 'Profile' section in the app, where you can update your user details such as name, email, and contact number."
    },
      {
        "question":"How can I find a specific shop in the mall?",
        "answer":"You can use the search bar on the home screen to look for a specific shop by name. You can also filter shops by floor or category in the shop section."
    },
]

# Insert each shop into the database
for shop in shops:
    insert_shop(shop['name'], shop['description'], shop['contact'],shop['type'], shop['location'])
for event in events:
    insert_event(event['name'], event['description'], event['location'])
for qna in qnas:
    insert_qna(qna['question'], qna['answer'])

# Close the connection
conn.close()