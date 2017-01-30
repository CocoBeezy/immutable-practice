var Immutable = require('immutable');
var assert = require('assert');

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
                    firstName: 'Jemal',
                    lastName: 'Hussein',
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
    ]
};

// console.log(testObj);

// transform obj to immutable structure
const imm1 = Immutable.fromJS(testObj);
const imm2 = Immutable.fromJS(testObj);

// transform immutable structure to obj
imm1.toJS();

// is() function - checking equality
imm1 === imm2;  // false
Object.is(imm1, imm2);  //false
Immutable.is(imm1, imm2); // true

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