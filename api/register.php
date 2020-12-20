<?php
    $username = $_POST["username"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];

    // $username = "AAAAAfAA";
    // $password = "SSSSSSS";
    // $phone = "8987777";
    // echo json_encode(array("username"=>$username,"password"=>$password,"phone" => $phone));
    
    $con = mysqli_connect('localhost','root','xiaozi','nubiya');

    $sql = "INSERT INTO `user` (`username`, `password`, `phone`, `e-mail`, `nickname`, `id`) VALUES ('$username', '$password', '$phone', NULL, NULL, NULL);";

    $res = mysqli_query($con,$sql);
    // echo $res
    if(!$res){
        echo json_encode(array("code"=>false,"msg"=>"注册失败"));
    }else{
        echo json_encode(array("code"=>true,"msg"=>"注册成功"));;
    }

?>