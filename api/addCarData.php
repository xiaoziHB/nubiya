<?php
    # 用户名 商品id 商品颜色
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $goods_color = $_GET['goods_color'];
    $goods_name = $_GET['goods_name'];
    $goods_price = $_GET['goods_price'];
    $goods_img = $_GET['goods_img'];
    $goods_Num = $_GET['goods_num'];
    
    // $username = "xiaozi";
    // $goods_id = "1571";
    // $goods_color = "骑士黑";
    // $goods_name = "nubia WATCH";
    // $goods_price = "1499";
    // $goods_img = "active/5f2002f0c2a5915.png";
    // $goods_Num = "2";
    
    $con = mysqli_connect('localhost','root','xiaozi','nubiya');


    $sql = "SELECT * FROM `car` WHERE `username`='$username' AND `goods_id`='$goods_id' AND `goods_color`='$goods_color' ";
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
    if($row){
        $goodsNum = $row['goods_num'] + $goods_Num; 
       $res2= mysqli_query($con,"UPDATE `car` SET `goods_num` = '$goodsNum'  WHERE `username`='$username' AND `goods_id`='$goods_id' AND `goods_color`='$goods_color'");
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,"INSERT INTO `car` (`goods_id`, `username`, `goods_num`, `goods_color`, `goods_name`, `goods_price`, `goods_img` ) VALUES ($goods_id, '$username', '$goods_Num', '$goods_color','$goods_name', '$goods_price', '$goods_img')");
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    } 
?>