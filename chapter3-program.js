var flag = function(){
    console.log('flag');
}
var MYAPP = {};

MYAPP.stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Syndey"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
stooge["middle-name"] = 'Lester';
stooge.nickname = "Curly";
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

// Prototype

if (typeof Object.create !== 'function'){
    Object.create = function (o){
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
    // nick is 'Curly' because x and stooge
    // are references to the same object
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
stooge.profession = 'actor';

/// for in Statement
// var name;
// for (name in another_stooge) {
//     if (typeof another_stooge[name] !== 'function') {
//         document.writeln(name + ': ' + another_stooge[name]);
//     }
// }
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
