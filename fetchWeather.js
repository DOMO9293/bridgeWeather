function weatherBalloon( cityName ) {
    var key = '8c5ed4c3d08a816a8f5821fa97c60239';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + key)  
    .then(function(resp) { 
        return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
//   window.onload = function() {  //아마 기본적으로 처음 화면 구성 내용인듯.
//     weatherBallon( 6167865 );
//   }

  document.getElementById("fetchButton").addEventListener("click", function(){
    weatherBalloon('Seoul');
    alert('hey!');
  });

  // f1 branch test code