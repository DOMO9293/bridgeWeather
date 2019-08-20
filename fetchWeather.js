function weatherBalloon( cityName ) {
  document.getElementById('citySelect').disabled = true;
    if(cityName === 'currPosition'){
      if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position) {
      fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude+'&lon='+position.coords.longitude+'&appid=' + key)
      .then(function(resp){
        return resp.json();
      })
      .then(function(data){
        console.log(data);
        document.getElementById('icon').src = 'http://openweathermap.org/img/wn/'+data['weather'][0]['icon']+'@2x.png';
        if(data['weather'][0]['icon'][2] === 'n'){
         document.getElementById('desc').innerText = 'Night with '+data['weather'][0]['description'];
        }else{
         document.getElementById('desc').innerText = 'Day with '+data['weather'][0]['description'];
        };
        document.getElementById("loc").innerText = data['name'];
        document.getElementById("temperature").innerText = Math.round(data['main']['temp']-273.15)+'°C';
         let now = new Date(data['dt'] * 1000);
        
         console.log(now.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })) ;
        document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        //document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', { timeZone: 'UTC' });
         
        
        document.getElementById('minmaxtemp').innerText = 
        Math.round(data['main']['temp_min']-273.15)+'°C'+'/'+Math.round(data['main']['temp_max']-273.15)+'°C';
      });

      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude+'&lon='+position.coords.longitude+'&appid=' + key)  
      .then(function(resp) { 
         // console.log('json',resp.json());
          return resp.json(); // Convert data to json
         })
      .then(function(data) {

        //주간예보
      
        for(let i = 1;i<6;i++){
          if(i===5){
            eval('document.getElementById("day'+i+'").getElementsByTagName("img")[0]["src"] = "http://openweathermap.org/img/wn/"+data["list"]['+39+']["weather"][0]["icon"]+"@2x.png";');
        }else{
          eval('document.getElementById("day'+i+'").getElementsByTagName("img")[0]["src"] = "http://openweathermap.org/img/wn/"+data["list"]['+i*8+']["weather"][0]["icon"]+"@2x.png";');
        }}

      // document.getElementById("day1").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day2").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day3").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][24]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day4").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][32]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day5").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][39]['weather'][0]['icon']+'@2x.png';
      

      let week = ['일', '월', '화', '수', '목', '금', '토'];
      for(let i = 1;i<5;i++){
        eval('var theday'+i+'= data["list"]['+i*8+']["dt_txt"].slice(0,10);');
        eval('day'+i+'OfWeek = week[new Date(theday'+i+').getDay()];');
        eval('document.getElementById("day'+i+'").getElementsByTagName("div")[0].innerHTML = data["list"]['+i*8+']["dt_txt"].slice(5,10) + "<br/>"+day'+i+'OfWeek;');
          }
      // let theday1 = data['list'][8]["dt_txt"].slice(0,10);
      // let day1OfWeek = week[new Date(theday1).getDay()];    
      // document.getElementById("day1").getElementsByTagName("div")[0].innerHTML = data['list'][8]["dt_txt"].slice(5,10)+'<br/>'+day1OfWeek;

      // let theday2 = data['list'][16]["dt_txt"].slice(0,10)
      // let day2OfWeek = week[new Date(theday2).getDay()]    
      // document.getElementById("day2").getElementsByTagName("div")[0].innerHTML = data['list'][16]["dt_txt"].slice(5,10)+'<br/>'+day2OfWeek;

      // let theday3 = data['list'][24]["dt_txt"].slice(0,10);
      // let day3OfWeek = week[new Date(theday3).getDay()];    
      // document.getElementById("day3").getElementsByTagName("div")[0].innerHTML = data['list'][24]["dt_txt"].slice(5,10)+'<br/>'+day3OfWeek;

      // let theday4 = data['list'][32]["dt_txt"].slice(0,10)
      // let day4OfWeek = week[new Date(theday4).getDay()]    
      // document.getElementById("day4").getElementsByTagName("div")[0].innerHTML = data['list'][32]["dt_txt"].slice(5,10)+'<br/>'+day4OfWeek;



      

      //----------------------------------------------------------------------------------------------------------
       
        //나절예보
        let day1currtime = parseInt(data['list'][0]['dt_txt'].slice(11,13));
        for(let i = 0 ; i<3 ; i++){
          eval('var thedate'+i+'= data["list"]['+i*8+']["dt_txt"].slice(5,10);');
          eval('document.getElementById("footerDate'+(i+1).toString()+'").innerHTML = data["list"]['+i*8+']["dt_txt"].slice(5,10) ')
          }
        if(day1currtime>3&&day1currtime<10){//처음으로 들어오는 시간이 새벽기준인 4시보다 늦었을때
          var cnt = 0;
          for(let i = 1;i<4;i++){
            for(let j = 1;j<5;j++){
              if(i === 1 && j === 1){
                eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
                eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
                eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
              }else{
              eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
              eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
              cnt += 2;
              }
            }
          }
          
        
          // document.getElementById('day1icon1').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';

          // document.getElementById('day1desc1').innerText = '-';
         
          // document.getElementById("day1temp1").innerText = '-';

   
          // document.getElementById('day1icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc2').innerText = data['list'][0]['weather'][0]['main'];
         
          // document.getElementById("day1temp2").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';

   
          // document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc3').innerText = data['list'][2]['weather'][0]['main'];
         
          // document.getElementById("day1temp3").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';

   
          // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc4').innerText = data['list'][4]['weather'][0]['main'];
         
          // document.getElementById("day1temp4").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc1').innerText = data['list'][6]['weather'][0]['main'];
          
          // document.getElementById("day2temp1").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc2').innerText = data['list'][8]['weather'][0]['main'];
          
          // document.getElementById("day2temp2").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc3').innerText = data['list'][10]['weather'][0]['main'];
          
          // document.getElementById("day2temp3").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc4').innerText = data['list'][12]['weather'][0]['main'];
          
          // document.getElementById("day2temp4").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';
          
          // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc1').innerText = data['list'][14]['weather'][0]['main'];
          
          // document.getElementById("day3temp1").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc2').innerText = data['list'][16]['weather'][0]['main'];
          
          // document.getElementById("day3temp2").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc3').innerText = data['list'][18]['weather'][0]['main'];
          
          // document.getElementById("day3temp3").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][20]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc4').innerText = data['list'][20]['weather'][0]['main'];
          
          // document.getElementById("day3temp4").innerText = Math.round(data['list'][20]['main']['temp']-273.15)+'°C';
        
           }
       else if(day1currtime>9&&day1currtime<18){
        var cnt = 0;
        for(let i = 1;i<4;i++){
          for(let j = 1;j<5;j++){
            if(i === 1 && (j === 1 || j===2)){
              eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
              eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
            }else{
            eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
            eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
            eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
            cnt += 2;
            }
          }
        }

        // document.getElementById('day1icon1').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';

        // document.getElementById('day1desc1').innerText = '-';
       
        // document.getElementById("day1temp1").innerText = '-';
 
        // document.getElementById('day1icon2').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';
 
        // document.getElementById('day1desc2').innerText = '-';
       
        // document.getElementById("day1temp2").innerText = '-';
 
        // document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc3').innerText = data['list'][0]['weather'][0]['main'];
       
        // document.getElementById("day1temp3").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';
 
        // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc4').innerText = data['list'][2]['weather'][0]['main'];
       
        // document.getElementById("day1temp4").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc1').innerText = data['list'][4]['weather'][0]['main'];
        
        // document.getElementById("day2temp1").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc2').innerText = data['list'][6]['weather'][0]['main'];
        
        // document.getElementById("day2temp2").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc3').innerText = data['list'][8]['weather'][0]['main'];
        
        // document.getElementById("day2temp3").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc4').innerText = data['list'][10]['weather'][0]['main'];
        
        // document.getElementById("day2temp4").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc1').innerText = data['list'][12]['weather'][0]['main'];
        
        // document.getElementById("day3temp1").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc2').innerText = data['list'][14]['weather'][0]['main'];
        
        // document.getElementById("day3temp2").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc3').innerText = data['list'][16]['weather'][0]['main'];
        
        // document.getElementById("day3temp3").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc4').innerText = data['list'][18]['weather'][0]['main'];
        
        // document.getElementById("day3temp4").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';
        
        
       }
       else if(day1currtime>17&&day1currtime<24){
         console.log(data);
         var cnt = 0;
        for(let i = 1;i<4;i++){
          for(let j = 1;j<5;j++){
            if(i === 1 && (j === 1 || j===2 || j === 3)){
              eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
              eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
            }else{
            eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
            eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
            eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
            cnt += 2;
            }
          }
        }

        // document.getElementById('day1icon1').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';

        // document.getElementById('day1desc1').innerText = '-';
       
        // document.getElementById("day1temp1").innerText = '-';
 
        // document.getElementById('day1icon2').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';
 
        // document.getElementById('day1desc2').innerText = '-';
       
        // document.getElementById("day1temp2").innerText = '-';
 
        // document.getElementById('day1icon3').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';
 
        // document.getElementById('day1desc3').innerText = '-';
       
        // document.getElementById("day1temp3").innerText = '-';
 
        // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc4').innerText = data['list'][0]['weather'][0]['main'];
       
        // document.getElementById("day1temp4").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc1').innerText = data['list'][2]['weather'][0]['main'];
        
        // document.getElementById("day2temp1").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc2').innerText = data['list'][4]['weather'][0]['main'];
        
        // document.getElementById("day2temp2").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc3').innerText = data['list'][6]['weather'][0]['main'];
        
        // document.getElementById("day2temp3").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc4').innerText = data['list'][8]['weather'][0]['main'];
        
        // document.getElementById("day2temp4").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc1').innerText = data['list'][10]['weather'][0]['main'];
        
        // document.getElementById("day3temp1").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc2').innerText = data['list'][12]['weather'][0]['main'];
        
        // document.getElementById("day3temp2").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc3').innerText = data['list'][14]['weather'][0]['main'];
        
        // document.getElementById("day3temp3").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc4').innerText = data['list'][16]['weather'][0]['main'];
        
        // document.getElementById("day3temp4").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';
        
      }
      else if(day1currtime>-1&&day1currtime<4){
        var cnt = 0;
        for(let i = 1;i<4;i++){
          for(let j = 1;j<5;j++){
            if(i === 1 && (j === 2 || j===3)){
              eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+(cnt+1)+"]['weather'][0]['icon']+'@2x.png';");  
              eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+(cnt+1)+']["weather"][0]["main"];');
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+(cnt+1)+']["main"]["temp"]-273.15)+"°C";');
              cnt += 2;
            }else{
            eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
            eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
            eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
            cnt += 2;
            }
          }
        }

      //  document.getElementById('day1icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc1').innerText = data['list'][0]['weather'][0]['main'];
      
      //  document.getElementById("day1temp1").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][3]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc2').innerText = data['list'][3]['weather'][0]['main'];
      
      //  document.getElementById("day1temp2").innerText = Math.round(data['list'][3]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][5]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc3').innerText = data['list'][5]['weather'][0]['main'];
      
      //  document.getElementById("day1temp3").innerText = Math.round(data['list'][5]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc4').innerText = data['list'][6]['weather'][0]['main'];
      
      //  document.getElementById("day1temp4").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';
        
      //  document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc1').innerText = data['list'][8]['weather'][0]['main'];
      
      //  document.getElementById("day2temp1").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc2').innerText = data['list'][10]['weather'][0]['main'];
      
      //  document.getElementById("day2temp2").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc3').innerText = data['list'][12]['weather'][0]['main'];
      
      //  document.getElementById("day2temp3").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc4').innerText = data['list'][14]['weather'][0]['main'];
      
      //  document.getElementById("day2temp4").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc1').innerText = data['list'][16]['weather'][0]['main'];
      
      //  document.getElementById("day3temp1").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc2').innerText = data['list'][18]['weather'][0]['main'];
      
      //  document.getElementById("day3temp2").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][20]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc3').innerText = data['list'][20]['weather'][0]['main'];
      
      //  document.getElementById("day3temp3").innerText = Math.round(data['list'][20]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][22]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc4').innerText = data['list'][22]['weather'][0]['main'];
      
      //  document.getElementById("day3temp4").innerText = Math.round(data['list'][22]['main']['temp']-273.15)+'°C';
        
      }
    })
        });
     }//처음화면 로딩,현재위치 잡힐 시
  }else{
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+',kr'+ '&appid=' + key)//오늘의 날씨  
      .then(function(resp) { 
         // console.log('json',resp.json());
          return resp.json(); // Convert data to json
         })
      .then(function(data) {
        document.getElementById('icon').src = 'http://openweathermap.org/img/wn/'+data['weather'][0]['icon']+'@2x.png';
        if(data['weather'][0]['icon'][2] === 'n'){
         document.getElementById('desc').innerText = 'Night with '+data['weather'][0]['description'];
        }else{
         document.getElementById('desc').innerText = 'Day with '+data['weather'][0]['description'];
        };
        document.getElementById("loc").innerText = data['name'];
        document.getElementById("temperature").innerText = Math.round(data['main']['temp']-273.15)+'°C';
         let now = new Date(data['dt'] * 1000);
        
         console.log(now.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })) ;
        document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        //document.getElementById('time').innerText ='측정시각 : '+ now.toLocaleString('ko-KR', { timeZone: 'UTC' });
         
        
        document.getElementById('minmaxtemp').innerText = 
        Math.round(data['main']['temp_min']-273.15)+'°C'+'/'+Math.round(data['main']['temp_max']-273.15)+'°C';
      });
      //---------------------------------------------------------------------------------------------------

      
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName+',kr'+ '&appid=' + key)  
      .then(function(resp) { 
         // console.log('json',resp.json());
          return resp.json(); // Convert data to json
         })
      .then(function(data) {

        //주간예보
      

      // document.getElementById("day1").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day2").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day3").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][24]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day4").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][32]['weather'][0]['icon']+'@2x.png';
      // document.getElementById("day5").getElementsByTagName("img")[0]["src"] = 'http://openweathermap.org/img/wn/'+data['list'][39]['weather'][0]['icon']+'@2x.png';


      let week = ['일', '월', '화', '수', '목', '금', '토'];
      for(let i = 1;i<6;i++){
        if(i===5){
          eval('document.getElementById("day'+i+'").getElementsByTagName("img")[0]["src"] = "http://openweathermap.org/img/wn/"+data["list"]['+39+']["weather"][0]["icon"]+"@2x.png";'); 
        }else{
          eval('document.getElementById("day'+i+'").getElementsByTagName("img")[0]["src"] = "http://openweathermap.org/img/wn/"+data["list"]['+i*8+']["weather"][0]["icon"]+"@2x.png";');
          
        eval('var theday'+i+'= data["list"]['+i*8+']["dt_txt"].slice(0,10);');
        eval('day'+i+'OfWeek = week[new Date(theday'+i+').getDay()];');
        eval('document.getElementById("day'+i+'").getElementsByTagName("div")[0].innerHTML = data["list"]['+i*8+']["dt_txt"].slice(5,10) + "<br/>"+day'+i+'OfWeek;')
        
        

        }
        

          }
      // let theday1 = data['list'][8]["dt_txt"].slice(0,10);
      // let day1OfWeek = week[new Date(theday1).getDay()];    
      // document.getElementById("day1").getElementsByTagName("div")[0].innerHTML = data['list'][8]["dt_txt"].slice(5,10)+'<br/>'+day1OfWeek;

      // let theday2 = data['list'][16]["dt_txt"].slice(0,10)
      // let day2OfWeek = week[new Date(theday2).getDay()]    
      // document.getElementById("day2").getElementsByTagName("div")[0].innerHTML = data['list'][16]["dt_txt"].slice(5,10)+'<br/>'+day2OfWeek;

      // let theday3 = data['list'][24]["dt_txt"].slice(0,10);
      // let day3OfWeek = week[new Date(theday3).getDay()];    
      // document.getElementById("day3").getElementsByTagName("div")[0].innerHTML = data['list'][24]["dt_txt"].slice(5,10)+'<br/>'+day3OfWeek;

      // let theday4 = data['list'][32]["dt_txt"].slice(0,10)
      // let day4OfWeek = week[new Date(theday4).getDay()]    
      // document.getElementById("day4").getElementsByTagName("div")[0].innerHTML = data['list'][32]["dt_txt"].slice(5,10)+'<br/>'+day4OfWeek;



      

      //----------------------------------------------------------------------------------------------------------
       
        //나절예보
        let day1currtime = parseInt(data['list'][0]['dt_txt'].slice(11,13));

        for(let i = 0 ; i<3 ; i++){
        eval('var thedate'+i+'= data["list"]['+i*8+']["dt_txt"].slice(5,10);');
        eval('document.getElementById("footerDate'+(i+1).toString()+'").innerHTML = data["list"]['+i*8+']["dt_txt"].slice(5,10) ')
        }
        if(day1currtime>3&&day1currtime<10){//처음으로 들어오는 시간이 새벽기준인 4시보다 늦었을때
          var cnt = 0;
          for(let i = 1;i<4;i++){
            for(let j = 1;j<5;j++){
              if(i === 1 && j === 1){
                eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
                eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
                eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
              }else{
              eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
              eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
              cnt += 2;
              }
            }
          }
          // document.getElementById('day1icon1').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';

          // document.getElementById('day1desc1').innerText = '-';
         
          // document.getElementById("day1temp1").innerText = '-';
   
          // document.getElementById('day1icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc2').innerText = data['list'][0]['weather'][0]['main'];
         
          // document.getElementById("day1temp2").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';
   
          // document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc3').innerText = data['list'][2]['weather'][0]['main'];
         
          // document.getElementById("day1temp3").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';
   
          // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';
   
          // document.getElementById('day1desc4').innerText = data['list'][4]['weather'][0]['main'];
         
          // document.getElementById("day1temp4").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc1').innerText = data['list'][6]['weather'][0]['main'];
          
          // document.getElementById("day2temp1").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc2').innerText = data['list'][8]['weather'][0]['main'];
          
          // document.getElementById("day2temp2").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc3').innerText = data['list'][10]['weather'][0]['main'];
          
          // document.getElementById("day2temp3").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

          // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day2desc4').innerText = data['list'][12]['weather'][0]['main'];
          
          // document.getElementById("day2temp4").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';
          
          // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc1').innerText = data['list'][14]['weather'][0]['main'];
          
          // document.getElementById("day3temp1").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc2').innerText = data['list'][16]['weather'][0]['main'];
          
          // document.getElementById("day3temp2").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc3').innerText = data['list'][18]['weather'][0]['main'];
          
          // document.getElementById("day3temp3").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';

          // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][20]['weather'][0]['icon']+'@2x.png';

          // document.getElementById('day3desc4').innerText = data['list'][20]['weather'][0]['main'];
          
          // document.getElementById("day3temp4").innerText = Math.round(data['list'][20]['main']['temp']-273.15)+'°C';
            
           }
       else if(day1currtime>9&&day1currtime<18){
        var cnt = 0;
        for(let i = 1;i<4;i++){
          for(let j = 1;j<5;j++){
            if(i === 1 && (j === 1 || j===2)){
              eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
              eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
            }else{
            eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
            eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
            eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
            cnt += 2;
            }
          }
        }
        // document.getElementById('day1icon1').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';

        // document.getElementById('day1desc1').innerText = '-';
       
        // document.getElementById("day1temp1").innerText = '-';
 
        // document.getElementById('day1icon2').src = 'https://image.flaticon.com/icons/svg/271/271207.svg';
 
        // document.getElementById('day1desc2').innerText = '-';
       
        // document.getElementById("day1temp2").innerText = '-';
 
        // document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc3').innerText = data['list'][0]['weather'][0]['main'];
       
        // document.getElementById("day1temp3").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';
 
        // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc4').innerText = data['list'][2]['weather'][0]['main'];
       
        // document.getElementById("day1temp4").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc1').innerText = data['list'][4]['weather'][0]['main'];
        
        // document.getElementById("day2temp1").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc2').innerText = data['list'][6]['weather'][0]['main'];
        
        // document.getElementById("day2temp2").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc3').innerText = data['list'][8]['weather'][0]['main'];
        
        // document.getElementById("day2temp3").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc4').innerText = data['list'][10]['weather'][0]['main'];
        
        // document.getElementById("day2temp4").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc1').innerText = data['list'][12]['weather'][0]['main'];
        
        // document.getElementById("day3temp1").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc2').innerText = data['list'][14]['weather'][0]['main'];
        
        // document.getElementById("day3temp2").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc3').innerText = data['list'][16]['weather'][0]['main'];
        
        // document.getElementById("day3temp3").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc4').innerText = data['list'][18]['weather'][0]['main'];
        
        // document.getElementById("day3temp4").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';
        
        
       }
       else if(day1currtime>17&&day1currtime<24){
        console.log(data);
        var cnt = 0;
       for(let i = 1;i<4;i++){
         for(let j = 1;j<5;j++){
           if(i === 1 && (j === 1 || j===2 || j === 3)){
             eval('document.getElementById("day'+i+'icon'+j+'").src = "https://image.flaticon.com/icons/svg/271/271207.svg";');
             eval("document.getElementById('day"+i+"desc"+j+"').innerText = '-';");
             eval('document.getElementById("day'+i+'temp'+j+'").innerText = "-";');
           }else{
           eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
           eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
           eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
           cnt += 2;
           }
         }
       }
        // document.getElementById('day1icon1').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';

        // document.getElementById('day1desc1').innerText = '-';
       
        // document.getElementById("day1temp1").innerText = '-';
 
        // document.getElementById('day1icon2').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';
 
        // document.getElementById('day1desc2').innerText = '-';
       
        // document.getElementById("day1temp2").innerText = '-';
 
        // document.getElementById('day1icon3').src = 'https://www.flaticon.com/premium-icon/icons/svg/1628/1628954.svg';
 
        // document.getElementById('day1desc3').innerText = '-';
       
        // document.getElementById("day1temp3").innerText = '-';
 
        // document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';
 
        // document.getElementById('day1desc4').innerText = data['list'][0]['weather'][0]['main'];
       
        // document.getElementById("day1temp4").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][2]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc1').innerText = data['list'][2]['weather'][0]['main'];
        
        // document.getElementById("day2temp1").innerText = Math.round(data['list'][2]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][4]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc2').innerText = data['list'][4]['weather'][0]['main'];
        
        // document.getElementById("day2temp2").innerText = Math.round(data['list'][4]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc3').innerText = data['list'][6]['weather'][0]['main'];
        
        // document.getElementById("day2temp3").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';

        // document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day2desc4').innerText = data['list'][8]['weather'][0]['main'];
        
        // document.getElementById("day2temp4").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc1').innerText = data['list'][10]['weather'][0]['main'];
        
        // document.getElementById("day3temp1").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc2').innerText = data['list'][12]['weather'][0]['main'];
        
        // document.getElementById("day3temp2").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc3').innerText = data['list'][14]['weather'][0]['main'];
        
        // document.getElementById("day3temp3").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

        // document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

        // document.getElementById('day3desc4').innerText = data['list'][16]['weather'][0]['main'];
        
        // document.getElementById("day3temp4").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';
        
      }
      else if(day1currtime>-1&&day1currtime<4){
        var cnt = 0;
        for(let i = 1;i<4;i++){
          for(let j = 1;j<5;j++){
            if(i === 1 && (j === 2 || j===3)){
              eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+(cnt+1)+"]['weather'][0]['icon']+'@2x.png';");  
              eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+(cnt+1)+']["weather"][0]["main"];');
              eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+(cnt+1)+']["main"]["temp"]-273.15)+"°C";');
              cnt += 2;
            }else{
            eval("document.getElementById('day"+i+"icon"+j+"').src = 'http://openweathermap.org/img/wn/'+data['list']["+cnt+"]['weather'][0]['icon']+'@2x.png';");  
            eval('document.getElementById("day'+i+'desc'+j+'").innerText = data["list"]['+cnt+']["weather"][0]["main"];');
            eval('document.getElementById("day'+i+'temp'+j+'").innerText = Math.round(data["list"]['+cnt+']["main"]["temp"]-273.15)+"°C";');
            cnt += 2;
            }
          }
        }
      //  document.getElementById('day1icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][0]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc1').innerText = data['list'][0]['weather'][0]['main'];
      
      //  document.getElementById("day1temp1").innerText = Math.round(data['list'][0]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][3]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc2').innerText = data['list'][3]['weather'][0]['main'];
      
      //  document.getElementById("day1temp2").innerText = Math.round(data['list'][3]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][5]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc3').innerText = data['list'][5]['weather'][0]['main'];
      
      //  document.getElementById("day1temp3").innerText = Math.round(data['list'][5]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day1icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][6]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day1desc4').innerText = data['list'][6]['weather'][0]['main'];
      
      //  document.getElementById("day1temp4").innerText = Math.round(data['list'][6]['main']['temp']-273.15)+'°C';
        
      //  document.getElementById('day2icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][8]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc1').innerText = data['list'][8]['weather'][0]['main'];
      
      //  document.getElementById("day2temp1").innerText = Math.round(data['list'][8]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][10]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc2').innerText = data['list'][10]['weather'][0]['main'];
      
      //  document.getElementById("day2temp2").innerText = Math.round(data['list'][10]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][12]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc3').innerText = data['list'][12]['weather'][0]['main'];
      
      //  document.getElementById("day2temp3").innerText = Math.round(data['list'][12]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day2icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][14]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day2desc4').innerText = data['list'][14]['weather'][0]['main'];
      
      //  document.getElementById("day2temp4").innerText = Math.round(data['list'][14]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon1').src = 'http://openweathermap.org/img/wn/'+data['list'][16]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc1').innerText = data['list'][16]['weather'][0]['main'];
      
      //  document.getElementById("day3temp1").innerText = Math.round(data['list'][16]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon2').src = 'http://openweathermap.org/img/wn/'+data['list'][18]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc2').innerText = data['list'][18]['weather'][0]['main'];
      
      //  document.getElementById("day3temp2").innerText = Math.round(data['list'][18]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon3').src = 'http://openweathermap.org/img/wn/'+data['list'][20]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc3').innerText = data['list'][20]['weather'][0]['main'];
      
      //  document.getElementById("day3temp3").innerText = Math.round(data['list'][20]['main']['temp']-273.15)+'°C';

      //  document.getElementById('day3icon4').src = 'http://openweathermap.org/img/wn/'+data['list'][22]['weather'][0]['icon']+'@2x.png';

      //  document.getElementById('day3desc4').innerText = data['list'][22]['weather'][0]['main'];
      
      //  document.getElementById("day3temp4").innerText = Math.round(data['list'][22]['main']['temp']-273.15)+'°C';
        
      }
    })

      .catch(function() {
        // catch any errors
      });
    }
    
    document.getElementById('citySelect').disabled = false;

    
  }
  
  //  window.onload = function() {  //아마 기본적으로 처음 화면 구성 내용인듯.
  //    weatherBallon( 'Seoul' );
  //  }
