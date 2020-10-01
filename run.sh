#! /bin/sh

if [[ "$2" == "" ]]; then
    >&2 echo "Usage: ./run.sh <version> <input_file>";
    exit 1
fi

argfile="$(readlink -f $2)"

cd "$(dirname "$(readlink -f "$0")")/versions/$1"

node --stack-size=9000 --max-old-space-size=10000 vzp.js "$argfile"
