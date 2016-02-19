#!/bin/bash
git add .
git commit -m "heroku fix"
git push origin master
git push heroku master
heroku open
# heroku logs --tail