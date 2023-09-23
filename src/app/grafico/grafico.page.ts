import { Component, OnInit, ElementRef, NgModule } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import * as Highcharts from 'highcharts';
import { NavparamService } from '../services/navparam.service';
import { DatetimeCustomEvent, IonDatetime, IonicModule } from '@ionic/angular';
import { element } from 'protractor';
import { VisualStyleService } from '../services/visual-style.service';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/boost')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/series-label')(Highcharts);



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  logs: any;
  data: any;
  datagraf:  Array<Array<number>> = new Array<Array<number>>();
  datagraf2: Array<Array<number>> = new Array<Array<number>>();
  datagraf3: Array<Array<number>> = new Array<Array<number>>();
  datagraf4: Array<Array<number>> = new Array<Array<number>>();
  datagraf5: Array<Array<number>> = new Array<Array<number>>();
  btnGraficoDis: boolean;
  dbStatus: boolean;
  dispositivo: Dispositivo = new Dispositivo(0,0,"","","",0,0,0,0,0,0,"","");
  graphSeries: Array<any>;
  seriesVect: Array<any>= new Array<any>();
  nombre: string;
  ubicacion: string;
  servicio: string;
  fechaDesde: any;
  fechaHasta: any;
  fecha: string;
 

  public mygraph;
  public graphOptions;
  constructor(public conndb: ApiConnService,
              private activatedRoute: ActivatedRoute,
              public darkm:VisualStyleService,
              private navParamService:NavparamService) 
              {

                this.btnGraficoDis=false;                                        //Arranco mostrando los botones
                //this.data=this.activatedRoute.snapshot.paramMap.get('id');       //Obtengo el sensor con el id
                console.log("Constructor graph");
                console.log('this.data is 1 = ' + this.data);
                //Acá leemos el dato posta
                this.data=this.navParamService.getNavData();
                console.log('this.data is 2= ' + this.data);
                if(!this.data)
                {
                  this.data=localStorage.getItem("myId");
                  console.log('this.data is 3= ' + this.data);
                }else
                  {
                    localStorage.setItem("myId",this.data);
                    console.log('this.data is 4= ' + this.data);
                  }
                this.datosDispositivo();                                         //Traigo de la base los datos del sensor
                console.log('constructor this.data is = ' + this.data);
}

  ngOnInit() {
    console.log("ngOnInit");
  }

  ionViewDidEnter() {
    //Genero las serien con los datos obtenidos de datosDispositivo ejecutado en el constructor
    console.log("ionViewDidEnter");


    if(this.darkm.checkDarkMode())
    {
        this.chartDarkMode();
    }
    
    this.pass2Series();
    this.generarGrafico();

  }


  ionViewWillEnter() {
    console.log("ionViewWillEnter");
  }

  async datosDispositivo()
  {
   try{

          this.dispositivo = await this.conndb.getDispositivo(this.data);
          this.nombre=this.dispositivo.nombre;
          this.ubicacion=this.dispositivo.ubicacion;
          this.servicio=this.dispositivo.servicio;
          console.log('this.data is dD= ' + this.data);
          console.log(this.dispositivo);
          console.log('this.dispositivo.humedad = ' + this.dispositivo.humedad);
        
     }
     catch (error)
     {
       this.dbStatus=false;
     }
  }
  async mostrarLogs()
  {
    try{
      this.regenerarGrafico();
      this.logs=await this.conndb.getLogs(this.data);
      this.convertirDatos();
      }
      catch(error)
      {
        this.dbStatus=false;
      }
  }
  async mostrarLogsSemana()
  {
    try{
      this.regenerarGrafico();
      this.logs=await this.conndb.getLogsSemana(this.data);
      this.convertirDatos();
      }
      catch(error)
      {
        this.dbStatus=false;
      }
  }
    async mostrarLogsDia()
  {
    try{
      this.regenerarGrafico();
      this.logs=await this.conndb.getLogsDia(this.data);
      this.convertirDatos();
      }
      catch(error)
      {
        this.dbStatus=false;
      }
  }
  async mostrarIntervalo()
  {
    if(this.check_DATE())
    {
      try{
        this.regenerarGrafico();
        this.logs=await this.conndb.getIntervalo(this.data,this.fechaDesde,this.fechaHasta);
        this.convertirDatos();
        }
        catch(error)
        {
          this.dbStatus=false;
        }
    }
  }

  clearLogs()
  {
      this.regenerarGrafico();
      this.updateChart();
  }

