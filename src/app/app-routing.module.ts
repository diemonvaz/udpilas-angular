import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './main/tienda/tienda.component';
import { NoticiasComponent } from './main/noticias/noticias.component';

const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent},
  { path: 'tienda', component: TiendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
