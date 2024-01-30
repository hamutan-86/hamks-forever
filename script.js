/* ここのソースコード見るなんて君は変わり者だね
でもせっかく来てくれたのにごめんね、超スパゲッティーコードなんだ
コードの真相はハムカスのみぞ知るよ */

window.onload = function(){
  var header = document.querySelector('header');
  header.style.width = `${window.screen.width}px`;
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  document.getElementById("clock").innerText = `${hours}:${minutes}`
  fetch("https://ipapi.co/json").then(response => response.json()).then(data => {
    var city = data["region"]
    const citytoweather = {"Hokkaido": "016010", "Aomori": "020010", "Iwate": "030010", "Miyagi": "040010", "Akita": "050010", "Yamagata": "060010", "Fukushima": "070010", "Ibaragi": "080010", "Tochigi": "090010", "Gunma": "100010", "Saitama": "110010", "Chiba": "120010", "Tokyo": "130010", "Kanagawa": "140010", "Niigata": "150010", "Osaka": "270000", "Hyogo": "280010", "Kyoto": "260010", "Wakayama": "300010"}
    var cityno = ""
    for (let key in citytoweather){
      if (city === key){
        cityno = citytoweather[key]
      }
    }
    if (cityno === ""){
      document.getElementById("temperature").innerText = "天気非対応の地域"
    }else{
      fetch(`https://weather.tsukumijima.net/api/forecast/city/${cityno}`).then(res => res.json()).then(resp => {
        var temp = resp["forecasts"][0]["temperature"]["max"]["celsius"] - resp["forecasts"][0]["temperature"]["min"]["celsius"]
        document.getElementById("temperature").innerText = `${temp}℃`
        document.getElementById("weathericon").src = resp["forecasts"][0]["image"]["url"]
      })
    }
  })
  setInterval(() => {
    var time = new Date();
    if(minutes != time.getMinutes()){
      var hours = time.getHours();
      var minutes = time.getMinutes();
      document.getElementById("clock").innerText = `${hours}:${minutes}`;
    }
  }, 1000);
}