convertirDatos(){

  const a = this.logs.length;
  console.log(this.logs);
  for( let i = 0; i < a; i ++)
  {
      this.datagraf[i]=[Date.UTC(Number(this.logs[i].timestamp.substring(0,4)),
      Number(this.logs[i].timestamp.substring(5,7))-1,
      Number(this.logs[i].timestamp.substring(8,10)),
      Number(this.logs[i].timestamp.substring(11,13)),
      Number(this.logs[i].timestamp.substring(14,16)),
      Number(this.logs[i].timestamp.substring(17,19))),//Number(this.logs[i].timestamp.substring(17,19)))-10800000,
      Number(this.logs[i].temperatura)];
      this.datagraf2[i]=[this.datagraf[i][0],Number(this.logs[i].presion)];
      this.datagraf3[i]=[this.datagraf[i][0],Number(this.logs[i].humedad)];
      this.datagraf4[i]=[this.datagraf[i][0],Number(this.logs[i].canal1)];
      this.datagraf5[i]=[this.datagraf[i][0],Number(this.logs[i].canal2)];
      

   }
   console.log(this.datagraf);
   console.log(this.datagraf2);
   console.log(this.datagraf3);
   console.log(this.datagraf4);
   console.log(this.datagraf5);
   this.pass2Series();
   this.updateChart();
   console.log("this.graphOptions.series = " + this.graphOptions.series);
   }

updateChart(){

  console.log("Prueba");

  this.mygraph.update({
    series: this.graphSeries
});

this.btnGraficoDis=false;
}

regenerarGrafico(){
  this.btnGraficoDis=true;
  this.mygraph.destroy();
  //this.generarGrafico();
  this.datagraf=[[0,0]];
  this.datagraf2=[[0,0]];
  this.datagraf3=[[0,0]];
  this.datagraf4=[[0,0]];
  this.datagraf5=[[0,0]];
  this.logs=[[0,0]];
  this.generarGrafico();  //Genera data de gráfico
  this.pass2Series();     //Genera vector de series
}

pass2Series(){
// función : Generar el Array de series del gráfico en función de los recursos del nodo.

    this.graphSeries=[];
    if(this.dispositivo.temperatura)
    {
      this.graphSeries.push({name: 'Temperatura',data: this.datagraf});  
    }
    if(this.dispositivo.presion)
    {
      this.graphSeries.push({name: 'Presión',data: this.datagraf2});  
    }
    if(this.dispositivo.humedad)
    {
      this.graphSeries.push({name: 'Humedad',data: this.datagraf3});  
    }
    if(this.dispositivo.canal1)
    {
      this.graphSeries.push({name: 'Canal1',data: this.datagraf4});  
    }
    if(this.dispositivo.canal2)
    {
      this.graphSeries.push({name: 'Canal2',data: this.datagraf5});  
    }
 
    console.log("this.graphSeries = " + this.graphSeries);
}

generarGrafico(){
  
  this.graphOptions={
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Variables'
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      crosshair: true,
      title: {
        text: 'Escala temporal'
      }
    },
    yAxis: {
      crosshair: true,
      title: {
        text: 'Valor de magnitudes'
      }
    },
    legend: {
      enabled: true
    },
    accessibility: {
      screenReaderSection: {
        // eslint-disable-next-line max-len
        beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
      }
    },
    tooltip: {
      valueDecimals: 2
    },
    series: this.graphSeries  //Se utiliza array graphSeries para el ingreso de las series.
 
  };
  this.mygraph = Highcharts.chart('container3', this.graphOptions );
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
  });
}

