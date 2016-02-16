# QuickChat
Assignment for Web Programming 2

## Project Setup

#### Requirements:
[The installation requires npm, please refer to this how-to if needed](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

Cloning the Repository:
``` 
git clone https://github.com/Fanneyyy/QuickChat.git
``` 

If you don't have gulp installed please start by installing it globally:
```
sudo npm install -g gulp
``` 

Install dependencies in main folder:
```
cd QuickChat
npm install
``` 

Run all gulp tasks and open the application locally:
```
gulp
```

#### Host the application on Heroku (optional):
[Get a Heroku account](https://www.heroku.com/home)

[Setup Heroku Toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

Login to heroku from your command shell
```
heroku login
```
Create a Heroku application:
```
heroku create
git push heroku master
heroku open
```