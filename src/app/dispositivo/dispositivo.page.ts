import { interval} from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { TimestampService } from '../services/timestamp.service';
import { Dispositivo } from '../model/Dispositivo';
import { DisConfig } from '../model/DisConfig';
import { Log } from '../model/Log';
import { data } from '../model/data';
import { ActivatedRoute } from '@angular/router';

import * as Highcharts from 'highcharts';
import { VisualStyleService } from '../services/visual-style.service';
import { NavparamService } from '../services/navparam.service';

import { json } from 'express';


require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage  {
  mycadena: string;
  string1: string;
  string2: string;
  string3: string;
  datos: Array<data>;
  datosHnd: Array<data>;
  medObj2: any;
  medObj: any;
  med2: any;
  data: any;
  med: Log; // Medida = new Medida('0','0','0','0');
  temperatura: any;
  humedad: any;
  presion: any;
  canal1: any;
  canal2: any;
  timestamp:any;
  dispositivo: Dispositivo = new Dispositivo(0,0,"","","",0,0,0,0,0,0,"","","");
  fecha: string;
  nombre: string;
  ubicacion: string;
  servicio: string;
  topico: string;
  sampling: number;
  dbStatus: boolean;
  dataReady: boolean;
  dbPostStatus: boolean;
  logs:any;
  subscription: any;
  datagraf: number;
  act: number;
  ts: any;
  UTC_ultima_medicion: number;
  UTC_hora_actua: number;
  UTC_dif_medicion: number;
  estado_dispositivo: number;
  hora_mod: number;
  hora: number;
  flag: number;
  graphOrNum: Boolean;
  dark: boolean;
  newOpt: any;  
  newOpt2: any;
  cfgcanal: Array<DisConfig>;
  cfgcanal2: Array<DisConfig>=new Array<DisConfig>();

  maxHumidity= 100;
 
  

  // eslint-disable-next-line @typescript-eslint/member-ordering
  //public mygraph;
  //public mygraph2;
  public mygraph:Array<any>= new Array<any>();
  public graphOptions;
  public graphOptions2;

  constructor(public conndb: ApiConnService,
              private activatedRoute: ActivatedRoute, 
              public now: TimestampService, 
              public darkm:VisualStyleService,
              private navParamService:NavparamService) {
    console.log("Constructor device");
    // if(Home.dMode==true)
    // {
    //   console.log("DMODE ON");
    // }else{
    //   console.log("DMODE OFF");
    // }

    // console.log('this.data is 1 = ' + this.data);
    // //Acá leemos el dato posta
    // this.data=this.navParamService.getNavData();
    // console.log('this.data is 2= ' + this.data);
    // if(!this.data)
    // {
      this.data=sessionStorage.getItem('myId');
      console.log('constructor myId = ' + this.data);
    // }else
    //   {
        // localStorage.setItem("myId",this.data);
        // console.log('myId= ' + this.data);
      // }
    this.dbStatus=true;
    this.dataReady=false;       //No dibuja página
    this.dbPostStatus=true;
    this.graphOrNum=true;       //Gestion de presentacion de grafico
    this.obtenerDatos();
   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
    console.log("ngOnInit");
    //this.data=sessionStorage.getItem('myId');
    console.log('ngOnInit myId = ' + this.data);
    //this.obtenerDatos();

  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
     console.log("Humedad 1 =" + this.dispositivo.humedad);
     console.log("Humedad 2 =" + this.dispositivo.humedad);
        if(this.dataReady)
        {
          if(this.graphOrNum){
            if(this.flag != 1) 
            {
                console.log("paso de prima")
                this.generarGrafico(); 
                if (this.dispositivo.humedad)this.generarGrafico2(); 
            }
            this.flag=1;
            console.log("paso subscription")
            this.updateChart();}
        }
     this.subscription = interval(2000).subscribe(() => { 
                                                          if(this.dbStatus)
                                                          {
                                                                this.obtenerDatos();
                                                                // if(this.graphOrNum){
                                                                // if(this.flag != 1) 
                                                                // {
                                                                //     console.log("paso de prima")
                                                                //     this.generarGrafico(); 
                                                                //     if (this.dispositivo.humedad)this.generarGrafico2(); 
                                                                // }
                                                                // this.flag=1;
                                                                // console.log("paso subscription")
                                                                // this.updateChart();}
                                                            }
                                                            
                                                        });
                                                       
  }
  ionViewDidLoad()
  {
    console.log("ionViewDidLoad");
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave");
    this.subscription.unsubscribe();
    this.flag=0;
  }

   async obtenerDatos()
   {
    try{

            this.med=await this.conndb.getLastLog(this.data);
            this.med2=JSON.stringify(this.med);
            this.medObj=JSON.parse('[' + this.med2.replace(/,/g, '},{') + ']');    
            console.log(this.medObj.length);
            this.string2="";
            this.string3='[';
            for(let i=2;i<this.medObj.length;i++)
                { 
                        this.string1=JSON.stringify(this.medObj[i]);
                        let inicio=this.string1.search('{');
                        let final=this.string1.search(':');
                        let c=inicio;
                            while(c<=final)
                            {
                              this.string1=this.string1.replace(this.string1[c],"");
                              final--; 
                            }
                        this.string1=this.string1.replace("","");
                        let a=this.string2.concat('{"id":',this.string1);
                        this.string2=a;
                        this.string2=this.string2.replace(/}{/g, '},{');
                }
            this.string3='['+this.string2+']';    
            this.datosHnd=JSON.parse(this.string3); 


           this.dispositivo = await this.conndb.getDispositivo(this.data);
           this.cfgcanal=JSON.parse(String(this.dispositivo.cfg));
           let lng=this.cfgcanal2.length;
           //no sirve tiene malos efectos en el dibujo. De la página web.
           for(let i=0;i<lng;i++)
           {
            this.cfgcanal2.pop();
           }
           console.log("la longitud dsd del for de this.cfgcanal2 es " + this.cfgcanal2.length);
           console.log("this.datos");
           console.log(this.datosHnd);


           var j=0;
           let lng2=this.cfgcanal.length;
           for(let i=0;i<lng2;i++)
           {  
              
             if (this.cfgcanal[i].habilitado)
              { 
                this.cfgcanal2.push(this.cfgcanal[i]);   //this.cfgcanal[i];
 
              }
              if (!this.cfgcanal[i].habilitado)
              {
                console.log(this.datosHnd[i]);
                this.datosHnd.splice(i-j,1);
                j++;
              }
            }
           this.datos=this.datosHnd;        //To avoid flicker when redrar this.datos
           console.log(this.cfgcanal2);
           console.log("this.datos");
           console.log(this.datos);
           console.log("this.medObj");
           console.log(this.medObj);
           console.log("this.cfgcanal");
           console.log(this.cfgcanal);

           this.temperatura=(this.med.temperatura );
           this.humedad=this.med.humedad;
           this.presion=this.med.presion;
           this.canal1=this.med.canal1;
           this.canal2=this.med.canal2;
           this.timestamp=this.med.timestamp;
           this.nombre=this.dispositivo.nombre;
           this.ubicacion=this.dispositivo.ubicacion;
           this.servicio=this.dispositivo.servicio;
           this.sampling=this.dispositivo.sampling;
           this.topico=this.dispositivo.topicoServ;
           this.convertirDatos();         
     }
     catch (error)
      {
        this.dbStatus=false;
        console.log('error');
      }

      this.dataReady=true;    //Dibujo página luego de consultar los datos
      console.log("dataReady");
     }

  async mostrarLogs()
  {
      this.logs=await this.conndb.getLogs(this.data);
      console.log(this.logs);
      this.convertirDatos(); 
  }

 convertirDatos(){
  let now = new Date();
  this.datagraf=Date.UTC( Number(this.timestamp.substring(0,4)),
                          Number(this.timestamp.substring(5,7))-1,
                          Number(this.timestamp.substring(8,10)),
                          Number(this.timestamp.substring(11,13)),
                          Number(this.timestamp.substring(14,16)),
                          Number(this.timestamp.substring(17,19)));//Number(this.timestamp.substring(17,19)))-10800000;
  this.UTC_ultima_medicion=this.datagraf;
  this.UTC_hora_actua=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds());
  this.UTC_dif_medicion = this.UTC_hora_actua-this.UTC_ultima_medicion;
  this.hora=Number(this.timestamp.substring(11,13))
  console.log("this.hora =" + this.hora);
  this.ts = this.timestamp.substring(8,10)+'-'+this.timestamp.substring(5,7)+'-'+this.timestamp.substring(0,4)+' '+this.hora+':'+this.timestamp.substring(14,16)+':'+this.timestamp.substring(17,19);
  if(this.UTC_dif_medicion > 45000)
      {this.estado_dispositivo=0}
  else if (this.UTC_dif_medicion < 30000)
          {this.estado_dispositivo=1}
return;
}

