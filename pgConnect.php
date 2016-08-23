<?php 
   $account=$_POST['account'];   
   $password=$_POST['password'];
   $account = hash('sha512', $account);// $account='zionhc';
   $password = hash('sha512', $password);// $password='messageZion';
   $title =  $_POST['title'];
   $content =  $_POST['message'];

   if(strcmp($account,"142b3e08f73c6935426e8ac567941e68eaae1f9593d58d98c9cc7cb907d0e95294e7ef905e3e03f4050359df107cb347d028b622558f0ca7f589eb7002aac8b6") == 0
    &&strcmp($password,"2a5e93ecfcd562c4c772961892a5493697628912c0fb2e394859ae6ec89cffcd1e50c2e7ab96a845aec7f333ca3d866f73059570099880cb6a763b1e34766b13") == 0  ){
      $host        = "host=52.27.202.101";
      $port        = "port=5432";
      $dbname      = "dbname=MSB";
      $credentials = "user=snake_eyes password=123456";
      $db = pg_connect( "$host $port $dbname $credentials"  );
      if(!$db){
         echo "Error : Unable to open database";
      } else {
         date_default_timezone_set("Asia/Taipei");
         $time = date("Y-m-d H:i:s");
         $sql =<<<EOF
            INSERT INTO news (heading,content,priority,place_top,is_deleted,time_created,last_updated,group_id)
            VALUES ('$title', '$content','0','true','false','$time','$time',5611267);
EOF;
         $ret = pg_query($db, $sql);
         if(!$ret){
            // echo pg_last_error($db);
            echo "Error : Query has error";
         } else {
            // echo "Records created successfully";
            echo "Successfully";
         }
         pg_close($db);         
      }      
   }else{
      echo "Wrong Account or Password !";
   }
?>
