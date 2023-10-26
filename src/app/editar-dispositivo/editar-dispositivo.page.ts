import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-editar-dispositivo',
  templateUrl: './editar-dispositivo.page.html',
  styleUrls: ['./editar-dispositivo.page.scss'],
})
export class EditarDispositivoPage implements OnInit {
dataReady: boolean;
listadoDispositivos: Array<Dispositivo>;
idDis: string;

  constructor(public conndb: ApiConnService) {
                  this.dataReady=false;
                  this.callApi();
                }

  async callApi(){
                  try{
                        this.listadoDispositivos = await this.conndb.getDispositivos();
                        // console.log('Entrada callApi this.listadoDispositivos');
                        // console.log(this.listadoDispositivos);
                        this.dataReady=true;
                      }
                      catch(error){
                        this.dataReady=false;
                      }
                  }
  getId(id:number){
    this.idDis=id.toString();
    sessionStorage.setItem('myId',this.idDis);
  }

  ngOnInit() {
  }

}
