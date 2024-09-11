import sqlite3
import os


CREATE TABLE IF NOT EXISTS shops (
  shopID INTEGER PRIMARY KEY AUTOINCREMENT,
  shopdetail VARCHAR(255),
  shoptype VARCHAR(255),
  shoppicture BLOB,
  shopfloor VARCHAR(255),
  shopname VARCHAR(255)
);
# Function to convert image to binary data
def convert_to_binary_data(filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    return blob_data

# Insert shop data into the database
def insert_shop(shopdetail, shoptype, shoppicture_path, shopfloor, shopname):
    try:
        sqliteConnection = sqlite3.connect('shoppingMall.db')
        cursor = sqliteConnection.cursor()

        # Convert image to binary
        shoppicture = convert_to_binary_data(shoppicture_path)

        sqlite_insert_query = """INSERT INTO shops
                          (shopdetail, shoptype, shoppicture, shopfloor, shopname) 
                           VALUES (?, ?, ?, ?, ?)"""

        data_tuple = (shopdetail, shoptype, shoppicture, shopfloor, shopname)
        cursor.execute(sqlite_insert_query, data_tuple)
        sqliteConnection.commit()
        print("Shop inserted successfully into shops table")

        cursor.close()

    except sqlite3.Error as error:
        print("Failed to insert data into sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

# Insert data example
insert_shop(
    "High-end fashion boutique",
    "Clothing",
    "/path/to/shop_image.jpg",  # Path to shop image
    "1st Floor",
    "Fashion Boutique"
)