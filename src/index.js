import Immutable, { Map, List } from 'immutable';

// IMMUTABLE JS CHEAT SHEET

const testObj = {
    firstName: 'Socorro',
    lastName: 'Aguilar',
    age: 25,
    favoriteShows: ['Walking Dead', 'Game of Thrones', 'Rick and Morty'],
    friends: [
        {
            firstName: 'Enrique',
            lastName: 'Ybarra',
            age: 26,
            friends: [
                {
                    firstName: 'Ryan',
                    lastName: 'Wood',
                    age: 25
                },
                {
                    firstName: 'Geoffrey',
                    lastName: 'Major',
                    age: 25
                }
            ]
        },
        {
            firstName: 'Ronney',
            lastName: 'Moun',
            age: 26,
            friends: []
        },
        {
            firstName: 'Karina',
            lastName: 'Carpio',
            age: 22,
            friends: []
        },
    ],
    address: {
      street: '1234 Home Street',
      zip: '90804',
      state: 'CA',
      country: 'US'
    }
};

const anotherTestObj = {
  firstName: 'Coco',
  age: 'unknown',
  // favoriteShows: ['HIMYM', 'The League', 'The Office'],
  favoriteGames: ['Overwatch', 'Starcraft 2', 'Heathstone', 'Mass Effect']
}

// console.log(testObj);
let result = null;
// transform obj to immutable structure
const map1 = Immutable.fromJS(testObj);
const map2 = Immutable.fromJS(testObj);
const map3 = Immutable.fromJS(anotherTestObj);

// transform immutable structure to obj
map1.toJS();

// is() function - checking equality
map1 === map2;  // false
Object.is(map1, map2);  //false
Immutable.is(map1, map2); // true

/**
 * Map
 */

// STATIC METHODS
// Map.isMap() function
Map.isMap(map1);
// Map.of() function
Map.of('key', 'value', 1, { fistname: 'Socorro' });  // Map { "key": "value", 1: [object Object] }

// MEMBERS
// size
map1.size;  // 5 

// PERSISTENT CHANGES
// set function
map1.set('age', 26); // Map { "firstName": "Socorro", "lastName": "Aguilar", "age": 26, ... }
// delete function
map1.delete('firstName');  // Map { "lastName": "Aguilar", "age": 26, ... }
map1.remove('firstName');  // Map { "lastName": "Aguilar", "age": 26, ... }
// clear function
map1.clear();  // Map {}
// update function
map1.update(map => { // Map { "street": "1234 Home Street", "zip": "90804", "state": "CA", "country": "US" }
  return Map(map.get('address')); 
});
map1.update('firstName', value => {  // Map { "firstName": "SocorroSocorro", "lastName": "Aguilar", "age": 25, ... }
  return value + value;
});
// merge() function
map1.merge(map3);  // Map { "firstName": "Coco", "lastName": "Aguilar", "age": "unknown", "favoriteShows": List [ ... ], "favoriteGames": List [ "Overwatch", "Starcraft 2", "Heathstone", "Mass Effect" ]
// mergeWith() function
map1.mergeWith((prev, next) => prev + next, map3); // Map { "firstName": "SocorroCoco", "lastName": "Aguilar", "age": "25unknown", "favoriteShows": List [ ... ] }
// mergeDeep() function
var x = Immutable.fromJS({a: { x: 10, y: 10 }, b: { x: 20, y: 50 } });
var y = Immutable.fromJS({a: { x: 2 }, b: { y: 5 }, c: { z: 3 } });
x.mergeDeepWith((prev, next) => prev / next, y) // {a: { x: 5, y: 10 }, b: { x: 20, y: 10 }, c: { z: 3 } }

// DEEP PERSISTENT CHANGES
// setIn() function
map1.setIn(['address', 'state'], 'FL');  // Map { ... , "address": Map { "street": "1234 Home Street", "zip": "90804", "state": "FL", "country": "US" } }
// deleteIn() function
map1.deleteIn(['address', 'street']);  // Map { ... , Map { "country": "US", "zip": "90804", "state": "CA" } }
// updateIn() function
map1.updateIn(['address', 'zip'], value => value + value); // Map { ... , Map { "street": "1234 Home Street", "zip": "9080490804", "state": "CA", "country": "US" } }
// mergeIn() function
var address = Map({ state: 'NY', street: '1234 Randomville St.', zip: '90804', phone: { cell: '123-103-1029', home: '992-187-2910'}});
map1.mergeIn(['address'], address);  // Map { ... , "address": Map { "street": "1234 Randomville St.", "zip": "90804", "state": "NY", "country": "US", "phone": [object Object] } }

// TRANSIENT CHANGES
// withMutations() function
map1.withMutations(map => {
  map.set('middleName', 'Allen').set('suffix', 'Jr.').set('favoriteColor', 'red');
}); // Map { "middleName": "Allen", "lastName": "Aguilar", "favoriteColor": "red", "suffix": "Jr.", ... }

// VALUE EQUALITY
// equals() function
map1.equals(map2); // true
map1.hashCode(); // -377324651

