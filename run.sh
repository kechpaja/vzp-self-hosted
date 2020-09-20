#! /bin/sh

if [[ "$3" == "" ]]; then
    echo "Usage: ./run.sh <version> <action> <input_file>";
    exit 1
fi

compiler="$(dirname $(readlink -f $0))/versions/$1/main.js"

node "$compiler" "$2" "$(readlink -f $3)"
