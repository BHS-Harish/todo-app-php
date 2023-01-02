<?php
    $conn=new mysqli("localhost","root","","tododb");
    if($conn->error)
        die("Connection Failed");
    if(isset($_GET['todoId'])){
        $todoId=$_GET['todoId'];

        $sql="SELECT * FROM `todos` WHERE todoId='$todoId'";
        $result=$conn->query($sql);
        if($result){
            while($row=$result->fetch_array()){
                echo($row['todoItem']);
            }
        }
    }
    if(isset($_POST['todoId'])&&isset($_POST['data'])){
        $todoId=$_POST['todoId'];
        $todoItem=$_POST['data'];

        $sql="UPDATE `todos` SET `todoItem`='$todoItem' WHERE todoId='$todoId'";
        $result=$conn->query($sql);
        if($result)
            echo("Action Updated");
    }
?>