// READING VALUES
// get() function
map1.get('firstName');  // Socorro
// has() function
map1.has('friends'); // true
// includes() function
map1.includes('Socorro'); // true
// first()
map1.first();  // Socorro
// last()
result = map1.last(); // Map { "street": "1234 Home Street", "zip": "90804", "state": "CA", "country": "US" }





/**
 * List
 */

// transform array to List
const list1 = Immutable.List(testObj.favoriteShows);    //List [ "Walking Dead", "Game of Thrones", "Rick and Morty" ]
// isList() function
Immutable.List.isList(list1);    //true
// size property
list1.size;    //3
// set() function
list1.set(0, 'HIMYM');    //List [ "HIMYM", "Game of Thrones", "Rick and Morty" ]
list1.set(10, 'value');    //List [ "Walking Dead", "Game of Thrones", "Rick and Morty", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "value" ]
// delete() function - not safe in IE8
list1.delete(0);   //List [ "Game of Thrones", "Rick and Morty" ]
list1.remove(0);   //List [ "Game of Thrones", "Rick and Morty" ]
// insert() function
list1.insert(3, 'HIMYM');  //List [ "Walking Dead", "Game of Thrones", "Rick and Morty", "HIMYM" ]
// clear() function
list1.clear(); //List []
// push() function
list1.push('HIMYM'); //List [ "Walking Dead", "Game of Thrones", "Rick and Morty", "HIMYM" ]
// pop() function
list1.pop(); //List [ "Walking Dead", "Game of Thrones" ]
// unshift() function
list1.unshift('HIMYM');  //List [ "HIMYM", "Walking Dead", "Game of Thrones", "Rick and Morty" ]
// shift() function
list1.shift('HIMYM');  //List [ "Game of Thrones", "Rick and Morty" ]
// update() function
list1.update(2, item => { //List [ "Walking Dead", "Game of Thrones", "HIMYM" ]
  return 'HIMYM';
});
// merge() function
let mergeArray = ['HIMYM', 'The League', 'The Office'];
const mergeList = Immutable.List(mergeArray);
list1.merge(mergeList);  //List [ "HIMYM", "The League", "The Office" ] - overwrites the 0-2 indexes of list1
// mergeWith() function - uses merge function for dealing with conflicts
list1.mergeWith((prev, next) => `${prev} ${next}`, mergeList); //List [ "Walking Dead HIMYM", "Game of Thrones The League", "Rick and Morty The Office" ]
// mergeDeep() function - same as merge function, but handles conflicts through deep recursion
// I don't have an adequate example
// mergeDeep() function - same as merge function, but handles conflicts using merge function
// I don't have an adequate example
//------------------------------
// setSize() function
list1.setSize(5);  //List [ "Walking Dead", "Game of Thrones", "Rick and Morty", undefined, undefined ]





/**
 * Complex Operations
 */
// Change a value in a list within a Map (array within object)
map1.updateIn(['favoriteShows'], list => {
  // we are now dealing with a list
  // so we must use the set function
  // for changing a value
  return list.set(1, 'The League');
});
// Map { "firstName": "Socorro", "lastName": "Aguilar", "age": 25, "favoriteShows": List [ "Walking Dead", "The League", "Rick and Morty" ], ... }

// In favoriteShows change the value of 'Rick and Morty' to 'The League' without knowing the index
map1.update('favoriteShows', list => {
  // we are now handing a list, so we use
  // the lists udpate method
  return list.update(list.findIndex(item => {
    // using the lists findIndex function
    // which will return a numeric index value
    return item === 'Rick and Morty'
  }),
  // item is a plain string, so we can just
  // return the new value without using a set
  // function (not a Map or list)
  item => {
    return 'The League';
  });
});

// Change a value in a Map within a list within a Map (array of objects within an object)
map1.update('friends', list => {
  // dealing with a list so we
  // must use the list's update
  // function
  return list.update(0, map => {
    // the item at position 0 is
    // a Map so we must use the 
    // Map's set method to change
    // the value of the age property
    return map.set('age', 50);
  });
});
// Enrique now has an age of 50

// Do the same as before without knowing the index of Enrique
map1.update('friends', list => {
  // we are now using a list, which has a
  // number for its first parameter, but
  // we use the list's findIndex function to
  // return the index, since we don't know what
  // Enrique's position in the List is
  return list.update(list.findIndex(item => {
    // The item is a Map so we must use the 
    // get method in order to retrieve the value
    // of the firstName property, then compare it
    // to the name of interest (Enrique)
    return item.get('firstName') === 'Enrique';
  }),
  // we must now change the desired property on
  // Enrique (age), and since the Enrique item is
  // a Map, we will use the Map's set function
  item => {
    return item.set('age', 50);
  });
});

// Change the value of one of Enrique's friends - array within object within array within object
map1.update('friends', myFriendsList => {
  return myFriendsList.update(0, friendObject => {
    return friendObject.update('friends', hisFriendsList => {
      return hisFriendsList.update(0, hisFriendObject => {
        return hisFriendObject.set('lastName', 'Carlson');
      })
    });
  });
});
// Enrique's friend Ryan now has a last name of Carlson instead of Wood
console.log(result);