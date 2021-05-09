/*
 * This file will simply be concatenated with the output of compile.vzp. All
 * function names must be in escaped form.
 */

const fs = require("fs");

/* slow= */
function _slow_61_(closure, left, right) {
    if (left === right) {
        return true;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        if (left.length != right.length) {
            return false;
        }

        for (let i = 0; i < left.length; i++) {
            if (!_slow_61_({}, left[i], right[i])) {
                return false;
            }
        }

        return true;
    }

    return false; // Easier than worrying about when to fail
}

/* + */
// TODO we can probably get rid of this after we type object fields
function _slow_43_(closure, left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left + right;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        return left.concat(right);
    }

    throw "slow+ got '" + left + "' and '" + JSON.stringify(right) + "'";
}

/* @> */
// TODO can probably remove this too once reducer works, although that will
// require a bit more work since I use so many of them.
function __64__62_(closure, one, two, three) {
    let acc = three;
    two.concat([]).reverse().forEach(function (x) {
        acc = one._f(one, x, acc);
    });

    return acc;
}

/* : */
// TODO we can get rid of this as soon as we've stopped generating calls to it
// in the compiler. In practice, that will be once we've typed object fields.
function __91__93_(closure, left, right) {
    if (Array.isArray(left)) {
        if (typeof right === "number") {
            return left[right];
        }

        if (Array.isArray(right)) { // TODO check that it's an array of numbers
            return right.map(function (x) { return left[x]; });
        }
    }

    throw "[] requires an array and a number or array; got '" + left + "' and '" + right + "' instead";
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
    }),
    _unique: {
        _f: (function () {
            let x = 0;
            return function (closure) {
                x = x + 1;
                return x;
            };
        })()
    }
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
