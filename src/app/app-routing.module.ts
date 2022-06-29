import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './main/tienda/tienda.component';
import { NoticiasComponent } from './main/noticias/noticias.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent},
  { path: 'tienda', component: TiendaComponent},
  { path: 'editor', component: EditorComponent},
  { path: 'registro', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
