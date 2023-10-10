import { Component, OnInit,ViewChild } from '@angular/core';
import { DatetimeCustomEvent, IonDatetime, IonicModule } from '@ionic/angular';
import { interval } from 'rxjs';
import { ApiConnService } from '../services/api-conn.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})

export class BitacoraPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  address:string;

  fechaDesde: any;
  fechaHasta: any;
  listadoDispositivo: any;
  items = [];
  estado: string;
  dbStatus: boolean;
  subscription: any;
  constructor(public conndb: ApiConnService) { 
                                                this.dbStatus=true;
                                                this.callApi();

                                              }

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

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
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
                          onIonInfinite(ev) {
                            this.generateItems();
                            setTimeout(() => {
                              (ev as InfiniteScrollCustomEvent).target.complete();
                            }, 500);
                          }
  


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss([this.name, this.address], 'confirm');
   
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
