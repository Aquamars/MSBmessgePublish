<?php 
$host        = "host=52.27.202.101";
$port        = "port=5432";
$dbname      = "dbname=MSB";
$credentials = "user=snake_eyes password=123456";
$db = pg_connect( "$host $port $dbname $credentials"  );
if(!$db){
   echo "Error : Unable to open database";
} else {
   $sql =<<<EOF
      SELECT news_id, heading, content, last_updated, group_id from news WHERE (is_deleted = FALSE AND group_id='3') ORDER BY last_updated DESC;
EOF;
// $sql =<<<EOF
//       SELECT news_id, heading, content, last_updated, group_id from news;
// EOF;
   $ret = pg_query($db, $sql);
   while ($row = pg_fetch_row($ret)) {
     // echo "$row[0]####$row[1]####$row[3]####$row[4]";
     // echo "<br />\n";
      
      echo '            
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title" id="title'.$row[0].'">
                        <a data-toggle="collapse" id="t'.$row[0].'" href="#collapse'.$row[0].'">'.$row[1].'</a>                        
                    </h4>  '.$row[3].'
                </div>
                <div id="collapse'.$row[0].'" class="panel-collapse collapse">
                    <div class="panel-body" id="panel'.$row[0].'">
                        <div id="icons">
                           <div style="float:right;"><i class="glyphicon glyphicon-edit" onClick="editMsg('.$row[0].')" ></i></div>
                           <div></div>
                        </div>
                        <div class="well" id="well'.$row[0].'">
                        '.$row[2].'
                        </div>
                        <div id="icons">
                           <div style="float:right;"><i class="glyphicon glyphicon-trash" align="right" onClick="ShowDel('.$row[0].')" ></i></div>
                        </div>
                    </div>
                </div>
            </div>
            ';
   }
   if(!$ret){
      // echo pg_last_error($db);
      echo "Error : Query has error";
   } else {
       // echo "Records created successfully";
      // echo $ret;
   }
   pg_close($db);
}       
?>
