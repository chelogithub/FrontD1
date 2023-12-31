import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // path: 'dispositivo/:id',
    path: 'dispositivo',
    loadChildren: () => import('./dispositivo/dispositivo.module').then( m => m.DispositivoPageModule)
  },
  {
    path: 'mediciones/:id',
    loadChildren: () => import('./mediciones/mediciones.module').then( m => m.MedicionesPageModule)
  },
  {
    //path: 'grafico/:id',
    path: 'grafico',
    loadChildren: () => import('./grafico/grafico.module').then( m => m.GraficoPageModule)
  },
  {
    path: 'aprov',
    loadChildren: () => import('./aprovisionamiento/aprov.module').then( m => m.AprovPageModule)
  },
  {
    path: 'nodos',
    loadChildren: () => import('./nodos/nodos.module').then( m => m.NodosPageModule)
  },
  {
    path: 'bitacora',
    loadChildren: () => import('./bitacora/bitacora.module').then( m => m.BitacoraPageModule)
  },
  {
    path: 'editar-dispositivo',
    loadChildren: () => import('./editar-dispositivo/editar-dispositivo.module').then( m => m.EditarDispositivoPageModule)
  },
  {
    path: 'modificar-dispositivo',
    loadChildren: () => import('./modificar-dispositivo/modificar-dispositivo.module').then( m => m.ModificarDispositivoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