controlCanal(act){
let data='';
  switch(act)
  {
    case 1:
          data='{"canal1":1}';
      break
    case 2:
          data='{"canal1":0}';
      break
    case 3:
          data='{"canal2":1}';
      break
    case 4:
          data='{"canal2":0}';
      break
  }
 console.log('Envío a %s con valor =%s',this.topico, data); 
 this.conndb.postCanal(this.topico,data);
}
updateChart(){
  // try{
    //this.mygraph.update({
    this.mygraph[1].update({
      series:[{data:[this.temperatura]}]});

  if(this.dispositivo.humedad){
     //this.mygraph2.update({
     this.mygraph[2].update({
       series:[{data:[this.humedad]}]});}

//   }
//  catch{}
}

generarGrafico(){

  if(this.darkm.checkDarkMode())
  {
    this.chartDarkMode();
  }
    this.chartWhiteOptn();


  Highcharts.setOptions({
      lang: {
          months: [
              'Enero', 'Febrero', 'Marzo', 'Abril',
              'Mayo', 'Junio', 'Julio', 'Agosto',
              'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ],
          weekdays: [
              'Domingo', 'Lunes', 'Martes', 'Miercoles',
              'Jueves', 'Viernes', 'Sabado'
          ]
      }
      ,
      exporting:{
            enabled:false   //Elimina ek botón de exportar
          }
    });

 
  //this.mygraph = Highcharts.chart('container', this.graphOptions );
  this.mygraph[1] = Highcharts.chart('container', this.graphOptions );


  

  ////
console.log("generar grafico this.dispositivo.humedad = " + this.dispositivo.humedad);


}
generarGrafico2()
{  

  if(this.darkm.checkDarkMode())
  {
    this.chartDarkMode();
  }
    this.chartWhiteOptn2();

   // var chartSpeed 
   //this.mygraph2 =Highcharts.chart('gauge2', Highcharts.merge(this.graphOptions2, {
   this.mygraph[2] =Highcharts.chart('gauge2', Highcharts.merge(this.graphOptions2, {
      yAxis: {
        min: 0,
        max: this.maxHumidity,   // SOlo para verificar que lo podemos traer de otra variable
        title: {
          text: 'Humedad'
        }
      },
    
      credits: {
        enabled: false
      },
    
      series: [{
        //name: 'Speed',
        data: [80],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">%H.R</span>' +
            '</div>'
        },
        tooltip: {
          valueSuffix: ' %H.R'
        }
      }]
    
    }));
  
}
chartDarkMode()
{
       Highcharts.setOptions({colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
       '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
     chart: {backgroundColor: '#1e1e1e',
       style: {
           fontFamily: '\'Unica One\', sans-serif'
       },
       plotBorderColor: '#606063'
     },
     title: {
       style: {
           color: '#E0E0E3',
           textTransform: 'uppercase',
           fontSize: '20px'
       }
     },
     subtitle: {
       style: {
           color: '#E0E0E3',
           textTransform: 'uppercase'
       }
     },
     xAxis: {
       gridLineColor: '#707073',
       labels: {
           style: {
               color: '#E0E0E3'
           }
       },
       lineColor: '#707073',
       minorGridLineColor: '#505053',
       tickColor: '#707073',
       title: {
           style: {
               color: '#A0A0A3'
           }
       }
     },
     yAxis: {
       gridLineColor: '#707073',
       labels: {
           style: {
               color: '#E0E0E3'
           }
       },
       lineColor: '#707073',
       minorGridLineColor: '#505053',
       tickColor: '#707073',
       tickWidth: 1,
       title: {
           style: {
               color: '#A0A0A3'
           }
       }
     },
     tooltip: {
       backgroundColor: 'rgba(0, 0, 0, 0.85)',
       style: {
           color: '#F0F0F0'
       }
     },
     plotOptions: {
       series: {
           dataLabels: {
               color: '#F0F0F3',
               style: {
                   fontSize: '13px'
               }
           },
           marker: {
               lineColor: '#333'
           }
       },
       boxplot: {
           fillColor: '#505053'
       },
       candlestick: {
           lineColor: 'white'
       },
       errorbar: {
           color: 'white'
       }
     },
     legend: {
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       itemStyle: {
           color: '#E0E0E3'
       },
       itemHoverStyle: {
           color: '#FFF'
       },
       itemHiddenStyle: {
           color: '#606063'
       },
       title: {
           style: {
               color: '#C0C0C0'
           }
       }
     },
     credits: {
       style: {
           color: '#666'
       }
     },
     /* labels: {
       style: {
           color: '#707073'
       }
     },
     drilldown: {
       activeAxisLabelStyle: {
           color: '#F0F0F3'
       },
       activeDataLabelStyle: {
           color: '#F0F0F3'
       }
     },
     /* navigation: {
       buttonOptions: {
           symbolStroke: '#DDDDDD',
           theme: {
               fill: '#505053'
           }
       }
     },*/
     // scroll charts
     rangeSelector: {
       buttonTheme: {
           fill: '#505053',
           stroke: '#000000',
           style: {
               color: '#CCC'
           },
           states: {
               hover: {
                   fill: '#707073',
                   stroke: '#000000',
                   style: {
                       color: 'white'
                   }
               },
               select: {
                   fill: '#000003',
                   stroke: '#000000',
                   style: {
                       color: 'white'
                   }
               }
           }
       },
       inputBoxBorderColor: '#505053',
       inputStyle: {
           backgroundColor: '#333',
           color: 'silver'
       },
       labelStyle: {
           color: 'silver'
       }
     },
     navigator: {
       handles: {
           backgroundColor: '#666',
           borderColor: '#AAA'
       },
       outlineColor: '#CCC',
       maskFill: 'rgba(255,255,255,0.1)',
       series: {
           color: '#7798BF',
           lineColor: '#A6C7ED'
       },
       xAxis: {
           gridLineColor: '#505053'
       }
     },
     scrollbar: {
       barBackgroundColor: '#808083',
       barBorderColor: '#808083',
       buttonArrowColor: '#CCC',
       buttonBackgroundColor: '#606063',
       buttonBorderColor: '#606063',
       rifleColor: '#FFF',
       trackBackgroundColor: '#404043',
       trackBorderColor: '#404043'
     }});

}
chartWhiteOptn2()
{
  this.graphOptions2={ 
    chart: 
     {
      height: '100%',
      type: 'solidgauge'//,
      //backgroundColor: '#f00'

    },
    
  
    title: null,
  
    pane: {
      center: ['50%', '70%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        
        //backgroundColor: '#e00',
        backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
  
    exporting: {
      enabled: false
    },
  
    tooltip: {
      enabled: false
    },
  
    // the value axis
    yAxis: {
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      }
    },
  
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    }
  };
}
chartWhiteOptn(){
  this.graphOptions={               //Highcharts.chart('container', {

    chart:             //Agregadas nuevas propiedades para el manejo del modo oscuro en 
     {
      type: 'gauge',
      //backgroundColor:'#1e1e1e',
     // plotBackgroundColor: '#1e1e1e',
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '100%'
    },
  
    title: {
      text: 'Temperatura'
    },
  
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '60%'],
      size: '100%'
    },
  
    // the value axis
    yAxis: {
      min: 0,
      max: 60,
      tickPixelInterval: 60,
      tickPosition: 'inside',
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
      tickLength: 20,
      tickWidth: 1,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: '14px'
        }
      },
      lineWidth: 0,
      plotBands: [{
        from: 0,
        to: 30,
        color: '#55BF3B', // green
        thickness: 20
      }, {
        from: 30,
        to: 45,
        color: '#DDDF0D', // yellow
        thickness: 20
      }, {
        from: 45,
        to: 60,
        color: '#DF5353', // red
        thickness: 20
      }]
    },
    credits:{
      enabled: false      //Elimina la marca de agua de Highcharts
    },
    series: [{
      name: 'Temperatura',
      data: [this.temperatura],//[0],//[this.temperatura]
      tooltip: {
        valueSuffix: ' ºC'
      },
      dataLabels: {
        format: '{y} ºC',
        borderWidth: 0,
        color: (
          Highcharts.defaultOptions.title &&
          Highcharts.defaultOptions.title.style &&
          Highcharts.defaultOptions.title.style.color
        ) || '#333333',
        style: {
          fontSize: '16px'
        }
      },
      dial: {
        radius: '80%',
        backgroundColor: 'gray',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'gray',
        radius: 6
      }
  
    }]
  
  }
}

}
