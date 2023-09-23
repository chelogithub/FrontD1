/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */

export class Log{
    private _logId: number;
    private _dispositivoId: number;
    private _timestamp: string;
    private _canal1: number;
    private _canal2: number;
    private _temperatura: number;
    private _humedad: number;
    private _presion: number;
    private _topico: string;

    constructor(logId,dispositivoId,timestamp,canal1,canal2,temperatura,humedad,presion,topico){
        this._logId=logId;
        this._dispositivoId=dispositivoId;
        this._timestamp=timestamp;
        this._canal1=canal1;
        this._canal2=canal2;
        this._temperatura=temperatura;
        this._humedad=humedad;
        this._presion=presion;
        this._topico=topico;
    }

    public get logId(): number {
        return this._logId;
    }
    public set logId(value: number) {
        this._logId = value;
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }

    public get timestamp(): string {
        return this._timestamp;
    }
    public set timestamp(value: string) {
        this._timestamp = value;
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
        this._topico= value;
    }
}
