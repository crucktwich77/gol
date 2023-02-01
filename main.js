prediction_1 = ""; prediction_2 = "";
Webcam.set({
    width:350,
    heigt:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

});
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Q8iREfrGB/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}
function speak(){
    var synth =window.SpeechSynthesis;
    speak_data_1 = "la primera prediccion es" + prediction_1;
    speak_data_2 = " y la segunda prediccion es" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(uttherThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="feliz")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522"

        }
        if(results[0].label=="trite")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532"

        }
        if(results[0].label=="nojao")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548"
          


        }
        if(results[0].label=="piedra")
        {
            document.getElementById("update_emoji").innerHTML = "&#129320"

        }
    }
}
