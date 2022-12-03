"use strict";
class GeoLocalizacion{

    constructor(){

    }

    initMap(){
        var posicion = {lat: 43.3672702, lng: -5.8502461};
        var mapa = new google.maps.Map(document.querySelector("aside"),{zoom: 8,
            center:posicion,
            mapTypeId: google.maps.MapTypeId.ROADMAP});
        var marcador = null;
        var pos_marker_lat = null;
        var pos_marker_lng = null;
        mapa.addListener("click", (pos) => {
            if(marcador!=null){
                marcador.setMap(null);
            }
            marcador = new google.maps.Marker({position:pos.latLng,map:mapa});
            
            pos_marker_lng = pos.latLng;
        });

        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({
            'location': pos_marker_lng 
            // ej. "-34.653015, -58.674850"
        }, function(results, status) {
            // si la solicitud fue exitosa
            if (status === google.maps.GeocoderStatus.OK) {
                // si encontró algún resultado.
                if (results[1]) {
                    console.log(results[1].formatted_address);
                }
            }
        });
    }

    mapbox(){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw';  
        var mapa = new mapboxgl.Map({ 
            container: document.querySelector("aside"), 
            style: 'mapbox://styles/mapbox/streets-v9',  
            center: [-5.8502461, 43.3672702],  
            zoom: 8
        });
        var marcador = null; 
        var ciudad = null;
        mapa.on('click', (pos) => {
            if(marcador!=null){
                marcador.remove();
            }
            marcador = new mapboxgl.Marker().setLngLat([pos.lngLat.lng,pos.lngLat.lat]).addTo(mapa);
            $("section").remove();
            $("p").remove();
            $.ajax({
                dataType: "json",
                url: "https://api.mapbox.com/geocoding/v5/mapbox.places/"+pos.lngLat.lng+","+pos.lngLat.lat+".json?types=place&access_token=pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw",
                method: 'GET',
                success: function(datos){
                    ciudad = datos.features[0].text;
                    $("aside").after("<section><h3>"+ciudad+"</h3>");
                    $.ajax({
                        dataType: "json",
                        url: "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&units=metric&lang=es&APPID=915adea5031404d0d1c49bbce08ec53d",
                        method: 'GET',
                        success: function(datos){
                            var icono = "<img src=http://openweathermap.org/img/wn/" + datos.weather[0].icon + "@2x.png alt=\"icono del Tiempo "+datos.name+"\"/>";
                            var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                            stringDatos += "<li>País: " + datos.sys.country + "</li>";
                            stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                            stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                            stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                            stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                            stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                            stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                            stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                            stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                            stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                            stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                            stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul></section>";
                        
                            $("h3").after(icono);
                            $("img[alt=\"icono del Tiempo "+datos.name+"\"").after(stringDatos);
                        },error:function(){
                            $("aside").after("<p>¡Tenemos problemas! "+ciudad+" no está dentro de la lista de lugares para los cuales OpenWeatherMap ofrece el tiempo</p>"); 
                            
                        }
                    });
                },error:function(){
                    $("aside").after("<p>¡Tenemos problemas! No puedo obtener JSON de MapBox</p>"); 
                    
                }
            });
            
        });
        
    }

}   

var mapaDinamicoGoogle = new GeoLocalizacion();
