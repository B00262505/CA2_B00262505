/**
 * Created by Andy on 17/11/2016.
 */
$().ready(function(){
    $("#new-image-button").bind("click",function(){
        console.log("Launch image capture");
        //picture success set #new-image-image src as picture that was taken
        navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});

    });
    $("#new-clear-form-button").bind("click",function(){

    });

    $("#new-save-form-button").bind("click",function(){
        var title = $("#new-title").val();
        var description = $("#new-description").val();
        var gpsEnabled = $("#new-gps-checkbox").is(":checked");
        var species = $("input[name='new-species-input']:checked").val();

        if (gpsEnabled){
            //get GPS location
        } else {
            //set no location
        }


        //save then clear
        clearInputForm();
    });
});

function validateInputs(){

}

function uploadPhoto(data){
// this is where you would send the image file to server

//output image to screen
    $("#new-image-image").src = "data:image/jpeg;base64," + data;
}

function clearInputForm(){
    $("#new-title").val("");
    $("#new-description").val("");
}