import { NoticiaViewComponent } from './main/noticias/noticia-view/noticia-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './main/noticias/noticias.component';
import { EditorComponent } from './components/editor/editor.component';
import { AbonadosComponent } from './main/abonados/abonados.component';
import { HomeComponent } from './components/home/home.component';
import { SeniorComponent } from './main/static-pages/senior/senior.component';
import { HistoriaComponent } from './main/static-pages/historia/historia.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'editor', component: EditorComponent},
  { path: 'socios', component: AbonadosComponent},
  { path: 'noticia/:idnoticias', component: NoticiaViewComponent},
  { path: 'senior', component: SeniorComponent},
  { path: 'historia', component: HistoriaComponent}
  //definir route default para 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
