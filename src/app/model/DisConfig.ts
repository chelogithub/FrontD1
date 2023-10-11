export class DisConfig{
    private _nombre: string;
    private _unidad: string;
    private _habilitado: Boolean;
    private _representacion: string;

    constructor(nombre,unidad,habilitado,representacion){
        this._nombre=nombre;
        this._unidad=unidad;
        this._habilitado=habilitado;
        this._representacion=representacion;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get unidad(): string {
        return this._unidad;
    }
    public set unidad(value: string) {
        this._unidad = value;
    }

    public get habilitado(): Boolean {
        return this._habilitado;
    }
    public set habilitado(value: Boolean) {
        this._habilitado = value;
    }

    public get representacion(): string {
        return this._representacion;
    }
    public set representacion(value: string) {
        this._representacion = value;
    }
}