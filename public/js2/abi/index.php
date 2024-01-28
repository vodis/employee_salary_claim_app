<?php


unset($o);

$d = __DIR__."/";
$h = opendir($d);
while($f = readdir($h))
{
    if($f == "." || $f == "..")continue;
    $tf = $d.$f;
    $t = pathinfo($tf);
    //print_r($t);
    if($t[extension]=="abi")
    {
        $name = $t[filename];
        $a = file_get_contents($tf);
        $b = json_decode($a,1);
        $o[$name] = $b;
        /*
                if(!isset($o))
                {
                    $o = $b;
                }
                else
                {
                    $o = array_merge($o,$b);
                }
        */
    }
}
$a = json_encode($o,192);
print "var eth_abi = $a;";

?>
