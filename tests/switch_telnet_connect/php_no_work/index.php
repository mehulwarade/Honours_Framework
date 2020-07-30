<?php

require_once(__DIR__ . '/lib/telnet.php');

//Uncomment this to get debug logging
//TelnetClient::setDebug(true);

$telnet = new Telnet('192.168.50.150', 60000);

$telnet->connect();

print("Hellllo");
$telnet->write('admin');
$telnet->write('password');
// print($telnet->exec('admin'));
// $telnet->login('admin', 'password');

$cmdResult = $telnet->exec('? \ ');

$telnet->disconnect();

print("The contents of / is: \"{$cmdResult}\"\n");

// unset($telnet);