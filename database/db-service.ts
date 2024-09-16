import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

const databaseName = 'mall_info.sqlite';
// Open the database
export const getDBConnection = async () => {
  return openDatabase(
    { name: `${databaseName}`, createFromLocation: `~${databaseName}` },
    openCallback,
    errorCallback,
  );
}
const openCallback = () => {
  console.log('Successful open database');
}
const errorCallback = (err: any) => {
  console.log('Error in opening the database: ' + err);
}

/* 
  Shops
*/
// Fetch all shops
export const fetchShops = async (db: SQLiteDatabase) => {
  try {
    const shopList: any = [];
    const query = `SELECT * FROM shops`;
    const results = await db.executeSql(query);

    results.forEach((result: any) => {
      (result.rows.raw()).forEach((item: any) => {
        shopList.push(item);
      })
    });
    return shopList;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw Error('Failed to fetch shops');
  }
};

// Fetch shop by id
export const fetchShopById = async (db: SQLiteDatabase, shopId: any) => {
  try {
    const query = `SELECT * FROM shops WHERE id=?`;
    const results = await db.executeSql(query, [shopId]);

    return results[0].rows.item(0)
  } catch (error) {
    console.error('Error fetching shop detail:', error);
    throw Error('Failed to fetch shop detail');
  }
}

/* 
  Events
*/
// Fetch all events
export const fetchEvents = async (db: SQLiteDatabase) => {
  try {
    const eventList: any = [];
    const query = `SELECT * FROM events`;
    const results = await db.executeSql(query);

    results.forEach((result: any) => {
      (result.rows.raw()).forEach((item: any) => {
        eventList.push(item);
      })
    });
    return eventList;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw Error('Failed to fetch events');
  }
}
// Fetch event by id
export const fetchEventById = async (db: SQLiteDatabase, eventId: string) => {
  try {
    const query = `SELECT * FROM events WHERE id=?`;
    const results = await db.executeSql(query, [eventId]);

    return results[0].rows.item(0)
  } catch (error) {
    console.error('Error fetching event detail:', error);
    throw Error('Failed to fetch event detail');
  }
}

/* 
  Enquiries
*/
// Insert enquiry from user
export const insertEnquiry = async (
  db: SQLiteDatabase,
  name: string,
  email: string,
  enquiry: string
) => {
  try {
    const query = 'INSERT INTO enquiries(user_name, user_email, enquiry) VALUES(?,?,?)';
    const parameters = [name, email, enquiry];
    await db.executeSql(query, parameters);
  } catch (error) {
    console.error('Error inserting enquiry:', error);
    throw Error('Failed to insert enquiry');
  }
}

/* 
  FAQ
*/
// Get FAQ
export const fetchFAQ = async (db: SQLiteDatabase) => {
  try {
    const faqList: any = [];
    const query = `SELECT * FROM faq`;
    const results = await db.executeSql(query);
    
    results.forEach((result: any) => {
      (result.rows.raw()).forEach((item: any) => {
        faqList.push(item);
      })
    });
    return faqList;
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    throw Error('Failed to fetch FAQ');
  }
}

/* 
  Users
*/
const serverPath = 'http://10.0.2.2:5000';
// Get users
export const getUsers = async () => {

  const url = serverPath + '/api/users';

  let usersData = fetch(url).then(response => {
    return response.json();
  })

  return usersData;
}

// Get user detail
export const getUserDetail = async (username: string) => {
  const url = serverPath + '/api/users/' + username;

  let user = [];

  user = await fetch(url).then(response => {
    if (!response.ok) {
      console.log('Error', response.status.toString());
      throw Error(response.status.toString());
    }
    return (response.json());
  }).catch(error => console.log(error));

  return user;
}

// Create new user
export const createUser = async (
  username: string,
  password: string,
) => {
  const url = serverPath + '/api/user';

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
}

// Update user password
export const updateUserPassword = async (
  username: string,
  new_password: string,
) => {
  const url = serverPath + '/api/user/' + username;

  await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      new_password: new_password,
    })
  })
}

// Delete user
export const deleteUser = async (username: string) => {
  const url = serverPath + '/api/user/' + username;

  console.log(username);

  await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': username
    })
  })
}