/* this is define that your server using HTTPS / SSL */
/*
var fs = require('fs');
var app = require('express')();
var https = require('require');
var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/yourdirectoryprivkey/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yourdirectoryfullchain/fullchain.pem'),
    requestCert: false,
    rejectUnauthorized: false
},app);
var io = require('socket.io')(server);
*/

/* using this when your server not using HTTPS / SSL */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//==========================================================================================
var users = [];
var pendingInformation = [];
server.listen(81);
io.on('connection', function (socket) {
	socket.on('reg', function (data) {
		/* this is function to register some user*/
		if(!isExistUser(users,'ID',data.myID)){
			users.push({'ID':data.myID,'socket_id':socket.id});
		}else{
			users[get_object_index(users,'ID',data.myID)]={'ID':data.myID,'socket_id':socket.id};
		}
		/* this is function temp data pending message some user*/
		if(!isExistUser(pendingInformation,'ID',data.myID)){
			pendingInformation.push({'ID':data.myID,'msg':[]});
		}
		if(isExistUser(pendingInformation,'ID',data.myID)){
			var pending=pendingInformation[get_object_index(pendingInformation,'ID',data.myID)].msg;
			io.to(users[get_object_index(users,'ID',data.myID)].socket_id).emit('message_pending',
				{pending}
			);
			pendingInformation[get_object_index(pendingInformation,'ID',data.myID)].msg=[];
		}
	});
	/* this is function send message to some user*/
	socket.on('send_message',function(data){
		if(isExistUser(users,'ID',data.toID)){
			io.to(users[get_object_index(users,'ID',data.toID)].socket_id).emit('message', {data});
		}else{
			if(isExistUser(pendingInformation,'ID',data.toID)){
				pendingInformation[get_object_index(pendingInformation,'ID',data.toID)].msg.push(data);
			}
		}
	});
	socket.on('disconnect',function(){
		if(isExistUser(users,'socket_id',socket.id)){
			var last_id=users[get_object_index(users,'socket_id',socket.id)].ID;
			users.splice(get_object_index(users,'socket_id',socket.id), 1);
		}
	});
});
function get_object_index(object,index,where){
	return object.findIndex(function(obj) { return obj[index] === where;});
}
function isExistAdministrator(object){
	return object[get_object_index(object,'ID','administrator')]==undefined?false:true;
}
function isExistUser(object,index,userid){
	return object[get_object_index(object,index,userid)]==undefined?false:true;
}
