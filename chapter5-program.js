if (typeof Object.create !== 'function'){

    Object.create = function (o){
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
Function.prototype.method = function (name, func){
    // add a method conditionaly
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
}
Object.method('superior', function (name) {
    var that = this, method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});
Function.method('curry', function () {
    var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});
String.method('deentityify', function () {
    // The entity table. It maps entity names to characters
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    // Return the deentityify method
    return function () {
        // This is the deentityify method. It calls the String
        // replace method, looking for substrings that star
        // with '&' and end with ';'. If the characters in
        // between ar in the entity table, then replace the
        // entity with the character from the table. It uses
        // a regular expression (Chapter 7)
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());

Function.method('new', function () {
    // Create a new object that inherits from the
    // constructor's prototype.
    var that = Object.create(this.prototype);

    // Invoke the constructor binding -this- to
    // the new object
    var other = this.apply(that, arguments);
    // If its return value isn't an object,
    // subsitute the new object
    return (typeof other === 'object' && other) || that;
});

// // var Mammal = function (name) {
// //     this.name = name;
// // };
// // Mammal.prototype.get_name = function () {
// //     return this.name;
// // };
// // Mammal.prototype.says = function () {
// //     return this.saying || '';
// // };
// // var myMammal = new Mammal('Herb the Mammal');
// // var name = myMammal.get_name();
// //
// // var Cat = function (name) {
// //     this.name = name;
// //     this.saying = 'meow';
// // };
// //
// // // Replace Cat.prototype woth a new instance o Mammal
// //
// // Cat.prototype = new Mammal();
// //
// // // Augment the new prototype with
// // // purr an get_name methods
// //
// // Cat.prototype.purr = function (n) {
// //     var i, s = '';
// //     for (i = 0; i < n; i += 1) {
// //         if (s) {
// //             s += '-';
// //         }
// //         s += 'r';
// //     }
// //     return s;
// // };
// // Cat.prototype.get_name = function () {
// //     return this.says() + ' ' + this.name + ' ' + this.says();
// // };
// //
// // var myCat = new Cat('Henrrieta');
// // console.log(myCat.says());
// // console.log(myCat.purr(5));
// // console.log(myCat.get_name());
//
// Function.method('inherits', function (Parent) {
//     this.prototype = new Parent();
//     return this;
// });
//
// var Cat = function (name) {
//     this.name = name;
//     this.saying = 'meow';
// }.
//     inherits(Mammal).
//     method('purr', function (n) {
//         var i, s = '';
//         for (i = 0; i < n; i += 1) {
//             if (s) {
//                 s += '-';
//             }
//             s += 'r';
//         }
//         return s;
//     }).
//     method('get_name', function () {
//         return this.says() + ' ' + this.name + ' ' + this.says();
//     });
//
// var myCat = new Cat('Henrrieta');
// console.log(myCat.says());
// console.log(myCat.purr(5));
// console.log(myCat.get_name());


// var myMammal = {
//     name: 'Herb the Mammal',
//     get_name: function () {
//         return this.name;
//     },
//     says: function () {
//         return this.saying || '';
//     }
// };
//
//
// var myCat = Object.create(myMammal);
// myCat.name = 'Henrrieta';
// myCat.saying = 'meow';
// myCat.purr = function (n) {
//     var i, s = '';
//     for (i = 0; i < n; i += 1) {
//         if (s) {
//             s += '-';
//         }
//         s += 'r';
//     }
//     return s;
// };
// myCat.get_name = function () {
//     return this.says() + ' ' + this.name + ' ' + this.says();
// };

var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || '';
    };
    return that;
};

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s +='r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({name: 'Henrrieta'});

var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior('get_name');
    that.get_name = function (n) {
        return 'like ' + super_get_name() + ' baby';
    };
    return that;
};

// var myCoolCat = coolcat({name: 'Bix'});
// console.log(myCoolCat.get_name());

// var eventuality = function (that) {
//     var registry = {};
//     that.fire = function (event) {
//         // Fire an event on an object. The event can be either
//         // a string containing the name of the event or an
//         // object containing a type property containing the
//         // name of the event. Handlers registered by the 'on'
//         // method that match the event name will be invoked
//         var array,
//             func,
//             handler,
//             i,
//             type = typeof event === 'string' ? event : event.type;
//         // If an array of handlers exist for this event, then
//         // loop through it and execute the handlers in order.
//         if (registry.hasOwnProperty(type)) {
//             array = registry[type];
//             for (i = 0; i < array.length; i += 1) {
//                 handler = array[i];
//                 // A handler record contains a method and an optional
//                 // array of parameters. If the method is a name, look
//                 // up the function
//                 func = handler.method;
//                 if (typeof func === 'string') {
//                     func = this[func];
//                 }
//                 // Invoke a handler. If the record contained
//                 // parameters, then pass them. Otherwise, pass the
//                 // event object.
//                 func.apply(this, handler.parameters || [event]);
//             }
//         }
//         return this;
//     };
//     that.on = function (type, method, parameters) {
//         // Register an evet. Make a hanlder record. Put it
//         // in a handler array, making one if it doesn't yet
//         // exist for this type.
//         var handler = {
//             method: method,
//             parameters: parameters
//         };
//         if (registry.hasOwnProperty(type)) {
//             registry[type].push(handler);
//         } else {
//             registry[type] = [handler];
//         }
//         return this;
//     };
//     return that;
// };
