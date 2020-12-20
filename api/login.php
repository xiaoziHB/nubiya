<?php

    $username = $_POST['username'];
    $password = $_POST['password'];
    // print_r($name);
    // $name = "孙九二";
    $con = mysqli_connect('localhost','root','xiaozi','nubiya');

    $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password'";

    $res = mysqli_query($con,$sql);

    $row = mysqli_fetch_assoc($res);
    if($row){
        print_r(json_encode($row,JSON_UNESCAPED_UNICODE));
    }else{
        print_r($row);
    }
    // print_r(json_encode($row,JSON_UNESCAPED_UNICODE));

?>