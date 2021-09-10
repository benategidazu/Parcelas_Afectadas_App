///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference", "dojo/_base/lang", "esri/graphic", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol","esri/Color", "esri/layers/FeatureLayer"],
  function(declare, BaseWidget, Query,  QueryTask, SpatialReference, lang, Graphic, SimpleFillSymbol, SimpleLineSymbol, Color, FeatureLayer) {

    var geometria_escenario_RCP45_2050;
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
        alert("Esta aplicación nunca debe usarse en temas de seguridad humana puesto que los resultados carecen de exactitud.")
      },

      startup: function() {
      
      },

      onOpen: function(){
        
      },

      onClose: function(){
        this.map.graphics.clear();
      },

      EjecutarConsulta: function EjecutarConsulta (){

        this.map.graphics.clear();
        
        if(this.escenarioSelect.value == 0){

          // var intersect_RCP45_2050 = new FeatureLayer("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Intersect_45_2050/FeatureServer/0")
          // this.map.addLayer(intersect_RCP45_2050);
          // console.log(this.map)

          var query_intersect = new Query();
          query_intersect.returnGeometry = true;
          query_intersect.outFields = ["*"];
          query_intersect.where = "1=1";
          query_intersect.outSpatialReference = new SpatialReference(102100);
          var queryTask_intersect = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Intersect_45_2050/FeatureServer/0");
          queryTask_intersect.execute(query_intersect, lang.hitch(this, function(resultados) {
            console.log(resultados)

            document.getElementById('numeroParcelas').innerHTML= resultados.features.length;
              var area = 0;

              for (i = 0; i < resultados.features.length; i++){
                   
                  var geometria_parcelas_seleccionadas = resultados.features[i].geometry;

                  this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([3, 98, 40]), 1), new Color([3, 98, 40, 0.75]))));

                  area += resultados.features[i].attributes.Shape__Area;
                  
              }
              document.getElementById('areaParcelas').innerHTML = area; 
          }))

          // console.log("Escenario RCP4.5 a 2050")

          // var query_escenario = new Query();
          // query_escenario.returnGeometry = true;
          // query_escenario.outFields = ["*"];
          // query_escenario.where = "1=1";
          // query_escenario.outSpatialReference = new SpatialReference(102100)

          // var queryTaskEscenarios = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Pot_dist_RCP45_2050_merged/FeatureServer/0");

          // queryTaskEscenarios.execute(query_escenario, lang.hitch(this, function(resultados){
          //   console.log(resultados)
          //   geometria_escenario_RCP45_2050 = resultados.features[0].geometry;

          //   this.map.graphics.add(new Graphic(geometria_escenario_RCP45_2050, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 158, 161 ]), 0.5), new Color([29, 249, 254, 0.25]))))

            // var query_parcelas = new Query();
            // query_parcelas.returnGeometry = true;
            // query_parcelas.geometry = geometria_escenario_RCP45_2050;
            // query_parcelas.outFields = ["*"];
            // query_parcelas.where = "1=1";
            // query_parcelas.outSpatialReference = new SpatialReference (102100);
            // query_parcelas.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

            // console.log(query_parcelas)
            // var capaParcelasQuery = new FeatureLayer("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Urdaibai_Parcelas/FeatureServer/0");

            // capaParcelasQuery.queryFeatures(query_parcelas, lang.hitch(this, function(evento){
            //   console.log(evento)
            //   if (evento.features.length > 0){
            //     console.log(evento)
            //     document.getElementById('numeroParcelas').innerHTML= evento.features.length;
            //     var area = 0;

            //     for (i = 0; i < evento.features.length; i++){
                   
            //        var geometria_parcelas_seleccionadas = evento.features[i].geometry;

            //        this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([58, 254, 29]), 1.5), new Color([58, 254, 29, 0.75]))));

            //        area += evento.features[i].attributes.AREA;
                   
            //     }
            //     document.getElementById('areaParcelas').innerHTML = area;
            //   }
            // }))
          // }))
        } else if (this.escenarioSelect.value == 1){

          var query_intersect = new Query();
          query_intersect.returnGeometry = true;
          query_intersect.outFields = ["*"];
          query_intersect.where = "1=1";
          query_intersect.outSpatialReference = new SpatialReference(102100);
          var queryTask_intersect = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Intersect_45_2100/FeatureServer/0");
          queryTask_intersect.execute(query_intersect, lang.hitch(this, function(resultados) {
            console.log(resultados)

            document.getElementById('numeroParcelas').innerHTML= resultados.features.length;
              // var area = 0;

              for (i = 0; i < resultados.features.length; i++){
                   
                  var geometria_parcelas_seleccionadas = resultados.features[i].geometry;

                  this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([245, 203, 33]), 1), new Color([245, 203, 33, 0.75]))));

                  // area += resultados.features[i].attributes.Shape__Area;
                  
              }
              // document.getElementById('areaParcelas').innerHTML = area; 
          }))

          // console.log("Escenario RCP4.5 a 2100")

          // var query_escenario = new Query();
          // query_escenario.returnGeometry = true;
          // query_escenario.outFields = ["*"];
          // query_escenario.where = "1=1";
          // query_escenario.outSpatialReference = new SpatialReference(102100)

          // var queryTaskEscenarios = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Pot_dist_RCP45_2100_merged/FeatureServer/0");

          // queryTaskEscenarios.execute(query_escenario, lang.hitch(this, function(resultados){

          //   geometria_escenario_RCP45_2050 = resultados.features[0].geometry;

          //   this.map.graphics.add(new Graphic(geometria_escenario_RCP45_2050, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 122, 140]), 0.5), new Color([38, 206, 231, 0.25]))))

          //   var query_parcelas = new Query();
          //   query_parcelas.returnGeometry = true;
          //   query_parcelas.geometry = geometria_escenario_RCP45_2050;
          //   query_parcelas.outFields = ["*"];
          //   query_parcelas.where = "1=1";
          //   query_parcelas.outSpatialReference = new SpatialReference (102100);
          //   query_parcelas.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

          //   var capaParcelasQuery = new FeatureLayer("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Urdaibai_Parcelas/FeatureServer/0");

          //   capaParcelasQuery.queryFeatures(query_parcelas, lang.hitch(this, function(evento){

          //     if (evento.features.length > 0){

          //       document.getElementById('numeroParcelas').innerHTML= evento.features.length;

          //       var area = 0;

          //       for (i = 0; i < evento.features.length; i++){

          //          var geometria_parcelas_seleccionadas = evento.features[i].geometry;

          //          this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([245, 203, 33]), 1.5), new Color([245, 203, 33, 0.75]))));

          //          area += evento.features[i].attributes.AREA;
          //       }

          //       document.getElementById('areaParcelas').innerHTML = area;

          //     }
          //   }))
          // }))

        } else if (this.escenarioSelect.value == 2){

          var query_intersect = new Query();
          query_intersect.returnGeometry = true;
          query_intersect.outFields = ["*"];
          query_intersect.where = "1=1";
          query_intersect.outSpatialReference = new SpatialReference(102100);
          var queryTask_intersect = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Intersect_85_2050/FeatureServer/0");
          queryTask_intersect.execute(query_intersect, lang.hitch(this, function(resultados) {
            console.log(resultados)

            document.getElementById('numeroParcelas').innerHTML= resultados.features.length;
              // var area = 0;

              for (i = 0; i < resultados.features.length; i++){
                   
                  var geometria_parcelas_seleccionadas = resultados.features[i].geometry;

                  this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([236, 251, 83]), 1), new Color([236, 251, 83, 0.75]))));

                  // area += resultados.features[i].attributes.Shape__Area;
                  
              }
              // document.getElementById('areaParcelas').innerHTML = area; 
          }))

          // console.log("Escenario RCP8.5 a 2050")

          // var query_escenario = new Query();
          // query_escenario.returnGeometry = true;
          // query_escenario.outFields = ["*"];
          // query_escenario.where = "1=1";
          // query_escenario.outSpatialReference = new SpatialReference(102100)

          // var queryTaskEscenarios = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Pot_dist_RCP85_2050_merged/FeatureServer/0");

          // queryTaskEscenarios.execute(query_escenario, lang.hitch(this, function(resultados){

          //   geometria_escenario_RCP45_2050 = resultados.features[0].geometry;

          //   this.map.graphics.add(new Graphic(geometria_escenario_RCP45_2050, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 77, 162]), 0.5), new Color([0, 115, 240, 0.25]))))

          //   var query_parcelas = new Query();
          //   query_parcelas.returnGeometry = true;
          //   query_parcelas.geometry = geometria_escenario_RCP45_2050;
          //   query_parcelas.outFields = ["*"];
          //   query_parcelas.where = "1=1";
          //   query_parcelas.outSpatialReference = new SpatialReference (102100);
          //   query_parcelas.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

          //   var capaParcelasQuery = new FeatureLayer("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Urdaibai_Parcelas/FeatureServer/0");

          //   capaParcelasQuery.queryFeatures(query_parcelas, lang.hitch(this, function(evento){

          //     if (evento.features.length > 0){

          //       document.getElementById('numeroParcelas').innerHTML= evento.features.length;

          //       // var area = 0;

          //       for (i = 0; i < evento.features.length; i++){

          //          var geometria_parcelas_seleccionadas = evento.features[i].geometry;

          //          this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([236, 251, 83]), 1.5), new Color([236, 251, 83, 0.75]))));

          //          area += evento.features[i].attributes.AREA;
          //       }

          //       // document.getElementById('areaParcelas').innerHTML = area;

          //     }
          //   }))
          // }))


        } else if (this.escenarioSelect.value == 3){

          var query_intersect = new Query();
          query_intersect.returnGeometry = true;
          query_intersect.outFields = ["*"];
          query_intersect.where = "1=1";
          query_intersect.outSpatialReference = new SpatialReference(102100);
          var queryTask_intersect = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Intersect_85_2100/FeatureServer/0");
          queryTask_intersect.execute(query_intersect, lang.hitch(this, function(resultados) {
            console.log(resultados)

            document.getElementById('numeroParcelas').innerHTML= resultados.features.length;
              // var area = 0;

              for (i = 0; i < resultados.features.length; i++){
                   
                  var geometria_parcelas_seleccionadas = resultados.features[i].geometry;

                  this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([254, 29, 29]), 1), new Color([254, 29, 29, 0.75]))));

                  // area += resultados.features[i].attributes.Shape__Area;
                  
              }
              // document.getElementById('areaParcelas').innerHTML = area; 
          }))

      //     console.log("Escenario RCP8.5 a 2100")

      //     var query_escenario = new Query();
      //     query_escenario.returnGeometry = true;
      //     query_escenario.outFields = ["*"];
      //     query_escenario.where = "1=1";
      //     query_escenario.outSpatialReference = new SpatialReference(102100)

      //     var queryTaskEscenarios = new QueryTask("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Pot_dist_RCP85_2100_merged/FeatureServer/0");

      //     queryTaskEscenarios.execute(query_escenario, lang.hitch(this, function(resultados){

      //       geometria_escenario_RCP45_2050 = resultados.features[0].geometry;

      //       this.map.graphics.add(new Graphic(geometria_escenario_RCP45_2050, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0]), 0.5), new Color([0, 3, 112, 0.25]))))

      //       var query_parcelas = new Query();
      //       query_parcelas.returnGeometry = true;
      //       query_parcelas.geometry = geometria_escenario_RCP45_2050;
      //       query_parcelas.outFields = ["*"];
      //       query_parcelas.where = "1=1";
      //       query_parcelas.outSpatialReference = new SpatialReference (102100);
      //       query_parcelas.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

      //       var capaParcelasQuery = new FeatureLayer("https://services6.arcgis.com/I5TcbPkHyHc6ppBW/ArcGIS/rest/services/Urdaibai_Parcelas/FeatureServer/0");

      //       capaParcelasQuery.queryFeatures(query_parcelas, lang.hitch(this, function(evento){

      //         if (evento.features.length > 0){

      //           document.getElementById('numeroParcelas').innerHTML= evento.features.length;

      //           var area = 0;

      //           for (i = 0; i < evento.features.length; i++){

      //              var geometria_parcelas_seleccionadas = evento.features[i].geometry;

      //              this.map.graphics.add(new Graphic(geometria_parcelas_seleccionadas, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([254, 29, 29]), 1.5), new Color([254, 29, 29, 0.75]))));
                  
      //              area += evento.features[i].attributes.AREA;
      //           }

      //           document.getElementById('areaParcelas').innerHTML = area;

      //         }
      //       }))
      //     }))


        } else {
          alert("El escenario seleccionado no es válido")
        }

        

      }

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });
