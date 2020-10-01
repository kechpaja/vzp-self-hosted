/*
 * This file will simply be concatenated with the output of compile.vzp. All
 * function names must be in escaped form.
 */

const fs = require("fs");

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

/* $ */
function __36_(closure, left, right) {
    return right.map(x => left._f(left, x));
}

/* @> */
function __64__62_(closure, one, two, three) {
    let acc = three;
    two.concat([]).reverse().forEach(function (x) {
        acc = one._f(one, x, acc);
    });

    return acc;
}

/* <@ */
function __60__64_(closure, one, two, three) {
    let acc = two;
    three.forEach(function (x) {
        acc = one._f(one, acc, x);
    });

    return acc;
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

/* print() */
function _print(closure, arg) {
    console.log(String.fromCodePoint.apply(this, arg));
    return arg; // TODO ???
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
        _f: function (closure, path) {
            return fs.readFileSync(
                String.fromCodePoint.apply(this, path), 
                "utf8"
            ).split("").map(function (x) { return x.codePointAt(); });
        }
    },
    _write: {
        _f: function (closure, path, data) {
            // TODO error checking?

            let pathString = String.fromCodePoint.apply(this, path);
            let dataString = String.fromCodePoint.apply(this, data);
            fs.writeFileSync(pathString, dataString, "utf8");
            return data;
        }
    }
}
