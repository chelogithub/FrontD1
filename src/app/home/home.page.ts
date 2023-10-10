/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { Dispositivo } from '../model/Dispositivo';
import { HomePageModule } from './home.module';
import { DispositivoPage } from '../dispositivo/dispositivo.page';
import { interval} from 'rxjs';
import { NavparamService } from '../services/navparam.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivo: Array<Dispositivo>;
  estado: any;
  dbStatus: boolean;
  color:any;
  dMode: boolean;
  idDis: any;  //230830
  subscription: any;
  varnum:number;
  constructor(public conndb: ApiConnService,
              private navparamService: NavparamService) {
                                              this.dbStatus=true;
                                              this.callApi();
                                              }


 // eslint-disable-next-line no-trailing-spaces

  async callApi(){
    try{
      this.listadoDispositivo = await this.conndb.getDispositivos();
      this.estado="warning";  //Prueba para ver el color de la card
      console.log('DEBUG-home.page.ts  this.conndb.getDispositivos()');
      console.log(this.listadoDispositivo);
    }
     catch(error){
      this.dbStatus=false;
     }
     this.subscription = interval(2000).subscribe(() => {console.log('Message every 2 seconds') });
    }

    getId(id){
      this.idDis=id;
      console.log("getId = " + id );
      this.navparamService.setNavData(id);
    
    }

    getColor(id2){
      //console.log("paso por getColor  " +  Math.random() );
      if( Math.random()<0.5)
      {this.varnum=1}
      else{this.varnum=0}
      console.log(Number(Math.floor(id2 + this.varnum)));
      switch(Number(Math.floor(id2 + this.varnum))){
      case 1:
        return("primary");
      case 2:
        return("secondary");
      case 3:
        return("danger");
      default:
        return("warning");
      }    
    }

   ngOnInit(){

    }
}

