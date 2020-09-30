/*
 * This file will simply be concatenated with the output of compile.vzp. All
 * function names must be in escaped form.
 */

const fs = require("fs");

/* || */
function __124__124_(closure, left, right) {
    if (typeof left === "boolean" && typeof right === "boolean") {
        return left || right;
    }

    throw "|| requires two booleans; got '" + left + "' and '" + right + "' instead";
}

/* 
 * Short-Circuiting || 
 * The parser will replace the arguments with functions that take no
 * arguments, allowing their evaluation to be deferred.
 */
function _short_32_circuit_124__124_(closure, left, right) {
    if (typeof left === "object" && typeof right === "object") {
        return left.__40__41_(left) || right.__40__41_(right);
    }

    throw "You shouldn't see this error.";
}

/* && */
function __38__38_(closure, left, right) {
    if (typeof left === "boolean" && typeof right === "boolean") {
        return left && right;
    }

    throw "&& requires two booleans; got '" + left + "' and '" + right + "' instead";
}

/* Short-Circuiting && (see above under "Short-Circuiting ||") */
function _short_32_circuit_38__38_(closure, left, right) {
    if (typeof left === "object" && typeof right === "object") {
        return left.__40__41_(left) && right.__40__41_(right);
    }

    throw "You shouldn't see this error.";
}

/* == */
function __61__61_(closure, left, right) {
    if (left === right) {
        return true;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        if (left.length != right.length) {
            return false;
        }

        for (let i = 0; i < left.length; i++) {
            if (!__61__61_({}, left[i], right[i])) {
                return false;
            }
        }

        return true;
    }

    if (typeof left === "object" && typeof right === "object") {
        if (Object.keys(left).length !== Object.keys(right).length) {
            return false;
        }

        for (let key in left) {
            // Since JS returns undefined when a key isn't found, this should
            // also catch discrepencies between the sets of keys.
            if (left.hasOwnProperty(key) && !__61__61_({}, left[key], right[key])) {
                return false;
            }
        }

        return true;
    }

    return false; // Easier than worrying about when to fail
}

/* != */
function __33__61_(closure, left, right) {
    return !__61__61_(closure, left, right);
}

/* < */
function __60_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left < right;
    }

    throw "< expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* <= */
function __60__61_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left <= right;
    }

    throw "<= expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* > */
function __62_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left > right;
    }

    throw "> expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* >= */
function __62__61_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left >= right;
    }

    throw ">= expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* + */
function __43_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left + right;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        return left.concat(right);
    }

    throw "+ requires two numbers or arrays; got '" + left + "' and '" + JSON.stringify(right) + "' instead";
}

/* array+ */
function _array_43_(closure, left, right) {
    if (Array.isArray(left) && Array.isArray(right)) {
        return left.concat(right);
    }

    throw "array+ requires two arrays; got '" + JSON.stringify(left) + "' and '" + JSON.stringify(right) + "' instead";
}

/* - */
function __45_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left - right;
    }

    throw "- expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* * */
function __42_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left * right;
    }

    throw "* expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* / */
function __47_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return Math.floor(left / right);
    }

    throw "/ expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* % */
function __37_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left % right;
    }

    throw "% expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* $ */
function __36_(closure, left, right) {
    if (typeof left === "object" && typeof left.__40__41_ === "function" && Array.isArray(right)) {
        return right.map(function (x) { return left.__40__41_(left, x); });
    }

    throw "$ expects a function and an array; got '" + left + "' and '" + right + "' instead";
}

/* @> */
function __64__62_(closure, one, two, three) {
    if (typeof one === "object" && typeof one.__40__41_ === "function" && Array.isArray(two)) {
        let acc = three;
        two.concat([]).reverse().forEach(function (x) {
            acc = one.__40__41_(one, x, acc);
        });

        return acc;
    }

    throw "Type issue in fold right";
}

/* <@ */
function __60__64_(closure, one, two, three) {
    if (typeof one === "object" && typeof one.__40__41_ === "function" && Array.isArray(three)) {
        let acc = two;
        three.forEach(function (x) {
            acc = one.__40__41_(one, acc, x);
        });

        return acc;
    }

    throw "Type issue in fold left";
}

/* : */
function __58_(closure, left, right) {
    if (Array.isArray(left)) {
        if (typeof right === "number") {
            return left[right];
        }

        if (Array.isArray(right)) { // TODO check that it's an array of numbers
            return right.map(function (x) { return left[x]; });
        }
    }

    throw ": requires an array and a number or array; got '" + left + "' and '" + right + "' instead";
}

/* .. */
function __46__46_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        let num = left;
        let array = [];

        if (left < right) {
            while (num <= right) {
                array.push(num);
                num += 1;
            }
        } else if (left > right) {
            while (num >= right) {
                array.push(num);
                num -= 1;
            }
        } else {
            array.push(num);
        }

        return array;
    }

    throw ".. requires two numbers; got '" + left + "' and '" + right + "' instead";
}

/* ! */
function __33_(closure, arg) {
    if (typeof arg === "boolean") {
        return !arg;
    }

    throw "! requires a boolean, but got '" + arg + "' instead.";
}

/* unary - */
function _unary_32__45_(closure, arg) {
    if (typeof arg === "number") {
        return -arg;
    }

    throw "Unary - requires a number, but got'" + arg + "' instead.";
}

/* print() */
function _print(closure, arg) {
    if (Array.isArray(arg)) { // TODO check that it's an array of numbers
        console.log(String.fromCodePoint.apply(this, arg));
        return arg; // TODO ???
    }

    throw "print() requires an array of characters, but got '" + JSON.stringify(arg) + "' instead.";
}


/* ENV environment stuff (currently just argv) */
const _ENV = {
    /* XXX This assumes node */
    _argv:  process.argv.splice(1).map(function (s) {
        return s.split("").map(function (x) { return x.codePointAt(); });
    })
}

/* IO functions */
const _IO = {
    _read: {
        __40__41_: function (closure, path) {
            return fs.readFileSync(
                String.fromCodePoint.apply(this, path), 
                "utf8"
            ).split("").map(function (x) { return x.codePointAt(); });
        }
    },
    _write: {
        __40__41_: function (closure, path, data) {
            // TODO error checking?

            let pathString = String.fromCodePoint.apply(this, path);
            let dataString = String.fromCodePoint.apply(this, data);
            fs.writeFileSync(pathString, dataString, "utf8");
            return data;
        }
    }
}
