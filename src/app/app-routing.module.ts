import { HazteSocioComponent } from './main/static-pages/hazte-socio/hazte-socio.component';
import { PromocionesComponent } from './main/static-pages/promociones/promociones.component';
import { SponsorsComponent } from './main/static-pages/sponsors/sponsors.component';
import { EstadioComponent } from './main/static-pages/estadio/estadio.component';
import { EquiposComponent } from './main/equipos/equipos.component';
import { OrganigramaComponent } from './main/static-pages/organigrama/organigrama.component';
import { AdministracionNoticiasComponent } from './main/administracion-noticias/administracion-noticias.component';
import { CuerpoTecnicoComponent } from './main/cuerpo-tecnico/cuerpo-tecnico.component';
import { PlantillaComponent } from './main/plantilla/plantilla.component';
import { MiembrosComponent } from './main/miembros/miembros.component';
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
import { HistoriaComponent } from './main/static-pages/historia/historia.component';
import { HasRoleGuard } from './has-role.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'editor', component: EditorComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN , EDITOR'},},
  { path: 'editor/:idnoticias', component: EditorComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN',},},
  { path: 'adm-noticias', component: AdministracionNoticiasComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN',},},
  { path: 'socios', component: AbonadosComponent,  canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN, GESTOR',},},
  { path: 'miembros', component: MiembrosComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN, GESTOR, EDITOR',},},
  { path: 'plantilla', component: PlantillaComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN',},},
  { path: 'cuerpoTecnico', component: CuerpoTecnicoComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard],  data: {role: 'ADMIN',},},
  { path: 'login', component: LoginComponent},
  { path: 'noticia/:idnoticias', component: NoticiaViewComponent},
  { path: 'equipo/:nombre', component: EquiposComponent},
  { path: 'historia', component: HistoriaComponent},
  { path: 'organigrama', component: OrganigramaComponent},
  { path: 'estadio', component: EstadioComponent},
  { path: 'sponsors', component: SponsorsComponent},
  { path: 'promociones', component: PromocionesComponent},
  { path: 'hazte-socio', component: HazteSocioComponent},
  { path: '**', component: NotFoundComponent} // Wildcard route para un 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
