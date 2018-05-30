var map;
var iniMap={lat:40.7291,lng:-73.9965};
const api_key="AIzaSyAzpOBqITSBf9XFZTm1OuSdU1KRqtJmCgw";
const geoJSON="https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const Neighborhood_Names_GIS="https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const Housing_New_York_Units_by_Building="https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
const Crimes_in_NY = "https://data.cityofnewyork.us/resource/9s4h-37hy.json";
var infoRows = [];
var DATA=[Neighborhood_Names_GIS,Housing_New_York_Units_by_Building,Crimes_in_NY,geoJSON];
var JDistric = $.get(Neighborhood_Names_GIS), JBuilds
=$.get(Housing_New_York_Units_by_Building), gJson = $.get(geoJSON) ;
var lat, lng;
//-------------------------------------------GoogleMaps--------------------------------------
//<!-- Funcion para crear el mapa -->
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: iniMap
    });
    var image = {
        url: 'https://78.media.tumblr.com/934d990f04d87c305b46286d0b344d1d/tumblr_p8sza8wLoG1xtc4kdo1_75sq.png',
        size: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    };
    var iniMarker = new google.maps.Marker({
        position: iniMap,
        map: map,
        icon: image,
    });

    map.data.loadGeoJson(geoJSON);
    map.data.setStyle(function(feature) {
      var color;
      var numero = feature.getProperty('BoroCD');
      var define = parseInt(numero/100) ;
      if (define==1) {
        color='red';
      }
      if (define==2) {
        color='blue';
      }
      if (define==3) {
        color='gray';
      }
      if (define==4) {
        color='yellow';
      }
      if (define==5) {
        color='green';
      }
      return {
        fillColor: color,
        strokeWeight: 3
      };
  });
}

var figureCoor = [], boro_area=[], geom=[], coordenadas = [];
function centerMarker(){

    $.getJSON(geoJSON , function(json) {
        console.log("CENTERMARKER",json);
        if(figureCoor.length>0||boro_area.length>0||geom.length>0||coordenadas.length>0){
          while(figureCoor.length>0){
            figureCoor.pop();
          }
          while(boro_area.length>0){
            boro_area.pop();
          }
          while(geom.length>0){
            geom.pop();
          }
          while(coordenadas.length>0){
            coordenadas.pop();
          }
        }
        for(var i = 0; i < json["features"].length; i++){
            figureCoor.push(json["features"][i]["geometry"]["coordinates"][0]);
            geom.push(json["features"][i]["geometry"]["coordinates"][0])
            var boro =json["features"][i]["properties"]["BoroCD"];
            var area = json["features"][i]["properties"]["Shape__Area"];
            var b_a = [boro,area];
            boro_area.push(b_a);
        }
        for (var i = 0; i < geom.length; i++) {
          for (var j = 0; j < geom[i].length; j++) {
            coordenadas.push(geom[i][j]);
          }
        }
        //console.log("CENTERMARKER",boro_area,figureCoor,geom);
    });

}
 //Carga de datos del Neighborhood Names GIS y
Housing_New_York_Units_by_Building
function getDataFromURL(URL){
        var data = $.get(URL, function(){
                console.log(URL)
        })
                .done( function(){
                        console.log(data.responseJSON.data);
                })
                .fail( function(error){
                        console.error(error);
                })
}

