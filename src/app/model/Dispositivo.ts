/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class Dispositivo{
    private _dispositivoId: number;
    private _serieNro: number;
    private _nombre: string;
    private _ubicacion: string;
    private _servicio: string;
    private _sampling: number;
    private _canal1: number;
    private _canal2: number;
    private _temperatura: number;
    private _humedad: number;
    private _presion: number;
    private _topico: string;
    private _topicoServ: string;
    

    constructor(dispositivoId,serieNro,nombre,ubicacion,servicio,sampling,canal1,canal2,temperatura,humedad,presion,topico,topicoServ){
        this._dispositivoId=dispositivoId;
        this._serieNro=serieNro;
        this._nombre=nombre;
        this._ubicacion=ubicacion;
        this._servicio=servicio;
        this._sampling=sampling;
        this._canal1=canal1;
        this._canal2=canal2;
        this._temperatura=temperatura;
        this._humedad=humedad;
        this._presion=presion;
        this._topico=topico;
        this._topicoServ=topicoServ;
       
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
      }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
      }
      public get serieNro(): number {
        return this._serieNro;
      }
    public set serieNro(value: number) {
        this._serieNro = value;
      }
    public get nombre(): string {
        return this._nombre;
      }
    public set nombre(value: string) {
        this._nombre = value;
      }
    public get ubicacion(): string {
      return this._ubicacion;
      }
    public set ubicacion(value: string) {
        this._ubicacion = value;
      }
      public get servicio(): string {
        return this._servicio;
        }
      public set servicio(value: string) {
          this._servicio = value;
        }
    public get sampling(): number {
        return this._sampling;
        }
    public set sampling(value: number) {
          this._sampling = value;
        }
    public get canal1(): number {
        return this._canal1;
      }
    public set canal1(value: number) {
      this._canal1 = value;
      }
      public get canal2(): number {
        return this._canal2;
      }
    public set canal2(value: number) {
      this._canal2 = value;
      }
    public get temperatura(): number {
        return this._temperatura;
      }
    public set temperatura(value: number) {
      this._temperatura = value;
      }
      public get humedad(): number {
        return this._humedad;
      }
    public set humedad(value: number) {
      this._humedad = value;
      }
      public get presion(): number {
        return this._presion;
      }
    public set presion(value: number) {
      this._presion = value;
      }
    public get topico(): string {
        return this._topico;
      }
    public set topico(value: string) {
      this._topico = value;
      }

    public get topicoServ(): string {
      return this._topicoServ;
      }
    public set topicoServ(value: string) {
      this._topicoServ = value;
      }

}
