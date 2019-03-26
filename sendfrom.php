<?php
// using namespace Elephant.io
require 'vendor/autoload.php';
use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;
// require lib
// create client for server http://localhost:9009
$client = new Client(new Version2X('http://127.0.0.1:81'));
// open connection
$client->initialize();
$client->emit('send_message',
[
  'APPNAME'=> 'Message From You',
  'TITLE'=>'Message',
  'CONTENT'=>"This is content",
  'BIGCONTENT'=>"This is big content",
  'toID'=>'7866'
]);
// close connection
$client->close();
?>
