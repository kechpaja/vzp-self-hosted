/*
 * This file will simply be concatenated with the output of compile.vzp. All
 * function names must be in escaped form.
 */

/* || */
function _124__124_(left, right) {
    // TODO
}

/* && */
function _38__38_(left, right) {
    // TODO
}

/* == */
function _61__61_(left, right) {
    // TODO
}

/* != */
function _33__61_(left, right) {
    return !_61__61_(left, right);
}

/* < */
function _60_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left < right;
    }

    throw "< expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* <= */
function _60__61_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left <= right;
    }

    throw "<= expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* > */
function _62_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left > right;
    }

    throw "> expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* >= */
function _62__61_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left >= right;
    }

    throw ">= expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* + */
function _43_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left + right;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
        return left.concat(right);
    }

    throw "+ requires two numbers or arrays; got '" + left + "' and '" + right + "' instead";
}

/* - */
function _45_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left - right;
    }

    throw "- expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* * */
function _42_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return left * right;
    }

    throw "* expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* / */
function _47_(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        return Math.floor(left / right);
    }

    throw "/ expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* % */
function _37_(left, right) {
    if (typeof left === "number" && typeof right === "numeber") {
        return left % right;
    }

    throw "% expects two numbers; got '" + left + "' and '" + right + "' instead";
}

/* $ */
function _36_(left, right) {
    // TODO
}

/* @> */
function _64__62_(one, two, three) {
    // TODO
}

/* <@ */
function _60__64_(one, two, three) {
    // TODO
}

/* : */
function _58_(left, right) {
    // TODO
}

/* .. */
function _46__46_(left, right) {
    // TODO
}

/* ! */
function _33_(arg) {
    if (typeof arg === "boolean") {
        return !arg;
    }

    throw "! requires a boolean, but got '" + arg + "' instead.";
}

/* unary - */
function unary_32__45_(arg) {
    if (typeof arg === "number") {
        return -arg;
    }

    throw "Unary - requires a number, but got'" + arg + "' instead.";
}

/* print() */
function print(arg) {
    if (Array.isArray(arg)) { // TODO check that it's an array of numbers
        console.log(String.fromCodePoint.apply(this, arg));
        return arg; // TODO ???
    }

    throw "print() requires an array of characters, but got '" + arg + "' instead.";
}


/* ENV environment stuff (currently just argv) */
const ENV = {
    argv: process.argv
}

/* IO functions */
const IO = {
    read: function (path) {
        // TODO
    },
    write: function (path, data) {
        // TODO
    }
}
