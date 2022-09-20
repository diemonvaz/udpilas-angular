import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './main/noticias/noticias.component';
import { EditorComponent } from './components/editor/editor.component';
import { AbonadosComponent } from './main/abonados/abonados.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'editor', component: EditorComponent},
  { path: 'socios', component: AbonadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