window.onload=function(){   // 스크립트태그 위치가 위에 있어서 load완료시 작동 하도록.
  document.getElementById('citySelect').addEventListener('change',function(){
    weatherBalloon(this.value);//셀렉트창변경시 로딩
    console.log('hi'+this.value);  // this.innerText 하면 main에서 id는 따로 안줘도 될 것 같은데 this는 select node로 넘어옴. 
  })
  document.getElementById('refresher').addEventListener('click',function(){
    alert(document.getElementById('loc').innerText+'의 날씨정보를 갱신합니다');
    weatherBalloon(document.getElementById('loc').innerText); 
  })
  weatherBalloon(document.getElementById('citySelect').children[0].value) // 처음 화면 구성 시 기본 location기준 로딩
  console.log('this is'+document.getElementById('citySelect').children[0].value);
}

  // f1 branch test code

  /*제가 시험삼아 구현해본 코드입니다.
  -우선 현재지역,셀렉트창 변경 후 현재온도 정도만 구현해봤습니다.
  -처음 화면 구성 시 현재 위치기준으로 로딩되면 어떨까 싶습니다.
  -현재위치의 날씨는 지역이름이 아니라 경도,위도로 정보를 받아야해서 지금 코드로는 fetch를 두가지로 받아야합니다.
  let cityName = document.getElementById("citylist");
let currtemp =document.getElementById("temperture");
let currtime ;
let currminmax=document.getElementById("minmaxtemp");
let currposition = document.getElementById("loc");

const key = '8c5ed4c3d08a816a8f5821fa97c60239'

  
   window.onload = function() {  

    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position) {
        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude+'&lon='+position.coords.longitude+'&appid=' + key)
    .then(function(curr){
      return curr.json()
    })
    .then(function(currpos){
      console.log('this is real city temp :'+(currpos.main.temp-273));
      currtemp.innerHTML = (currpos.main.temp-273.15).toFixed(1)+'°C';
      currminmax.innerHTML = (currpos.main.temp_min-273.15).toFixed(1) + '°C / '+(currpos.main.temp_max-273).toFixed(1) +'°C';
      currposition.innerHTML = currpos.name;
    })
      });
   }
   
   
   cityName.onchange = function(){
    realcityname = cityName.options[cityName.selectedIndex].value

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + realcityname+ '&appid=' + key)  
    .then(function(resp) { 
        return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      console.log(cityName.options[cityName.selectedIndex].value);
      currtemp.innerHTML = (data.main.temp-273.15).toFixed(1)+'°C';
      currminmax.innerHTML = (data.main.temp_min-273.15).toFixed(1) + '°C / '+(data.main.temp_max-273).toFixed(1) +'°C';
      currposition.innerHTML = data.name;
    })
   }
   
  }
  

 */

  
  
  //  window.onload = function() {  //아마 기본적으로 처음 화면 구성 내용인듯.
  //    weatherBallon( 'Seoul' );
  //  }

