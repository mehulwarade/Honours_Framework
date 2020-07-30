<?php

$newline = "\r\n";
$nodeJsPath = 'switch_connect/index.js';

$descriptorspec = array(
    0 => array("pipe", "r"),
    // 1 => array('file', 'out.log', 'w'),  // https://stackoverflow.com/a/9446041
    1 => array('pipe', 'w')
);

// $ret = proc_open("node ".$nodeJsPath.' 2>&1', $descriptorspec, $pipes);
echo(getenv('TEST'));
echo('scshcshcsh' . $newline);
sleep(2);

//Kill all the processes for nodeJS.
// killnode();


function killnode(){
    //grep only works for linux and MAC
    echo('Node service running on PID: ' . exec('pgrep node') . $newline);
    $nodepid = exec('pgrep node');
    exec('kill ' . $nodepid); // https://stackoverflow.com/a/28045959
}





// proc_terminate($ret);