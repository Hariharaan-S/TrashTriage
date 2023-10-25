
function getResponse() {
    Webcam.snap(function (data_uri) {
        var image = data_uri;
        // Create FormData and append the image data
        var formData = new FormData();
        formData.append("image", image);
        var count = 0;

        // Perform the AJAX request inside the callback
        $.ajax({
            type: "POST",
            url: "/classify",
            data: formData,
            processData: false,  // Important for FormData
            contentType: false,  // Important for FormData
            success: function (response) {
                console.log(response.prediction);
                var res = response.prediction
                if (res != null) {
                    var temp = res.split('$');
                    var newEle = document.createElement("tr");
                    temp.forEach(element => {
                        var t = element.split("#")[1];
                        var s = document.createElement("td");
                        s.textContent = t;
                        newEle.appendChild(s);
                    });

                    document.getElementById("result").appendChild(newEle);
                    document.getElementById("result").style.display = "block";
                }

            }
        });
    });
}

if(window.innerWidth <=500){
    Webcam.set({
        width: 200,
        height: 200,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
}
else{
    Webcam.set({
        width: 500,
        height: 500,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
}
Webcam.attach("#camera");

setInterval(getResponse, 3000);