import { EditorComponent } from './editor/editor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { NoticiasComponent } from './noticias/noticias.component';


const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent},
  { path: 'tienda', component: TiendaComponent},
  { path: 'editor', component: EditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
