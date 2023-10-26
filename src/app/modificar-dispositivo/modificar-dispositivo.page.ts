import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-modificar-dispositivo',
  templateUrl: './modificar-dispositivo.page.html',
  styleUrls: ['./modificar-dispositivo.page.scss'],
})
export class ModificarDispositivoPage implements OnInit {
  dataReady: boolean;
  idDis: string;
  dispositivo: Dispositivo;

  constructor(public conndb: ApiConnService) { 
                                             this.idDis=sessionStorage.getItem('myId');
                                             this.callApi();
                                             }


  async callApi(){
    try{
          this.dispositivo = await this.conndb.getDispositivo(this.idDis);
          console.log('Entrada callApi this.dispositivo');
          console.log(this.dispositivo);
          this.dataReady=true;
        }
        catch(error){
          this.dataReady=false;
        }
    }


  ngOnInit() {
  }

}
