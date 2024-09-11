import SQLite from 'react-native-sqlite-storage';

// Enable SQLite debug mode (optional)
SQLite.enablePromise(true);

// Open or create the database
const db = SQLite.openDatabase({ name: 'shoppingMall.db', location: 'default' });

export const createShopsTable = () => {
  db.then((db) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS shops (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          floor INTEGER,
          type TEXT,
          rating REAL
        );`
      );
    });
  }).catch((error) => {
    console.error('Error creating shops table', error);
  });
};

// Insert a new shop
export const insertShop = (name, floor, type, rating) => {
  db.then((db) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO shops (name, floor, type, rating) VALUES (?, ?, ?, ?)',
        [name, floor, type, rating]
      );
    });
  }).catch((error) => {
    console.error('Error inserting shop', error);
  });
};


// Fetch a single shop by ID
export const fetchShopById = (id) => {
  return db.then((db) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM shops WHERE id = ?', [id], (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            reject('Shop not found');
          }
        });
      });
    });
  }).catch((error) => {
    console.error('Error fetching shop by ID', error);
  });
};

// Fetch all shops
export const fetchShops = () => {
    return db.then((db) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM shops', [], (tx, results) => {
            let shops = [];
            for (let i = 0; i < results.rows.length; i++) {
              let item = results.rows.item(i);
              shops.push({
                id: item.shopID,
                name: item.shopname,
                detail: item.shopdetail,
                type: item.shoptype,
                floor: item.shopfloor,
                picture: item.shoppicture,  // Store image as binary data
              });
            }
            resolve(shops);
          });
        });
      });
    }).catch((error) => {
      console.error('Error fetching shops', error);
    });
  };