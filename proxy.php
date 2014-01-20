<?php
$wsdl_url = "http://api.cleverreach.com/soap/interface_v5.1.php?wsdl";
$apiKey ="754a99acffacbd7f184c997899eaf933-2";
//$listId ="534825";
$listId ="536035";
$api = new SoapClient($wsdl_url);
$page = 0;

$pages = array();
header("Content-type: application/json");
$result = array("totalCount"=>0, 'items'=>array());


if (isset($_GET["op"]) && $_GET["op"]=="write" ) {
    try {
        $data=json_decode($_POST["data"]);
        $email=$data->email;
    } catch(Exception $ex) {
        $email="";
        error_log("jope");
    }
    $user = array(
        "email" => $email,
        "registered" => time(),
        "activated" => time(),
        "source" => "MY Project",
        "attributes" => array(
            0 => array("key" => "firstname", "value" => ""),
            1 => array("key" => "lastname", "value" => ""),
        )
    );

    $result = $api->receiverAdd($apiKey, $listId, $user);
//    $result= json_encode($return);

} else {
    do {
        $filter = array( "page"=>$page++,
            "filter"=>"active"
        );


        $return = $api->receiverGetPage($apiKey, $listId, $filter);
        if($return->status=="SUCCESS"){        //getting results
            $pages[]=$return->data;
        }
    }while($return->data);


    foreach ($pages as $page) {
        foreach ($page as $item) {
            $result["items"][]=array("id"=>$item->id,"email"=>$item->email,"activated"=>$item->activated,"active"=>$item->active);
            $result["totalCount"]++;

        }
    }
}

echo json_encode($result);