# QuickChat
Assignment for Web Programming 2
[Hosted on Heroku](https://fanneyyy-quickchat.herokuapp.com/#/home/index)

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

## Project UI
QuickChat is set up as a web application. The user picks it's username and is ready to go. The application has minimal security, only allowing one user with a specific username to be connected at a time. The login prompts the user if input is empty and also if the username is taken.

After login QuickChat shows a list of available rooms, displaying the number of current user for each, as well as giving the user the option of creating a room. The user can specify a topic for his room when he creates it if he wants but the room name is required.

Inside each room the user can view all messages that are visible to him. He/she can then send messages to the message feed as well as send private messages to users in the room. The user can choose one or more people from the select box to send a private message. A user can leave a room and rejoin if he wants.

### Operator privileges
The creator of each room in QuickChat has the privilege of being an operator. That is, he/she can kick/ban user from the room. Operators can also give other users operators privileges and take them away. Operators can kick/ban and deop each other. The user selects one or more users from the select box and presses the appropriate button to kick/ban/deop/op. If the user doesn't realise which buttons are used for what, the application offers tooltips that explain it better. If a user leaves a room he looses the operator privileges but if a user joins a room without a operator he will receive those privileges. A user is alerted to events such as being kicked and banned.

## Project Implementation
The application was developed for the latest Google Chrome Browser using Angular.js, HTML5 and CSS, with gulp. Other dependencies are listen in the package.json file and bower.json file.

## Server changes
Changes made to chatserver.js are as following:
* To be able to run the server with ```node chatserver.js``` and use Heroku we added an optional port and made the server run the index.js automatically.
* Conflict between users being in both listed as users and ops in server fixed (removed from userlist when giving op and vice versa).
* User automatically gets op when joining an empty room.
* Added a listener to chatupdate, that returns messageHistory to the user upon joining a room.
