# push-notification-socketio-php
Now you can integrate socket io with PHP, i'm using ElephantIO PHP to send into server.js socket io. 
if you newbie to use socket.io, you should to install Socket.IO at the first using node.js, NPM, don't forget to install express.

This server can handle when you send message to target user, but he is offline. don't worry, the target still receive your message when he's put online sometime. 

## Start The Server
just start your server like this command
``` 
node server.js
```
This server will run, but not running in the background. if you want to run in the background you must install npm forever, like this command
```
npm install forever --global
```
and you can run the server by using this command
```
forever start server.js
```
# want to ask me ?
if you want to ask me, send me mail : mail@andyresta.com
