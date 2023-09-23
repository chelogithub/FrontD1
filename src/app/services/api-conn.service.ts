/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
import { Medida } from '../model/Medida';
import { Log } from '../model/Log';


@Injectable({
  providedIn: 'root'
})
export class ApiConnService {

  HOST="localhost";//HOST="192.168.0.186";
  PORT="8000";




  dispositivo:  Promise<Dispositivo>;
  dispositivos: Promise<Array<Dispositivo>>;
  medicion: Promise<Medida>;
  mediciones: Promise<Array<Medida>>;
  logs: Promise<Array<Log>>;
  logEv: Promise<Log>;
  postId: any;

  constructor(private _http: HttpClient) {}

  getDispositivo(id): Promise<Dispositivo> {
    
    this.dispositivo = this._http.get<Dispositivo>('http://'+this.HOST+':'+this.PORT+'/dispositivo/'+ id).toPromise();
    //console.log(this.dispositivo);
    // let a: any;
    // a = this._http.get<Dispositivo>('https://192.168.0.186:3443/canal2').toPromise();
    // console.log(a);
    // this.dispositivo=a;
    return this.dispositivo;
  }
  getDispositivos(): Promise<Array<Dispositivo>> {

    this.dispositivos = this._http.get<Array<Dispositivo>>('http://'+this.HOST+':'+this.PORT+'/dispositivo/').toPromise();
    return this.dispositivos;
  }
  getLogs(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/todos/' + id).toPromise();
  }

  getLogsSemana(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/semana/' + id).toPromise();
  }

  getLogsDia(id): Promise<any> {
    return this._http.get<any>('http://'+this.HOST+':'+this.PORT+'/graf/dia/' + id).toPromise();
  }

  getLastLog(id): Promise<Log> {
    return this._http.get<Log>('http://'+this.HOST+':'+this.PORT+'/graf/last/' + id).toPromise();
  }
  
  getIntervalo(id,inicio,fin): Promise<any> {
    const body={'inicio':inicio,'fin':fin};
    return this._http.post<any>('http://'+this.HOST+':'+this.PORT+'/graf/intervalo/'+ id, body).toPromise();
  }
  postCanal(topico,data): Promise<any>{
    const body={'topico':topico,'data':data};
    return this._http.post('http://'+this.HOST+':'+this.PORT+'/activaciones/canal/',body,{responseType: "text"}).toPromise();
  }
  /*postCanal(topico,data): Promise<any> {
    const body={'topico':topico,'data':data};
    return this._http.post<any>('http://192.168.0.186:3000/activaciones/canal/',body).toPromise();
  }*/
}
