function getResponse() {
    const canvas = document.getElementById('canvas');
    const imageData = canvas.toDataURL('image/jpeg');
    var formData = new FormData();
    formData.append("image",imageData)

    $.ajax({
        type: "POST",
        url: "/classify",
        data: formData,
        processData: false,  
        contentType: false,  
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
}

async function startWebcam() {
    const constraints = {
        video: {
            width: {
              min: 300,
              ideal: 450,
              max: 600,
            },
            height: {
              min: 300,
              ideal: 450,
              max: 600
            }},
        audio: false,
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const webcam = document.getElementById('camera');
        webcam.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the webcam:', error);
    }
}

function captureImage() {
    const webcam = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const capturedImage = document.getElementById('capturedImage');

    const context = canvas.getContext('2d');
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
    capturedImage.src = canvas.toDataURL('image/jpeg');
}

window.onload = startWebcam;

setInterval(getResponse, 3000);