function updateAllDatasets(){
    for( var i = 0; i < DATA.length; i++){
        var URL = DATA[i];
                getDataFromURL(URL);
    }

}
//Carga de datos del Crimes_in_NY
const CRIMES_URL = "https://data.cityofnewyork.us/resource/9s4h-37hy.json";
const CRIMES_URL_DT ="https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2015-12-31T00:00:00.000";
//crimenes del 2015/DICIEMBRE/12
function arrayPolygon(){
  var poly = [], coor = [];
  var pathd = [];
  centerMarker();
  for (var i = 0; i < coordenadas.length; i++) {
      for (var j = 0; j < coordenadas[i].length; j++) {
        var latlng = new google.maps.LatLng(coordenadas[i][1],coordenadas[i][0]);
        pathd.push(latlng);
        var polyM = new google.maps.Data.Polygon({path:pathd});
      }
      poly.push(polyM);
  }
  console.log(pathd);
return poly;
}
var poligonos = [], coordinatesCrimes = [];
function getDataCrimes(){
    $.ajax({
        url: CRIMES_URL_DT,
        type: "GET",
        data: {
            "$limit":5000
        }
    }).done(function(data) {
        alert("Retrieved " + data.length + " records from the dataset!");

        if(bk_1.length>0|| bk_2.length>0|| bk_3.length>0||
bk_4.length>0|| bk_5.length>0|| bk_6.length>0|| bk_7.length>0||
bk_8.length>0|| bk_9.length>0|| bk_10.length>0|| bk_11.length>0||
bk_12.length>0||
          bk_13.length>0||bk_14.length>0|| bk_15.length>0||
bk_16.length>0|| bk_17.length>0|| bk_18.length>0||
         mn_1.length>0|| mn_2.length>0|| mn_3.length>0||
mn_4.length>0|| mn_5.length>0|| mn_6.length>0|| mn_7.length>0||
mn_8.length>0|| mn_9.length>0|| mn_10.length>0|| mn_11.length>0||
mn_12.length>0||
         bx_1.length>0|| bx_2.length>0|| bx_3.length>0||
bx_4.length>0|| bx_5.length>0|| bx_6.length>0|| bx_7.length>0||
bx_8.length>0|| bx_9.length>0|| bx_10.length>0|| bx_11.length>0||
bx_12.length>0||
         qn_1.length>0|| qn_2.length>0|| qn_3.length>0||
qn_4.length>0|| qn_5.length>0|| qn_6.length>0|| qn_7.length>0||
qn_8.length>0|| qn_9.length>0|| qn_10.length>0|| qn_11.length>0||
qn_12.length>0||
         qn_13.length>0|| qn_14.length>0||
         st_1.length>0|| st_2.length>0|| st_3.length>0){
           //bk----------empty---18
          while(bk_1.length>0){
            bk_1.pop();
          }
          while(bk_2.length>0){
            bk_2.pop();
          }
          while(bk_3.length>0){
            bk_3.pop();
          }
          while(bk_4.length>0){
            bk_4.pop();
          }
          while(bk_5.length>0){
            bk_5.pop();
          }
          while(bk_6.length>0){
            bk_6.pop();
          }
          while(bk_7.length>0){
            bk_7.pop();
          }
          while(bk_8.length>0){
            bk_8.pop();
          }
          while(bk_9.length>0){
            bk_9.pop();
          }
          while(bk_10.length>0){
            bk_10.pop();
          }
          while(bk_11.length>0){
            bk_11.pop();
          }
          while(bk_12.length>0){
            bk_12.pop();
          }
          while(bk_13.length>0){
            bk_13.pop();
          }
          while(bk_14.length>0){
            bk_14.pop();
          }
          while(bk_15.length>0){
            bk_15.pop();
          }
          while(bk_16.length>0){
            bk_16.pop();
          }
          while(bk_17.length>0){
            bk_17.pop();
          }
          while(bk_18.length>0){
            bk_18.pop();
          }
          // mn--------------empty----12
          while(mn_1.length>0){
            mn_1.pop();
          }
          while(mn_2.length>0){
            mn_2.pop();
          }
          while(mn_3.length>0){
            mn_3.pop();
          }
          while(mn_4.length>0){
            mn_4.pop();
          }
          while(mn_5.length>0){
            mn_5.pop();
          }
          while(mn_6.length>0){
            mn_6.pop();
          }
          while(mn_7.length>0){
            mn_7.pop();
          }
          while(mn_8.length>0){
            mn_8.pop();
          }
          while(mn_9.length>0){
            mn_9.pop();
          }
          while(mn_10.length>0){
            mn_10.pop();
          }
          while(mn_11.length>0){
            mn_11.pop();
          }
          while(mn_12.length>0){
            mn_12.pop();
          }
          // bx--------------empty----12
          while(bx_1.length>0){
            bx_1.pop();
          }
          while(bx_2.length>0){
            bx_2.pop();
          }
          while(bx_3.length>0){
            bx_3.pop();
          }
          while(bx_4.length>0){
            bx_4.pop();
          }
          while(bx_5.length>0){
            bx_5.pop();
          }
          while(bx_6.length>0){
            bx_6.pop();
          }
          while(bx_7.length>0){
            bx_7.pop();
          }
          while(bx_8.length>0){
            bx_8.pop();
          }
          while(bx_9.length>0){
            bx_9.pop();
          }
          while(bx_10.length>0){
            bx_10.pop();
          }
          while(bx_11.length>0){
            bx_11.pop();
          }
          while(bx_12.length>0){
            bx_12.pop();
          }
          // qn--------------empty----14
          while(qn_1.length>0){
            qn_1.pop();
          }
          while(qn_2.length>0){
            qn_2.pop();
          }
          while(qn_3.length>0){
            qn_3.pop();
          }
          while(qn_4.length>0){
            qn_4.pop();
          }
          while(qn_5.length>0){
            qn_5.pop();
          }
          while(qn_6.length>0){
            qn_6.pop();
          }
          while(qn_7.length>0){
            qn_7.pop();
          }
          while(qn_8.length>0){
            qn_8.pop();
          }
          while(qn_9.length>0){
            qn_9.pop();
          }
          while(qn_10.length>0){
            qn_10.pop();
          }
          while(qn_11.length>0){
            qn_11.pop();
          }
          while(qn_12.length>0){
            qn_12.pop();
          }
          while(qn_13.length>0){
            qn_13.pop();
          }
          while(qn_14.length>0){
            qn_14.pop();
          }
          // st--------------empty----3
          while(st_1.length>0){
            st_1.pop();
          }while(st_2.length>0){
            st_2.pop();
          }while(st_3.length>0){
            st_3.pop();
          }
        }
        if (coordinatesCrimes.length>0) {
          while(coordinatesCrimes.length>0){
            coordinatesCrimes.pop();
          }
        }
        for(var i = 0; i < data.length; i++){
          var lat = data[i]["latitude"];
          var lng = data[i]["longitude"] ;
          if(lat!=0||lng !=0){
            var lng_lat = new google.maps.LatLng(lat,lng);
            coordinatesCrimes.push(lng_lat);// all crimes of date 2015-12-31
          }
        }
        poligonos = arrayPolygon();
        var polyMenor = [], polyMayor = [];
        for (var j = 0; j < poligonos.length; j++) {
          //poligonos[i]
          for (var i = 0; i < coordinatesCrimes.length; i++) {
            //coordinatesCrimes[i]
            //google.maps.geometry.poly.containsLocation(newgoogle.maps.LatLng(latitude, longitude), Polygon)
// ARREGLAR ----------------- EL IF ------------------------
            if (google.maps.geometry.poly.containsLocation(coordinatesCrimes[i],poligono[j])== true) {

              polyMenor.push(coordinatesCrimes[i]);
            }
          }
          polyMayor.push(polyMenor);
        }
        for (var i = 0; i < polyMayor.length; i++) {
          //polyMayor[i]
          //--------------------MN-01----------------------
          if (boro_area[i][0]==101) {
            mn_1.push(polyMayor[i]);
          }
          if (boro_area[i][0]==102) {
            mn_2.push(polyMayor[i]);
          }
          if (boro_area[i][0]==103) {
            mn_3.push(polyMayor[i]);
          }
          if (boro_area[i][0]==104) {
            mn_4.push(polyMayor[i]);
          }
          if (boro_area[i][0]==105) {
            mn_5.push(polyMayor[i]);
          }
          if (boro_area[i][0]==106) {
            mn_6.push(polyMayor[i]);
          }
          if (boro_area[i][0]==107) {
            mn_7.push(polyMayor[i]);
          }
          if (boro_area[i][0]==108) {
            mn_8.push(polyMayor[i]);
          }
          if (boro_area[i][0]==109) {
            mn_9.push(polyMayor[i]);
          }
          if (boro_area[i][0]==110) {
            mn_10.push(polyMayor[i]);
          }
          if (boro_area[i][0]==111) {
            mn_11.push(polyMayor[i]);
          }
          if (boro_area[i][0]==112) {
            mn_12.push(polyMayor[i]);
          }
          //------------------BX---------------------------
          if (boro_area[i][0]==201) {
            bx_1.push(polyMayor[i]);
          }
          if (boro_area[i][0]==202) {
            bx_2.push(polyMayor[i]);
          }
          if (boro_area[i][0]==203) {
            bx_3.push(polyMayor[i]);
          }
          if (boro_area[i][0]==204) {
            bx_4.push(polyMayor[i]);
          }
          if (boro_area[i][0]==205) {
            bx_5.push(polyMayor[i]);
          }
          if (boro_area[i][0]==206) {
            bx_6.push(polyMayor[i]);
          }
          if (boro_area[i][0]==207) {
            bx_7.push(polyMayor[i]);
          }
          if (boro_area[i][0]==208) {
            bx_8.push(polyMayor[i]);
          }
          if (boro_area[i][0]==209) {
            bx_9.push(polyMayor[i]);
          }
          if (boro_area[i][0]==210) {
            bx_10.push(polyMayor[i]);
          }
          if (boro_area[i][0]==211) {
            bx_11.push(polyMayor[i]);
          }
          if (boro_area[i][0]==212) {
            bx_12.push(polyMayor[i]);
          }
          //---------------------------------------BK---------------------
          if (boro_area[i][0]==301) {
            bk_1.push(polyMayor[i]);
          }
          if (boro_area[i][0]==302) {
            bk_2.push(polyMayor[i]);
          }
          if (boro_area[i][0]==303) {
            bk_3.push(polyMayor[i]);
          }
          if (boro_area[i][0]==304) {
            bk_4.push(polyMayor[i]);
          }
          if (boro_area[i][0]==305) {
            bk_5.push(polyMayor[i]);
          }
          if (boro_area[i][0]==306) {
            bk_6.push(polyMayor[i]);
          }
          if (boro_area[i][0]==307) {
            bk_7.push(polyMayor[i]);
          }
          if (boro_area[i][0]==308) {
            bk_8.push(polyMayor[i]);
          }
          if (boro_area[i][0]==309) {
            bk_9.push(polyMayor[i]);
          }
          if (boro_area[i][0]==310) {
            bk_10.push(polyMayor[i]);
          }
          if (boro_area[i][0]==311) {
            bk_11.push(polyMayor[i]);
          }
          if (boro_area[i][0]==312) {
            bk_12.push(polyMayor[i]);
          }
          if (boro_area[i][0]==313) {
            bk_13.push(polyMayor[i]);
          }
          if (boro_area[i][0]==314) {
            bk_14.push(polyMayor[i]);
          }
          if (boro_area[i][0]==315) {
            bk_15.push(polyMayor[i]);
          }
          if (boro_area[i][0]==316) {
            bk_16.push(polyMayor[i]);
          }
          if (boro_area[i][0]==317) {
            bk_17.push(polyMayor[i]);
          }
          if (boro_area[i][0]==318) {
            bk_18.push(polyMayor[i]);
          }
          //-----------------------QN----------------------------------------
          if (boro_area[i][0]==401) {
            qn_1.push(polyMayor[i]);
          }
          if (boro_area[i][0]==402) {
            qn_2.push(polyMayor[i]);
          }
          if (boro_area[i][0]==403) {
            qn_3.push(polyMayor[i]);
          }
          if (boro_area[i][0]==404) {
            qn_4.push(polyMayor[i]);
          }
          if (boro_area[i][0]==405) {
            qn_5.push(polyMayor[i]);
          }
          if (boro_area[i][0]==406) {
            qn_6.push(polyMayor[i]);
          }
          if (boro_area[i][0]==407) {
            qn_7.push(polyMayor[i]);
          }
          if (boro_area[i][0]==408) {
            qn_8.push(polyMayor[i]);
          }
          if (boro_area[i][0]==409) {
            qn_9.push(polyMayor[i]);
          }
          if (boro_area[i][0]==410) {
            qn_10.push(polyMayor[i]);
          }
          if (boro_area[i][0]==411) {
            qn_11.push(polyMayor[i]);
          }
          if (boro_area[i][0]==412) {
            qn_12.push(polyMayor[i]);
          }
          if (boro_area[i][0]==413) {
            qn_13.push(polyMayor[i]);
          }
          if (boro_area[i][0]==414) {
            qn_14.push(polyMayor[i]);
          }
          //-----------------------------StI-----------------------------
          if (boro_area[i][0]==501) {
            st_1.push(polyMayor[i]);
          }
          if (boro_area[i][0]==502) {
            st_2.push(polyMayor[i]);
          }
          if (boro_area[i][0]==503) {
            st_3.push(polyMayor[i]);
          }
        }
        centerMarker()
        setTimeout("getCrimesGeo()",1500)

    });
}
var crimesGeo =[];
function getCrimesGeo() {

        if(crimesGeo.length>0){
          while(crimesGeo.length>0){
            crimesGeo.pop()
          }
        }
        for (var i = 0; i < boro_area.length; i++) {
          var dist = boro_area[i][0]-parseInt(boro_area[i][0]/100)*100;
          var boro = parseInt(boro_area[i][0]/100);
          var union= [boro,dist];
          crimesGeo.push(union)
        }
        finalTop = crimesTOP10(crimesGeo,boro_area,bk_1, bk_2, bk_3,
bk_4, bk_5, bk_6, bk_7, bk_8, bk_9, bk_10, bk_11, bk_12,
         bk_13,bk_14, bk_15, bk_16, bk_17, bk_18,
         mn_1, mn_2, mn_3, mn_4, mn_5, mn_6, mn_7, mn_8, mn_9, mn_10,
mn_11, mn_12,
         bx_1, bx_2, bx_3, bx_4, bx_5, bx_6, bx_7, bx_8, bx_9, bx_10,
bx_11, bx_12,
         qn_1, qn_2, qn_3, qn_4, qn_5, qn_6, qn_7, qn_8, qn_9, qn_10,
qn_11, qn_12,qn_13, qn_14,
         st_1, st_2, st_3)
         var title = "Top 10 Security";
         top10Table(finalTop,title);
         updateChart(finalTop);

}
function crimesTOP10(crimesGeo,boroArea,bk_1, bk_2, bk_3, bk_4, bk_5,
bk_6, bk_7, bk_8, bk_9, bk_10, bk_11, bk_12,
 bk_13,bk_14, bk_15, bk_16, bk_17, bk_18,
 mn_1, mn_2, mn_3, mn_4, mn_5, mn_6, mn_7, mn_8, mn_9, mn_10, mn_11, mn_12,
 bx_1, bx_2, bx_3, bx_4, bx_5, bx_6, bx_7, bx_8, bx_9, bx_10, bx_11, bx_12,
 qn_1, qn_2, qn_3, qn_4, qn_5, qn_6, qn_7, qn_8, qn_9, qn_10, qn_11,
qn_12,qn_13, qn_14,
 st_1, st_2, st_3){
   var rankeo=0,district;
   var distribucion = [];
   var top10=[];
   var sumaC=arrayBuilds(bk_1, bk_2, bk_3, bk_4, bk_5,
bk_6, bk_7, bk_8, bk_9, bk_10, bk_11, bk_12,
 bk_13,bk_14, bk_15, bk_16, bk_17, bk_18,
 mn_1, mn_2, mn_3, mn_4, mn_5, mn_6, mn_7, mn_8, mn_9, mn_10, mn_11, mn_12,
 bx_1, bx_2, bx_3, bx_4, bx_5, bx_6, bx_7, bx_8, bx_9, bx_10, bx_11, bx_12,
 qn_1, qn_2, qn_3, qn_4, qn_5, qn_6, qn_7, qn_8, qn_9, qn_10, qn_11,
qn_12,qn_13, qn_14,
 st_1, st_2, st_3)
   //console.log("CRIMESTOP10",sumaC,crimesGeo,boroArea)
   for (var i = 0; i < crimesGeo.length; i++) {
     //--------------MN
     if(crimesGeo[i][0]==1){
       for (var j = 0; j < 12; j++) {
         if (crimesGeo[i][1]==1+j) {
           rankeo=sumaC[30+j]/boroArea[i][1];
           district = "MANHATTAN-0"+(j+1);
           var union = [district,rankeo];
           distribucion.push(union)
         }
       }
     }
     //------------------bk---------------
     if (crimesGeo[i][0]==3) {
       for (var j = 0; j < 18; j++) {
         if (crimesGeo[i][1]==1+j) {
           rankeo=sumaC[0+j]/boroArea[i][1];
           district = "BROOKLYN-0"+(j+1);
           var union = [district,rankeo];
           distribucion.push(union)
         }
       }
     }
     //-------------BX
     if (crimesGeo[i][0]==2) {
       for (var j = 0; j < 12; j++) {
         if (crimesGeo[i][1]==1+j) {
           rankeo=sumaC[18+j]/boroArea[i][1];
           district = "THE_BRONX-0"+(j+1);
           var union = [district,rankeo];
           distribucion.push(union)
         }
       }
     }
     //------------QN ------------
     if (crimesGeo[i][0]==4) {
       for (var j = 0; j < 14; j++) {
         if (crimesGeo[i][1]==1+j) {
           rankeo=sumaC[42+j]/boroArea[i][1];
           district = "QUEENS-0"+(j+1);
           var union = [district,rankeo];
           distribucion.push(union)
         }
       }
     }
     //-------------StI----------
     if (crimesGeo[i][0]==5) {
       for (var j = 0; j < 3; j++) {
         if (crimesGeo[i][1]==1+j) {
           rankeo=sumaC[56+j]/boroArea[i][1];
           district = "STATEN_ISLAND-0"+(j+1);
           var union = [district,rankeo];
           distribucion.push(union)
         }
       }
     }
   }

   //console.log("crimesTOP10",distribucion);
   for (var i = 0; i < 10; i++) {
     top10[i] = rorderTop(distribucion)[i];
   }
   //console.log("crimesTOP10",top10);
   return top10;
}

