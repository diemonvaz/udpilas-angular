import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NoticiaViewComponent } from './main/noticias/noticia-view/noticia-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './main/noticias/noticias.component';
import { EditorComponent } from './components/editor/editor.component';
import { AbonadosComponent } from './main/abonados/abonados.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'editor', component: EditorComponent, canActivate: [IsAuthenticatedGuard]},
  { path: 'socios', component: AbonadosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'noticia/:idnoticias', component: NoticiaViewComponent},
  { path: '**', component: NotFoundComponent} // Wildcard route para un 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
