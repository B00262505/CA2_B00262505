/**
 * Created by Andy on 17/11/2016.
 */
var lat,lng;
$().ready(function(){
    $("#new-image-button").bind("click",function(){
        console.log("Launch image capture");
        var image = $("#new-image-image");
        image.attr("src","gear.gif");
        //picture success set #new-image-image src as picture that was taken
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    });
    function onSuccess(imageData) {
        var image = document.getElementById('new-image-image');
        image.src = "data:image/jpeg;base64," + imageData;

    }
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    $("#new-clear-form-button").bind("click",function(){
        clearInputForm();
    });

    $("#new-save-form-button").bind("click",function(){
        var title = $("#new-title").val();
        var description = $("#new-description").val();
        var gpsEnabled = $("#new-gps-checkbox").is(":checked");
        var species = $("input[name='new-species-input']:checked").val();
        var timeDate = new Date();

        if (gpsEnabled){
            //get GPS location
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError,
                {enableHighAccuracy:true, maximumAge:30, timeout:27000});
        } else {
            //set no location
            lat = null;
            lng = null;
        }

        //save then clear
        saveSighting(title,description,species,timeDate,lat,lng);
        clearInputForm();
    });
    function geoSuccess(position){
        lat = (position.coords.latitude);
        lng = (position.coords.longitude);
    }

    function geoError(position){

    }

    //Initialise database


});


var db = null;

document.addEventListener('deviceready', function() {

    alert("Device ready... opening database....");
    db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
    alert("Db..."+db);

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        alert('Populated database OK');
    });

    db.transaction(function(tx) {
        tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
            alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
        }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });
    });
});


function saveSighting(title,description,species,timeDate,lat,lng){

}

function validateInputs(){

}

function clearInputForm(){
    $("#new-title").val("");
    $("#new-description").val("");
}