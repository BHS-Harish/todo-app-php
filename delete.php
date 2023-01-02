<?php
    $conn=new mysqli("localhost","root","","tododb");
    if($conn->error)
        die("Connection Failed");
    if(isset($_POST['todoId'])){
        $todoId=$_POST['todoId'];

        $sql="DELETE FROM `todos` WHERE todoId='$todoId'";
        $result=$conn->query($sql);
        if($result)
            echo("Action Updated");
    }
?>