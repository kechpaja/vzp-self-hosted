#! /bin/sh

if [[ "$3" == "" ]]; then
    >&2 echo "Usage: ./run.sh <version> <action> <input_file>";
    exit 1
fi

argfile="$(readlink -f $3)"

cd "$(dirname $(readlink -f $0))/versions/$1"

node --stack-size=900000 main.js "$2" "$argfile"
