<?php
    $conn=new mysqli("localhost","root","","tododb");
    if($conn->error)
        die("Connection Failed");
    if($_GET['data']){
        $res=array();
        $sql="SELECT * FROM todos";
        $result=$conn->query($sql);
        if($result){
            while($row=$result->fetch_assoc()){
                $temp=array();
                $temp['todoId']=$row['todoId'];
                $temp['todoItem']=$row['todoItem'];
                $temp['todoAction']=$row['todoAction'];
                array_push($res,$temp);
            }
        }
        echo(json_encode($res));
    }
?>