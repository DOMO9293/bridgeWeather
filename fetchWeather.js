function weatherBalloon( cityName ) {
  document.getElementById('citySelect').disabled = true;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+',kr'+ '&appid=' + key)  
    .then(function(resp) { 
       // console.log('json',resp.json());
        return resp.json(); // Convert data to json
       })
    .then(function(data) {
     console.log(data);
     document.getElementById('icon').src = 'http://openweathermap.org/img/wn/'+data['weather'][0]['icon']+'@2x.png';
     if(data['weather'][0]['icon'][2] === 'n'){
      document.getElementById('desc').innerText = 'Night with '+data['weather'][0]['description'];
     }else{
      document.getElementById('desc').innerText = 'Day with '+data['weather'][0]['description'];
     };
     document.getElementById("loc").innerText = data['name'];
     document.getElementById("temperature").innerText = Math.round(data['main']['temp'])/10+'°C';
      let now = new Date(data['dt'] * 1000);
     
      console.log(now.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })) ;
     document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
     //document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', { timeZone: 'UTC' });
      
     
     document.getElementById('minmaxtemp').innerText = 
     Math.round(data['main']['temp_min'])/10+'/'+Math.round(data['main']['temp_max'])/10;
    })
     
    .catch(function() {
      // catch any errors
    });
    document.getElementById('citySelect').disabled = false;
  }
  
  //  window.onload = function() {  //아마 기본적으로 처음 화면 구성 내용인듯.
  //    weatherBallon( 'Seoul' );
  //  }
window.onload=function(){   // 스크립트태그 위치가 위에 있어서 load완료시 작동 하도록.
  document.getElementById('citySelect').addEventListener('change',function(){
    weatherBalloon(this.value);
    console.log(this.value);  // this.innerText 하면 main에서 id는 따로 안줘도 될 것 같은데 this는 select node로 넘어옴. 
  })
  document.getElementById('refresher').addEventListener('click',function(){
    alert(document.getElementById('loc').innerText+'의 날씨정보를 갱신합니다');
    weatherBalloon(document.getElementById('loc').innerText); 
  })
  weatherBalloon(document.getElementById('citySelect').children[0].value) // 처음 화면 구성 시 기본 location기준 로딩
  
}

  // f1 branch test code