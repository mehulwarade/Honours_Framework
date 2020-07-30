var API_URL = "http://localhost:8000";

var barmaxvaluefix = 10;  
//This is used to adjust the maximum of the bars. 
//value = 10 for bar [0-10]. 
//Value = 10 for bar [0-4]
//Calculate by [ 100 / MAX_VALUE_YOU_WANT ]

var time_to_update_bar = 500; //in milliseconds

function start() {  
    var port1 = document.getElementById("port1bar");
    var port2 = document.getElementById("port2bar");
    var port3 = document.getElementById("port3bar");
    var port4 = document.getElementById("port4bar");
    var port5 = document.getElementById("port5bar");
    var port6 = document.getElementById("port6bar");
    var port7 = document.getElementById("port7bar");

    setInterval(frame, time_to_update_bar);

    function frame() {
        
        $.get(`${API_URL}/pwr`).then(response => {
            // console.log(response);

            port1.style.width = (response[1])*barmaxvaluefix +"%";
            port1.innerHTML = response[1].toFixed(3)  + "V";
    
            port2.style.width = (response[2])*barmaxvaluefix +"%";
            port2.innerHTML = response[2].toFixed(3)  + "V";

            port3.style.width = (response[3])*barmaxvaluefix +"%";
            port3.innerHTML = response[3].toFixed(3)  + "V";
    
            port4.style.width = (response[4])*barmaxvaluefix +"%";
            port4.innerHTML = response[4].toFixed(3)  + "V";

            port5.style.width = (response[5])*barmaxvaluefix +"%";
            port5.innerHTML = response[5].toFixed(3)  + "V";
    
            port6.style.width = (response[6])*barmaxvaluefix +"%";
            port6.innerHTML = response[6].toFixed(3)  + "V";

            port7.style.width = (response[7])*barmaxvaluefix +"%";
            port7.innerHTML = response[7].toFixed(3)  + "V";
    

        });

        
        
        // $.get(`${API_URL}/pwr`).then(response => {
        //     console.log(response);
        // });
    
    }
}




