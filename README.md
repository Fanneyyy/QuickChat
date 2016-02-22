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

## Project requirements (needs new chapter name)

* The user should upon arrival specify his/her name/nick. If the nickname is free, i.e. no other user is currently active with the same name, (s)he can proceed, otherwise a new nick must be provided. Note: no password is required, just a nickname.
* After the user has identified, (s)he should see a list of chat rooms already active.
* The user should be able to join a chat room, and leave a room as well. It should of course also be possible to create a new room.
* Inside a given room, the user should be able to send messages to the room, see previous messages, and see new messages appear in real time (without having to refresh the page manually).
* It should be possible to send a private message to another user.
* The creator of a room should be able to kick a user from a room. A user which has been kicked from a room can re-enter. The creator can also ban a user, which means (s)he won't be able to join the room again.
* Each component (controller, factory, etc.) should be in a single file, but the files should be concatenated and minified when prepared for production, by using a grunt (or gulp) task.
* All external dependencies (AngularJS etc.) should be installed using bower (EDIT: or npm)
* The code should go through JSHint/JSLint without warnings. A grunt or gulp file should be included to ensure running jshint/jslint is easy.

## Project user experience
Quickchat is set up as a web application. The user picks it's username and is ready to go. The application has minimal security, only allowing one user with a specific username be connected at a time. 

After login Quickchat shows a list of available rooms as well as giving the user the option of creating a room.

Inside the chat of a given room the user can view all messages that are visible to him. He/she can then send messages to the message feed as well as send private messages to users in the room.

### Operators privileges
The creator of each room in Quickchat has the privilege of an operator. That is, he/she can kick/ban user from the room. Operators can also give other users operators privileges.

## Server changes
Changes made to chatserver.js are as following:
* Conflict between users being in both listed as users and ops in server fixed (removed from userlist when giving op and vice versa).
* User automatically gets op when joinin an empty room
* Added a listener to chatupdate, that returns messageHistory to the user uppon joining a room.