//https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$where=counted_rental_units>
// Builds with rental posibility
const rentalBuilds ="https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$where=extremely_low_income_units> 0";
var lng_lat_B,latB,lngB,ex_low_units, info=[];
var bk_1=[], bk_2=[], bk_3=[], bk_4=[], bk_5=[], bk_6=[], bk_7=[],
bk_8=[], bk_9=[], bk_10=[], bk_11=[], bk_12=[], bk_13=[], bk_14=[],
bk_15=[], bk_16=[], bk_17=[], bk_18=[];
var mn_1=[], mn_2=[], mn_3=[], mn_4=[], mn_5=[], mn_6=[], mn_7=[],
mn_8=[], mn_9=[], mn_10=[], mn_11=[], mn_12=[];
var bx_1=[], bx_2=[], bx_3=[], bx_4=[], bx_5=[], bx_6=[], bx_7=[],
bx_8=[], bx_9=[], bx_10=[], bx_11=[], bx_12=[];
var qn_1=[], qn_2=[], qn_3=[], qn_4=[], qn_5=[], qn_6=[], qn_7=[],
qn_8=[], qn_9=[], qn_10=[], qn_11=[], qn_12=[], qn_13=[], qn_14=[];
var st_1=[], st_2=[], st_3=[];

function getDataBuildRental(){

       $.ajax({
            url: rentalBuilds,
            type: "GET",
            data: {
              "$limit" : 5000
            }

        }).done(function(data) {
          alert("Retrieved " + data.length + " records from the dataset!");
          //console.log("GETDATABUILDRENTAL",data);
            if(bk_1.length>0|| bk_2.length>0|| bk_3.length>0||
bk_4.length>0|| bk_5.length>0|| bk_6.length>0|| bk_7.length>0||
bk_8.length>0|| bk_9.length>0|| bk_10.length>0|| bk_11.length>0||
bk_12.length>0||
              bk_13.length>0||bk_14.length>0|| bk_15.length>0||
bk_16.length>0|| bk_17.length>0|| bk_18.length>0||
             mn_1.length>0|| mn_2.length>0|| mn_3.length>0||
mn_4.length>0|| mn_5.length>0|| mn_6.length>0|| mn_7.length>0||
mn_8.length>0|| mn_9.length>0|| mn_10.length>0|| mn_11.length>0||
mn_12.length>0||
             bx_1.length>0|| bx_2.length>0|| bx_3.length>0||
bx_4.length>0|| bx_5.length>0|| bx_6.length>0|| bx_7.length>0||
bx_8.length>0|| bx_9.length>0|| bx_10.length>0|| bx_11.length>0||
bx_12.length>0||
             qn_1.length>0|| qn_2.length>0|| qn_3.length>0||
qn_4.length>0|| qn_5.length>0|| qn_6.length>0|| qn_7.length>0||
qn_8.length>0|| qn_9.length>0|| qn_10.length>0|| qn_11.length>0||
qn_12.length>0||
             qn_13.length>0|| qn_14.length>0||
             st_1.length>0|| st_2.length>0|| st_3.length>0){
               //bk----------empty---18
              while(bk_1.length>0){
                bk_1.pop();
              }
              while(bk_2.length>0){
                bk_2.pop();
              }
              while(bk_3.length>0){
                bk_3.pop();
              }
              while(bk_4.length>0){
                bk_4.pop();
              }
              while(bk_5.length>0){
                bk_5.pop();
              }
              while(bk_6.length>0){
                bk_6.pop();
              }
              while(bk_7.length>0){
                bk_7.pop();
              }
              while(bk_8.length>0){
                bk_8.pop();
              }
              while(bk_9.length>0){
                bk_9.pop();
              }
              while(bk_10.length>0){
                bk_10.pop();
              }
              while(bk_11.length>0){
                bk_11.pop();
              }
              while(bk_12.length>0){
                bk_12.pop();
              }
              while(bk_13.length>0){
                bk_13.pop();
              }
              while(bk_14.length>0){
                bk_14.pop();
              }
              while(bk_15.length>0){
                bk_15.pop();
              }
              while(bk_16.length>0){
                bk_16.pop();
              }
              while(bk_17.length>0){
                bk_17.pop();
              }
              while(bk_18.length>0){
                bk_18.pop();
              }
              // mn--------------empty----12
              while(mn_1.length>0){
                mn_1.pop();
              }
              while(mn_2.length>0){
                mn_2.pop();
              }
              while(mn_3.length>0){
                mn_3.pop();
              }
              while(mn_4.length>0){
                mn_4.pop();
              }
              while(mn_5.length>0){
                mn_5.pop();
              }
              while(mn_6.length>0){
                mn_6.pop();
              }
              while(mn_7.length>0){
                mn_7.pop();
              }
              while(mn_8.length>0){
                mn_8.pop();
              }
              while(mn_9.length>0){
                mn_9.pop();
              }
              while(mn_10.length>0){
                mn_10.pop();
              }
              while(mn_11.length>0){
                mn_11.pop();
              }
              while(mn_12.length>0){
                mn_12.pop();
              }
              // bx--------------empty----12
              while(bx_1.length>0){
                bx_1.pop();
              }
              while(bx_2.length>0){
                bx_2.pop();
              }
              while(bx_3.length>0){
                bx_3.pop();
              }
              while(bx_4.length>0){
                bx_4.pop();
              }
              while(bx_5.length>0){
                bx_5.pop();
              }
              while(bx_6.length>0){
                bx_6.pop();
              }
              while(bx_7.length>0){
                bx_7.pop();
              }
              while(bx_8.length>0){
                bx_8.pop();
              }
              while(bx_9.length>0){
                bx_9.pop();
              }
              while(bx_10.length>0){
                bx_10.pop();
              }
              while(bx_11.length>0){
                bx_11.pop();
              }
              while(bx_12.length>0){
                bx_12.pop();
              }
              // qn--------------empty----14
              while(qn_1.length>0){
                qn_1.pop();
              }
              while(qn_2.length>0){
                qn_2.pop();
              }
              while(qn_3.length>0){
                qn_3.pop();
              }
              while(qn_4.length>0){
                qn_4.pop();
              }
              while(qn_5.length>0){
                qn_5.pop();
              }
              while(qn_6.length>0){
                qn_6.pop();
              }
              while(qn_7.length>0){
                qn_7.pop();
              }
              while(qn_8.length>0){
                qn_8.pop();
              }
              while(qn_9.length>0){
                qn_9.pop();
              }
              while(qn_10.length>0){
                qn_10.pop();
              }
              while(qn_11.length>0){
                qn_11.pop();
              }
              while(qn_12.length>0){
                qn_12.pop();
              }
              while(qn_13.length>0){
                qn_13.pop();
              }
              while(qn_14.length>0){
                qn_14.pop();
              }
              // st--------------empty----3
              while(st_1.length>0){
                st_1.pop();
              }while(st_2.length>0){
                st_2.pop();
              }while(st_3.length>0){
                st_3.pop();
              }
            }


            for(var i = 0; i < data.length; i++){
              if (data[i]["building_completion_date"]!=null) {
                //--------------------------BROOKLYN Districtsdata---------------
                if(data[i]["community_board"]=="BK-01"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_1.push(info);
                }

                if(data[i]["community_board"]=="BK-02"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_2.push(info);
                }
                if(data[i]["community_board"]=="BK-03"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_3.push(info);
                }

                if(data[i]["community_board"]=="BK-04"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_4.push(info);
                }

                if(data[i]["community_board"]=="BK-05"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_5.push(info);
                }
                if(data[i]["community_board"]=="BK-06"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_6.push(info);
                }
                if(data[i]["community_board"]=="BK-07"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_7.push(info);
                }
                if(data[i]["community_board"]=="BK-08"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_8.push(info);
                }
                if(data[i]["community_board"]=="BK-09"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_9.push(info);
                }
                if(data[i]["community_board"]=="BK-10"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_10.push(info);
                }
                if(data[i]["community_board"]=="BK-11"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_11.push(info);
                }
                if(data[i]["community_board"]=="BK-12"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_12.push(info);
                }
                if(data[i]["community_board"]=="BK-13"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_13.push(info);
                }
                if(data[i]["community_board"]=="BK-14"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_14.push(info);
                }
                if(data[i]["community_board"]=="BK-15"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_15.push(info);
                }
                if(data[i]["community_board"]=="BK-16"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_16.push(info);
                }
                if(data[i]["community_board"]=="BK-17"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_17.push(info);
                }
                if(data[i]["community_board"]=="BK-18"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bk_18.push(info);
                }
                //------------------------------MANHATTAN data-------------------------------------------
                if(data[i]["community_board"]=="MN-01"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_1.push(info);
                }
                if(data[i]["community_board"]=="MN-02"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_2.push(info);
                }
                if(data[i]["community_board"]=="MN-03"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_3.push(info);
                }
                if(data[i]["community_board"]=="MN-04"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_4.push(info);
                }
                if(data[i]["community_board"]=="MN-05"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_5.push(info);
                }
                if(data[i]["community_board"]=="MN-06"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_6.push(info);
                }
                if(data[i]["community_board"]=="MN-07"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_7.push(info);
                }
                if(data[i]["community_board"]=="MN-08"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_8.push(info);
                }
                if(data[i]["community_board"]=="MN-09"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_9.push(info);
                }
                if(data[i]["community_board"]=="MN-10"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_10.push(info);
                }
                if(data[i]["community_board"]=="MN-11"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_11.push(info);
                }
                if(data[i]["community_board"]=="MN-12"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    mn_12.push(info);
                }
                //--------------------STATEN ISLAND data-------------------------------------------
                if(data[i]["community_board"]=="ST-01"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    st_1.push(info);
                }
                if(data[i]["community_board"]=="ST-02"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    st_2.push(info);
                }
                if(data[i]["community_board"]=="ST-03"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    st_3.push(info);
                }
                //--------------------QUEENS data-------------------------------------------
                if(data[i]["community_board"]=="QN-01"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_1.push(info);
                }
                if(data[i]["community_board"]=="QN-02"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_2.push(info);
                }
                if(data[i]["community_board"]=="QN-03"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_3.push(info);
                }
                if(data[i]["community_board"]=="QN-04"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_4.push(info);
                }
                if(data[i]["community_board"]=="QN-05"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_5.push(info);
                }
                if(data[i]["community_board"]=="QN-06"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_6.push(info);
                }
                if(data[i]["community_board"]=="QN-07"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_7.push(info);
                }
                if(data[i]["community_board"]=="QN-08"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_8.push(info);
                }
                if(data[i]["community_board"]=="QN-09"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_9.push(info);
                }
                if(data[i]["community_board"]=="QN-10"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_10.push(info);
                }
                if(data[i]["community_board"]=="QN-11"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_11.push(info);
                }
                if(data[i]["community_board"]=="QN-12"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_12.push(info);
                }
                if(data[i]["community_board"]=="QN-13"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_13.push(info);
                }
                if(data[i]["community_board"]=="QN-14"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    qn_14.push(info);
                }
                //--------------------BRONX data-------------------------------------------
                if(data[i]["community_board"]=="BX-01"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_1.push(info);
                }
                if(data[i]["community_board"]=="BX-02"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_2.push(info);
                }
                if(data[i]["community_board"]=="BX-03"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_3.push(info);
                }
                if(data[i]["community_board"]=="BX-04"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_4.push(info);
                }
                if(data[i]["community_board"]=="BX-05"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_5.push(info);
                }
                if(data[i]["community_board"]=="BX-06"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_6.push(info);
                }
                if(data[i]["community_board"]=="BX-07"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_7.push(info);
                }
                if(data[i]["community_board"]=="BX-08"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_8.push(info);
                }
                if(data[i]["community_board"]=="BX-09"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_9.push(info);
                }
                if(data[i]["community_board"]=="BX-10"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_10.push(info);
                }
                if(data[i]["community_board"]=="BX-11"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_11.push(info);
                }
                if(data[i]["community_board"]=="BX-12"){
                    latB = data[i]["latitude"];
                    lngB = data[i]["longitude"] ;
                    lng_lat_B = new google.maps.LatLng(latB,lngB);
                    ex_low_units=data[i]["extremely_low_income_units"];
                    info = [lng_lat_B,ex_low_units];
                    bx_12.push(info);
                }
                //---------------------------
              }
            }
            centerMarker()
            setTimeout("getDistrictGeo()",1500)


        })

        .fail(function(error){
              console.log(error);
              });
}
function top10Table(top10,title){
        tableReference = $("#mainTableBody")[0];
        var newRow, districtName, boroughs,num ;
  var tableHeaderRowCount = 2;
  var table = document.getElementById('top10Table');
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }

  titleTable.innerHTML = title;
        for( var i = 0; i < top10.length; i++){
                newRow = tableReference.insertRow(tableReference.rows.length);
                num = newRow.insertCell(0);
                districtName = newRow.insertCell(1);
                boroughs  = newRow.insertCell(2);

                num.innerHTML = i+1;
                districtName.innerHTML = top10[i][0].split("-")[0];
                boroughs.innerHTML = top10[i][0].split("-")[1];
        }

}
var finalTop=[];
function arrayBuilds(bk1,bk2,bk3,bk4,bk5,bk6,bk7,bk8,bk9,bk10,bk11,bk12,bk13,bk14,bk15,bk16,bk17,bk18,
bx1,bx2,bx3,bx4,bx5,bx6,bx7,bx8,bx9,bx10,bx11,bx12,
mn1,mn2,mn3,mn4,mn5,mn6,mn7,mn8,mn9,mn10,mn11,mn12,
qn1,qn2,qn3,qn4,qn5,qn6,qn7,qn8,qn9,qn10,qn11,qn12,qn13,qn14,
st1,st2,st3){
    var arraySum = [];
    //--------------- bk values----------
    arraySum.push(sumaValues(bk1));
    arraySum.push(sumaValues(bk2));
    arraySum.push(sumaValues(bk3));
    arraySum.push(sumaValues(bk4));
    arraySum.push(sumaValues(bk5));
    arraySum.push(sumaValues(bk6));
    arraySum.push(sumaValues(bk7));
    arraySum.push(sumaValues(bk8));
    arraySum.push(sumaValues(bk9));
    arraySum.push(sumaValues(bk10));
    arraySum.push(sumaValues(bk11));
    arraySum.push(sumaValues(bk12));
    arraySum.push(sumaValues(bk13));
    arraySum.push(sumaValues(bk14));
    arraySum.push(sumaValues(bk15));
    arraySum.push(sumaValues(bk16));
    arraySum.push(sumaValues(bk17));
    arraySum.push(sumaValues(bk18));

    //-------------bx values------
    arraySum.push(sumaValues(bx1));
    arraySum.push(sumaValues(bx2));
    arraySum.push(sumaValues(bx3));
    arraySum.push(sumaValues(bx4));
    arraySum.push(sumaValues(bx5));
    arraySum.push(sumaValues(bx6));
    arraySum.push(sumaValues(bx7));
    arraySum.push(sumaValues(bx8));
    arraySum.push(sumaValues(bx9));
    arraySum.push(sumaValues(bx10));
    arraySum.push(sumaValues(bx11));
    arraySum.push(sumaValues(bx12));

    //-------------mn values------
    arraySum.push(sumaValues(mn1));
    arraySum.push(sumaValues(mn2));
    arraySum.push(sumaValues(mn3));
    arraySum.push(sumaValues(mn4));
    arraySum.push(sumaValues(mn5));
    arraySum.push(sumaValues(mn6));
    arraySum.push(sumaValues(mn7));
    arraySum.push(sumaValues(mn8));
    arraySum.push(sumaValues(mn9));
    arraySum.push(sumaValues(mn10));
    arraySum.push(sumaValues(mn11));
    arraySum.push(sumaValues(mn12));

    //-------------qn values------
    arraySum.push(sumaValues(qn1));
    arraySum.push(sumaValues(qn2));
    arraySum.push(sumaValues(qn3));
    arraySum.push(sumaValues(qn4));
    arraySum.push(sumaValues(qn5));
    arraySum.push(sumaValues(qn6));
    arraySum.push(sumaValues(qn7));
    arraySum.push(sumaValues(qn8));
    arraySum.push(sumaValues(qn9));
    arraySum.push(sumaValues(qn10));
    arraySum.push(sumaValues(qn11));
    arraySum.push(sumaValues(qn12));
    arraySum.push(sumaValues(qn13));
    arraySum.push(sumaValues(qn14));

    //-------------st values------
    arraySum.push(sumaValues(st1));
    arraySum.push(sumaValues(st2));
    arraySum.push(sumaValues(st3));
    return arraySum;
}

