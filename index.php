<?php

function startnodejs() { 
    $nodeJsPath = 'switch_connect/index.js';
    //https://stackoverflow.com/a/6016750
    $descriptorspec = array(
        0 => array("pipe", "r"),
        // 1 => array('file', 'logs/index.php.log', 'w'),  // https://stackoverflow.com/a/9446041
        // 1 => array('pipe', 'w')
    );
    echo 'Started';
    $ret = proc_open("node ".$nodeJsPath.' 2>&1', $descriptorspec, $pipes);
} 
function stopnodejs() { 
    echo('Node service running on PID: ' . exec('pgrep node'));
    $nodepid = exec('pgrep node');
    exec('kill ' . $nodepid); // https://stackoverflow.com/a/28045959
} 


?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>FEPAC</title>
        <meta name="author" content="Mehul Warade" />  
    </head>
    <body>
    Welcome to FEPAC (framework for evaluating parallel algorithms on cluster)
    <br>
    Current supported algorithm language: python
    <br>
    <?php
        if(array_key_exists('startnodejs', $_POST)) { 
            startnodejs(); 
        } 
        else if(array_key_exists('stopnodejs', $_POST)) { 
            stopnodejs(); 
        } 
    ?> 
  
    <form method="post"> 
        <input type="submit" name="startnodejs"
                class="button" value="Start NodeJS connection to switch" /> 
          
        <input type="submit" name="stopnodejs"
                class="button" value="Kill NodeJS process" /> 
    </form> 

    </body>
</html>