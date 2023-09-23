import { Component, OnInit } from '@angular/core';
import { ApiConnService } from '../services/api-conn.service';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';


@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  idDispositivo: string;
  dispositivo: Dispositivo = new Dispositivo(0,0,"","","",0,0,0,0,0,0,"","");
  dbStatus: boolean;
  datagraf: any;


  constructor(public conndb: ApiConnService,private activatedRoute: ActivatedRoute) {
    this.dbStatus=true;
    this.obtenerDatos();

  }

  ngOnInit() {

  }
  async obtenerDatos()
  {

   this.idDispositivo=this.activatedRoute.snapshot.paramMap.get('id');

   try{

          this.dispositivo = await this.conndb.getDispositivo(this.idDispositivo);
      }
     catch (error)
     {
      this.dbStatus=false;
      console.log(error);
     }
}


ionViewDidEnter() {

}
}