function sumaValues(a){
      var suma=0;
      for (var i = 0; i < a.length; i++) {
        suma = suma + parseInt(a[i][1]);
      }
      return suma;
}

var districtGeo =[];
function getDistrictGeo(){
      if(districtGeo.length>0){
        while(districtGeo.length>0){
          districtGeo.pop()
        }
      }
      for (var i = 0; i < boro_area.length; i++) {
        var dist = boro_area[i][0]-parseInt(boro_area[i][0]/100)*100;
        var boro = parseInt(boro_area[i][0]/100);
        var union= [boro,dist];
        districtGeo.push(union)
      }
      finalTop = buildsTOP10(districtGeo,boro_area,bk_1, bk_2, bk_3,
bk_4, bk_5, bk_6, bk_7, bk_8, bk_9, bk_10, bk_11, bk_12,
       bk_13,bk_14, bk_15, bk_16, bk_17, bk_18,
       mn_1, mn_2, mn_3, mn_4, mn_5, mn_6, mn_7, mn_8, mn_9, mn_10,
mn_11, mn_12,
       bx_1, bx_2, bx_3, bx_4, bx_5, bx_6, bx_7, bx_8, bx_9, bx_10,
bx_11, bx_12,
       qn_1, qn_2, qn_3, qn_4, qn_5, qn_6, qn_7, qn_8, qn_9, qn_10,
qn_11, qn_12,qn_13, qn_14,
       st_1, st_2, st_3)
       var title = "Top 10 Affordability";
       top10Table(finalTop,title);
}


