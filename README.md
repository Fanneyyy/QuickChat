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

## Project requirements

* The user should upon arrival specify his/her name/nick. If the nickname is free, i.e. no other user is currently active with the same name, (s)he can proceed, otherwise a new nick must be provided. Note: no password is required, just a nickname.
* After the user has identified, (s)he should see a list of chat rooms already active.
* The user should be able to join a chat room, and leave a room as well. It should of course also be possible to create a new room.
* Inside a given room, the user should be able to send messages to the room, see previous messages, and see new messages appear in real time (without having to refresh the page manually).
* It should be possible to send a private message to another user.
* The creator of a room should be able to kick a user from a room. A user which has been kicked from a room can re-enter. The creator can also ban a user, which means (s)he won't be able to join the room again.
* Each component (controller, factory, etc.) should be in a single file, but the files should be concatenated and minified when prepared for production, by using a grunt (or gulp) task.
* All external dependencies (AngularJS etc.) should be installed using bower (EDIT: or npm)
* The code should go through JSHint/JSLint without warnings. A grunt or gulp file should be included to ensure running jshint/jslint is easy.