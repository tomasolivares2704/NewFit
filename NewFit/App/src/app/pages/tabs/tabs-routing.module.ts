import { CrosfitPageModule } from './subrutinas/crosfit/crosfit.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      }
    ],
  },
  {
    path: 'subdietas',
    loadChildren: () => import('./subdietas/subdietas.module').then( m => m.SubdietasPageModule)
  },
  {
    path: 'subrutinas',
    loadChildren: () => import('./subrutinas/subrutinas.module').then( m => m.SubrutinasPageModule)
  },
  {
    path: 'antropometrico',
    loadChildren: () => import('./antropometrico/antropometrico.module').then( m => m.AntropometricoPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
