import sqlite3
import os

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('mall_info.db')

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Define a function to insert data into the 'store' table
def insert_store(sname, store_description, store_contact, store_type, store_location, store_map, store_picture):
    try:
        cursor.execute('''
            INSERT INTO store (sname, store_description, store_contact, store_type, store_location, store_map, store_picture) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (sname, store_description, store_contact, store_type, store_location, store_map, store_picture))
        
        # Commit the transaction
        conn.commit()
        print(f"Inserted store: {sname}")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

# Example data to insert
stores = [
    {
        "sname": "popular",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 123456789,
        "store_type":"bookAndStationary",
        "store_location": "Floor 1",
        "store_map": 37.7749,
        "store_picture": "../images/bookAndStationary/popular.jpg"  # Path to the image file
    },
    {
        "sname": "Smiggle",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
         "store_type":"bookAndStationary",
        "store_location": "Floor 2",
        "store_map": 38.8951,
        "store_picture": "../images/bookAndStationary/smiggle.jpg"
    },
    {
        "sname": "Loud Speaker",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
         "store_type":"entertainment",
        "store_location": "Floor 2",
        "store_map": 37.1234,
        "store_picture": "../images/entertainment/loudSpeaker.jpg"
    },
    {
        "sname": "Manekineko",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
          "store_type":"entertainment",
        "store_location": "Floor 1",
        "store_map": 38.8855,
        "store_picture": "../images/entertainment/manekineko.jpg"
    },
    {
        "sname": "Adidas",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
          "store_type":"fashion",
        "store_location": "Floor 2",
        "store_map": 38.2345,
        "store_picture": "../images/fashion/adidas.jpg"
    },
     {
        "sname": "H&M",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
          "store_type":"fashion",
        "store_location": "Floor 2",
        "store_map": 38.3456,
        "store_picture": "../images/fashion/HM.jpg"
    },
     {
        "sname": "underArmour",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"fashion",
        "store_location": "Floor 1",
        "store_map": 37.2345,
        "store_picture": "../images/fashion/underArmour.jpg"
    },
     {
        "sname": "uniQlo",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"fashion",
        "store_location": "Floor 1",
        "store_map": 37.1122,
        "store_picture": "../images/fashion/uniqlo.jpg"
    },
    {
        "sname": "damso korean BBQ restaurant",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"food",
        "store_location": "Floor 1",
        "store_map": 37.2233,
        "store_picture": "../images/food/damso.jpg"
    },
    {
        "sname": "KFC",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"food",
        "store_location": "Floor 1",
        "store_map": 37.2314,
        "store_picture": "../images/food/kfc.jpg"
    },
    {
        "sname": "Mixue Ice Cream and Tea",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"food",
        "store_location": "Floor 2",
        "store_map": 38.1122,
        "store_picture": "../images/food/mixue.jpg"
    },
    {
        "sname": "Sushi King",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"food",
        "store_location": "Floor 2",
        "store_map": 38.2233,
        "store_picture": "../images/food/sushiKing .jpg"
    },
    {
        "sname": "HuaWei",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"gadget",
        "store_location": "Floor 2",
        "store_map": 38.2234,
        "store_picture": "../images/gadgets/Huawei.jpg"
    },
     {
        "sname": "SamSung",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"gadget",
        "store_location": "Floor 1",
        "store_map": 37.2234,
        "store_picture": "../images/gadgets/samsung.jpg"
    },
     {
        "sname": "Swarovski",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"jewellery",
        "store_location": "Floor 1",
        "store_map": 37.1235,
        "store_picture": "../images/jewellery/swarovski.jpg"
    },
    {
        "sname": "Aeon",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"lifestyle",
        "store_location": "Floor 1",
        "store_map": 37.1248,
        "store_picture": "../images/lifestyle/aeon.jpg"
    },
     {
        "sname": "Akemi",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"lifestyle",
        "store_location": "Floor 1",
        "store_map": 37.1356,
        "store_picture": "../images/lifestyle/akemi.jpg"
    },
     {
        "sname": "Mr Diy",
        "store_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "store_contact": 987654321,
        "store_type":"lifestyle",
        "store_location": "Floor 2",
        "store_map": 38.1248,
        "store_picture": "../images/lifestyle/mrdiy.jpg"
    }
]
def insert_event(ename, event_description, event_location, store_map, store_picture):
    try:
        cursor.execute('''
            INSERT INTO event(ename, event_description, event_location, store_map, store_picture)
            VALUES (?, ?, ?, ?, ?)
        ''', (ename, event_description, event_location, store_map, store_picture))
        
        # Commit the transaction
        conn.commit()
        print(f"Inserted event: {ename}")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

events = [
    {
        "ename": "Food fair",
        "event_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        "event_location": "Floor 1",
        "event_map": 36.1234,
        "event_picture": "../images/event/event1.jpg"  # Path to the image file
    },
    {
        "ename": "Singing Competition",
        "event_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        "event_location": "Floor 2",
        "event_map": 36.1234,
        "event_picture": "../images/event/event2.jpg"
    }
]
def insert_qna(question,answer):
    try:
        cursor.execute('''
            INSERT INTO qna(question,answer)
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


# Insert each store into the database
for store in stores:
    insert_store(store['sname'], store['store_description'], store['store_contact'],store['store_type'], store['store_location'], store['store_map'], store['store_picture'])
for event in events:
    insert_event(event['ename'], event['event_description'], event['event_location'], event['event_map'], event['event_picture'])
for qna in qnas:
    insert_qna(qna['question'], qna['answer'])
# Close the connection
conn.close()
