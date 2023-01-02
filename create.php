<?php
    $conn=new mysqli("localhost","root","","tododb");
    if($conn->error)
        die("Connection Failed");
    if($_POST['data']){
        $newTodo=$_POST['data'];
        $todoAction=0;

        $sql="INSERT INTO `todos` (`todoId`, `todoItem`, `todoAction`) VALUES (NULL, '$newTodo', '$todoAction')";
        $result=$conn->query($sql);
        if($result)
            echo("Item Inserted..");
    }
?>