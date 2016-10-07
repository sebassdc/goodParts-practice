// Create a variable called add and store a function
// in it that adds two numbers

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
};

// var myObject = {
//     value: 0,
//     increment: function (inc) {
//         this.value += typeof inc === 'number' ? inc : 1;
//     }
// }

var myObject = function () {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    };
    }();
myObject.increment();
myObject.increment(2);

// Augment myObject with a double method

myObject.double = function () {
    var that = this; // workarround

    var helper = function () {
        that.increment(that.getValue());
    }
    helper(); // Invoke helper as a function
};

//Invoke double as a method

myObject.double();


// Create a constructor function called Quo.
// It makes an object with a status property

// var Quo = function (status) {
//     this.status = string;
// };

// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.


var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};

// Give all instances of Quo a public method
// called get_status
// Quo.prototype.get_status = function () {
//     return this.status;
// };
// Make an instance of Quo
// notice the function is designed
// to be used without the 'new' prefix
var myQuo =  quo("amazed");
// console.log(myQuo.get_status());
//document.writeln(myQuo.get_status());

// Make an array of 2 numbers and add them

var array = [3, 4];
var sum = add.apply(null, array); // sum is 7
// Make an object with a status member
var statusObject = {
    status: 'A-OK'
};

// var status = Quo.prototype.get_status.apply(statusObject);
// Status is 'A-OK'

// Make a function that add a lot of stuff
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};

// Make a try_it function that calls the new add
// function incorrectly

var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ': '+ e.message);
    }
};
//try_it();

Function.prototype.method = function (name, func){
    // add a method conditionaly
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
}
Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn walk_the_DOM calls
// itself to processs each of the child nodes.

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

// Defune a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node, The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function (att, value) {
    var results = [];
    walk_the_DOM(document, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {
                results.push(node);
            }
    });
    return results;
};

// make a factorial function with tail
// recursion. it is tail recursive because
// it returns the results of calling itself.

var factorial = function factorial(i, a){
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};
// console.log(factorial(4));

// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
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

// console.log('&lt;h1 value=&quot;maincra&quot;&gt;'.deentityify()); //<h1 value="maincra">

var serial_maker = function () {
    // Produce an object that produces unique strings. A
    // unique string is made up of two parts: a prefix
    // and a sequence number. The object comes with
    // methods for setting the prefix and sequence
    // number, and a gensym method that produces unique
    // strings.

    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};
// var seqer = serial_maker();
// seqer.set_prefix('Q');
// seqer.set_seq(1000);
// var unique = seqer.gensym(); // unique is "Q1000"
// console.log(unique);

// Cascade like objects

// getElement('myBoxDiv').
//     move(350, 150).
//     width(100).
//     height(100).
//     color('red').
//     border('10px outset').
//     padding('4px').
//     appendText("Please stand by").
//     on('mousedown', function (m) {
//         this.startDrag(m, this.getNinth(m));
//     }).
//     on('mousemove', 'drag').
//     on('mouseup', 'stopDrag').
//     later(2000, function () {
//         this.
//             color('yellow').
//             setHTML("What hath God wraught?").
//             slide(400, 40, 200, 200);
//     }).
//     tip('This box is resizeable');
Function.method('curry', function () {
    var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add3 = add.curry(3);
// console.log(add3(7));

// var test = [];
// var fibonacci = function (n) {
//     var memo = [0, 1];
//     var fib = function (n) {
//         test.push('a');
//         var result = memo[n];
//         if (typeof result !== 'number') {
//             result = fib(n - 1) + fib(n - 2);
//             memo[n] = result;
//         }
//         return result;
//     };
//     return fib;
// }();
// console.log('calls: '+test.length);

var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};

var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});
var factorial = memoizer([1, 1], function(shell, n) {
    return n * shell(n - 1);
});
console.log(factorial(4));
