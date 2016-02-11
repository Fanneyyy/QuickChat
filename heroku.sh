#!/bin/bash

git add .
git commit -m "Heroku stuff"
git push origin master
git push heroku master
heroku open
heroku logs --tail