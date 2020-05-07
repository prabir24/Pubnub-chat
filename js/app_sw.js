if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err));
}



/*var absolute;
var alpha;
var beta;
var gamma;
var myState;
var msg;

function handleOrientation(event) {

    absolute = event.absolute;
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
    //console.log("Device1 Orentation - " + absolute);
    console.log("Device2 Orentation - " + alpha);
    //console.log("Device3 Orentation - " + beta);
    //console.log("Device4 Orentation - " + gamma);
    var msg = document.querySelector("#console-message-input").value;
    var username = document.querySelector("#txtUsername").value;
    //var messageSend = document.querySelector("#send-button");  
    console.log("Username - " + username + " " + msg);              
    if(alpha > 70 && alpha < 85 && username == 'Prabir' && msg != null) {
        console.log("Device2 Orentation - " + alpha);
        publish();
    }
}*/