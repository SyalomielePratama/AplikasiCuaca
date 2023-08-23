let cuaca = {
    apiKey:'73aa9e69dca100b7eaf9cfa9bc9dc67a',
    fetchCuaca: function (kota){
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            +kota
            +'&units=metric&appid='
            +this.apiKey)
            .then((Response) => Response.json())
            .then((data) => this.tampilkanCuaca(data));
    },
    tampilkanCuaca : function (data) {
        const {name} = data;
        const {icon,description} = data.weather [0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".kota").innerText = "Cuaca " + name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".deskripsi").innerText = description;
        document.querySelector(".suhu").innerText = temp + "°C";
        document.querySelector(".angin").innerText = "Kecepatan Angin : " +speed + "KM/Jam";
        document.querySelector(".kelembapan").innerText = "Kelembapan : " +humidity + "%";
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?'+name+'")'
    },
    search:function (){
        this.fetchCuaca(document.querySelector(".search-bar").value);
    }
};
document.querySelector(".search button").addEventListener('click',function(){
    cuaca.search()
})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key =="Enter"){
        cuaca.search()
    }
})

cuaca.fetchCuaca("jakarta");