function buildsTOP10(districtGeo,boroArea,
          bk1,bk2,bk3,bk4,bk5,bk6,bk7,bk8,bk9,bk10,bk11,bk12,bk13,bk14,bk15,bk16,bk17,bk18,
          bx1,bx2,bx3,bx4,bx5,bx6,bx7,bx8,bx9,bx10,bx11,bx12,
          mn1,mn2,mn3,mn4,mn5,mn6,mn7,mn8,mn9,mn10,mn11,mn12,
          qn1,qn2,qn3,qn4,qn5,qn6,qn7,qn8,qn9,qn10,qn11,qn12,qn13,qn14,
          st1,st2,st3){
            var rankeo=0,district;
            var distribucion = [];
            var top10=[];
            var sumaB=arrayBuilds(bk1,bk2,bk3,bk4,bk5,bk6,bk7,bk8,bk9,bk10,bk11,bk12,bk13,bk14,
              bk15,bk16,bk17,bk18,
            bx1,bx2,bx3,bx4,bx5,bx6,bx7,bx8,bx9,bx10,bx11,bx12,
            mn1,mn2,mn3,mn4,mn5,mn6,mn7,mn8,mn9,mn10,mn11,mn12,
            qn1,qn2,qn3,qn4,qn5,qn6,qn7,qn8,qn9,qn10,qn11,qn12,qn13,qn14,
            st1,st2,st3)
            //console.log("BUILDSTOP10",sumaB,districtGeo,boroArea)
            for (var i = 0; i < districtGeo.length; i++) {
              //--------------MN
              if(districtGeo[i][0]==1){
                for (var j = 0; j < 12; j++) {
                  if (districtGeo[i][1]==1+j) {
                    rankeo=sumaB[30+j]/boroArea[i][1];
                    district = "MANHATTAN-0"+(j+1);
                    var union = [district,rankeo];
                    distribucion.push(union)
                  }
                }
              }
              //------------------bk---------------
              if (districtGeo[i][0]==3) {
                for (var j = 0; j < 18; j++) {
                  if (districtGeo[i][1]==1+j) {
                    rankeo=sumaB[0+j]/boroArea[i][1];
                    district = "BROOKLYN-0"+(j+1);
                    var union = [district,rankeo];
                    distribucion.push(union)
                  }
                }
              }
              //-------------BX
              if (districtGeo[i][0]==2) {
                for (var j = 0; j < 12; j++) {
                  if (districtGeo[i][1]==1+j) {
                    rankeo=sumaB[18+j]/boroArea[i][1];
                    district = "THE_BRONX-0"+(j+1);
                    var union = [district,rankeo];
                    distribucion.push(union)
                  }
                }
              }
              //------------QN ------------
              if (districtGeo[i][0]==4) {
                for (var j = 0; j < 14; j++) {
                  if (districtGeo[i][1]==1+j) {
                    rankeo=sumaB[42+j]/boroArea[i][1];
                    district = "QUEENS-0"+(j+1);
                    var union = [district,rankeo];
                    distribucion.push(union)
                  }
                }
              }
              //-------------StI----------
              if (districtGeo[i][0]==5) {
                for (var j = 0; j < 3; j++) {
                  if (districtGeo[i][1]==1+j) {
                    rankeo=sumaB[56+j]/boroArea[i][1];
                    district = "STATEN_ISLAND-0"+(j+1);
                    var union = [district,rankeo];
                    distribucion.push(union)
                  }
                }
              }
            }

            //console.log("buildsTOP10",distribucion);
            for (var i = 0; i < 10; i++) {
              top10[i] = orderTop(distribucion)[i];
            }
            //console.log("buildsTOP10",top10);
            updateChart(top10);
            return top10;
}