test() //flag
  {
    this.fecha=this.fechaDesde;
    console.log("hola");
  }
  check_DATE()
  {
    let desde: number;
    let hasta: number;
    if(this.fechaDesde != null)
    {
      let yearDesde=Number(<string>(this.fechaDesde).substring(0,4));
      let monthDesde=Number(<string>(this.fechaDesde).substring(5,7));
      let dayDesde=Number(<string>(this.fechaDesde).substring(8,10));
      let hsDesde=Number(<string>(this.fechaDesde).substring(11,13));
      let minDesde=Number(<string>(this.fechaDesde).substring(14,16));
      let segDesde=Number(<string>(this.fechaDesde).substring(17,19));
      console.log(yearDesde+" "+ monthDesde+" "+ dayDesde+" "+hsDesde+" "+ minDesde+" "+ segDesde);
      desde=Date.UTC(yearDesde,monthDesde,dayDesde,hsDesde,minDesde,segDesde);
      console.log(desde);
    }else{
      console.log("No se ha ingresado Fecha Desde");
      alert("No se ha ingresado Fecha Desde");
      return (false);
    }
    if(this.fechaHasta != null)
    {
      let yearHasta=Number(<string>(this.fechaHasta).substring(0,4));
      let monthHasta=Number(<string>(this.fechaHasta).substring(5,7));
      let dayHasta=Number(<string>(this.fechaHasta).substring(8,10));
      let hsHasta=Number(<string>(this.fechaHasta).substring(11,13));
      let minHasta=Number(<string>(this.fechaHasta).substring(14,16));
      let segHasta=Number(<string>(this.fechaHasta).substring(17,19));
      console.log(yearHasta+" "+ monthHasta+" "+ dayHasta+" "+hsHasta+" "+ minHasta+" "+ segHasta);
      hasta=Date.UTC(yearHasta,monthHasta,dayHasta,hsHasta,minHasta,segHasta);
      console.log(hasta);
    }else{
      console.log("No se ha ingresado Fecha Hasta");
      alert("No se ha ingresado Fecha Hasta");
      return (false);
    }
    if(hasta>desde)
    {
      if((hasta-desde)<15768000000)
        {
          console.log(hasta-desde);
          return(true);
        }
        else{
          console.log(hasta-desde);
          
          alert("Especifique un intervalo menor a 6 meses");
          return(false);
        }
      
    }
    else{
      alert("La fecha final debe ser posterior a la inicial");
      return(false);
      }
    }
    

  onIonChange(ev: Event) {

    console.log(ev.target);
    console.log((ev.target as Element).id);
    
    if((ev.target as Element).id=="datetime")
    {
      console.log("Fecha desde");
      this.fechaDesde = (ev as DatetimeCustomEvent).detail.value;

    }
    if((ev.target as Element).id=="datetime2")
    {
      console.log("Fecha hasta");
      this.fechaHasta = (ev as DatetimeCustomEvent).detail.value;
    }
     
  }

 chartDarkMode()
 {
        Highcharts.setOptions({colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
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
}
// // Apply the theme

   // series: [{
    //   //type: 'area',
    //   name: 'Temperatura',
    //   data: this.datagraf
    //   },
    //   {
    //     //type: 'area',
    //     name: 'Presión',
    //     data: this.datagraf2
    //   },
    //   {
    //     //type: 'area',
    //     name: 'Humedad',
    //     data: this.datagraf3
    //   },
    //   {
    //     //type: 'area',
    //     name: 'Canal1',
    //     data: this.datagraf4
    //   },
    //   {
    //     //type: 'area',
    //     name: 'Canal2',
    //     data: this.datagraf5
    //   }
    //         ]

