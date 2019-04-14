<?php
require '../vendor/autoload.php';

Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=flight','faruk','12345678'));


Flight::route('GET /cars', function(){
    $skip = Flight::request()->query['skip'];
    $limit = Flight::request()->query['limit'];

    if(!$skip || !is_numeric($skip)) $skip = 0;
    if(!$limit || !is_numeric($limit) || $limit < $skip || $limit > 200) $limit = $skip + 20;

    $get = "SELECT * FROM cars LIMIT {$skip}, {$limit}";
    
    $stmt = Flight::db()->prepare($get);
    $stmt->execute();
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    Flight::json($cars);
});

Flight::route('POST /cars', function(){
    $request = Flight::request()->data->getData();
    // return name;
    // return Flight::json($request);
    $insert = "INSERT INTO cars (name, model, year, power) VALUES(:name, :model, :year, :power)";
    $stmt= Flight::db()->prepare($insert);
    $stmt->execute($request);
});

Flight::route('PUT /cars/@id', function($id){
    $request = Flight::request()->data->getData();
    $request['id'] = $id;

    $update = "UPDATE cars SET name = :name, model = :model, year = :year, power = :power WHERE id = :id";
    
    $stmt= Flight::db()->prepare($update);
    $stmt->execute($request);
});

Flight::route('DELETE /cars/@id', function($id){
    $request = Flight::request()->data->getData();
    $request['id'] = $id;

    $delete = "DELETE FROM cars WHERE id = :id";
    
    $stmt= Flight::db()->prepare($delete);
    $stmt->execute(["id" => $id]);
});

Flight::start();
?>
