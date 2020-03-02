const connection = require('../config/connection');

// GET ALL CATS
const getBurgers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers', (err, burgerdata) => {
      if (err) {
        console.log(err);
        // THIS WILL GO TO PROMISE'S .catch()
        return reject(err);
      }

      // THIS WILL GO TO PROMISE'S .then()
      resolve(burgerdata);
    });
  });
};

// create a burger
/* accepts object parameter => {burger_name: "whatever name" } */
const createBurger = burgerObj => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO burgers SET ?', burgerObj, (err, burgerdata) => {
      if (err) {
        console.log(err);
        // THIS WILL GO TO PROMISE'S .catch()
        return reject(err);
      }
      // THIS WILL GO TO PROMISE'S .then()
      resolve(burgerdata);
    });
  });
};

// UPDATE burger's devoured status
// burgerObj => { devoured: true } OR {devoured: false}
const updateBurger = (burgerObj, burgerId) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE burgers SET ? WHERE id = ?', [burgerObj, burgerId], (err, burgerdata) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else if (burgerdata.affectedRows === 0) {
        return resolve({ message: "Couldn't find a burger with that id!", code: 404 });
      }

      resolve({ message: 'Burger updated successfully!', code: 200 });
    });
  });
};

// DELETE A BURGER
const deleteBurger = burgerId => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM burgers WHERE id = ?', [burgerId], (err, burgerdata) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else if (burgerdata.affectedRows === 0) {
        return resolve({ message: "Couldn't find a burger with that id!", code: 404 });
      }

      resolve({ message: 'Burger deleted successfully!', code: 200 });
    });
  });
};

module.exports = { getBurgers, createBurger, updateBurger, deleteBurger };
