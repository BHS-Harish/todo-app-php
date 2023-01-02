<?php
    $conn=new mysqli("localhost","root","","tododb");
    if($conn->error)
        die("Connection Failed");
    if($_POST['todoId']&&$_POST['actionKey']){
        $todoId=$_POST['todoId'];
        $actionKey=$_POST['actionKey'];

        $sql="UPDATE `todos` SET `todoAction`=$actionKey WHERE `todos`.`todoId` ='$todoId'";
        $result=$conn->query($sql);
        if($result)
            echo("Action Updated");
    }
?>