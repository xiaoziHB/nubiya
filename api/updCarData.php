<?php
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $goods_color = $_GET['goods_color'];
    $goods_num = $_GET['goods_num'];

    
    $con = mysqli_connect('localhost','root','xiaozi','nubiya');

    $sql = "UPDATE `car` SET `goods_num` = ' $goods_num' WHERE `goods_id` = '$goods_id' AND `username` = '$username' AND `goods_color` = '$goods_color'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        // die('error for mysqli' . mysqli_error());
        echo json_encode(array("code"=>0,"msg"=>"修改数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"修改数据成功"));
    }
?>