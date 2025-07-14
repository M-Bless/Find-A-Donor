#!/bin/bash

git add .

echo "Adding changes ..."
git commit -m "$m"
echo "Commiting changes ..."
echo "Enter your commit message:"

git push

echo "Pushing changes ..."
echo "SUCCESS [0]"