function orderTop(distribucion){
  var data=[],orden=[];
  for (var i = 0; i < distribucion.length; i++) {
    data[i] = distribucion[i][1];
  }
  data.sort(function(a, b){return b-a});
  for (var h = 0; h <data.length; h++) {
     for(var j=0; j<distribucion.length; j++){
       if(data[h]==distribucion[j][1]){
         orden.push(distribucion[j]);
       }
     }
  }
  return orden;
}
function rorderTop(distribucion){
  var data=[],rorden=[];
  for (var i = 0; i < distribucion.length; i++) {
    data[i] = distribucion[i][1];
  }
  data.sort(function(a, b){return a-b});
  for (var h = 0; h <data.length; h++) {
     for(var j=0; j<distribucion.length; j++){
       if(data[h]==distribucion[j][1]){
         rorden.push(distribucion[j]);
       }
     }
  }
  return rorden;
}

//--https://programacion.net/articulo/como_exportar_una_tabla_html_a_csv_mediante_javascript_1742(Download csv files)
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join(","), filename);
}
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}
//---------------------------------------------------------D3-----------------------------------------------
function updateChart(top10) {

  var w =1200 ,h= 400;
    var svg = d3.select("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    var area=[];
      for (var i = 0; i < top10.length; i++) {
        area.push(top10[i][1])
      }

			svg.selectAll("rect")
			   .data(area)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / area.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d);
			   })
			   .attr("width", w / area.length - 1)
			   .attr("height", function(d) {
			   		return d;
			   })
			   .attr("fill", "teal");
}



//----------------------------------------------------
//uso de los buttons
/*id="getDataButton" = Get data
  id="updateTableButton" = Update table
  id="updateMarksDist" =  Update Marks
  id="deleteMarsDist" =  Delete Marks
  id="updateMarksBuild" = Update BMarks
  id="deleteMarsBuild" = Delete BMarks
  id="downloadCSV" = Download CSV
  PRUEBA
                <button id="updateMarksBuildRental"> Update BRMarks </button>
                <button id="deleteMarsBuildRenatl"> Delete BRMarks </button>
                .on("click", getDataCrimes)
*/
$(document).ready( function(){
        $("#getDataButton").on("click", updateAllDatasets);
        $("#updateMarksBuildRental").on("click", getDataBuildRental);
//.on("click", centerMarker)
        $("#updateMarksCRIME").on("click", getDataCrimes);
})
