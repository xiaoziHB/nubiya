<?php

    //  当购物车获取数据的时候，前端需要传递用户名给后端 
    $username = $_GET['username'];

    #链接数据库
    $con = mysqli_connect('localhost','root','xiaozi','nubiya');

    # 设置SQL语句
    $sql = "SELECT * FROM `car` WHERE `username`='$username'";

    $res = mysqli_query($con,$sql);

    // if(!$res){
    //     die('error for mysql' . mysqli_error());
    // }
    // print_r($res);
    $arr = array();
    # 拿出该用户的购物车的上商品id
    while($row = mysqli_fetch_assoc($res)){
        array_push($arr,$row);
    }
    print_r(json_encode($arr));
?>