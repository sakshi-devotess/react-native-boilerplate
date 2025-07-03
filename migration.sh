#!/bin/sh
#This is a comment
echo Process start...
BRANCHNAME=$(git branch --show-current)
# Setting IFS (input field separator) value as ","
IFS='/'
read -ra arr <<< "$BRANCHNAME"
# Run command for create migration template
npm run typeorm migration:create src/migrations/${arr[1]}-${arr[2]}
echo Done
