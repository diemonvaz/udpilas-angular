import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  //roles definidos que tienen acceso a la seccion de administracion de socios. Si el usuario tiene uno de esos roles, tiene acceso
  // También está protegida la ruta,
  //de modo que aun modificando el html no podría acceder a la vista. 
  //para cambiar los roles de acceso a una vista primero cambiarlo en el routing, de este modo ya estaría funcionando como tal,
  //y posteriormente cambiar los roles aquí para renderizar solamente los items a los que el miembro pueda acceder
  rolesAdministracionSocios: String [] = ['ADMIN'];
  rolesAdministracionNoticias: String [] = ['ADMIN'];
  rolesAdministracionMiembros: String [] = ['ADMIN', 'GESTOR', 'EDITOR'];
  rolesAdministracionPlantilla: String [] = ['ADMIN'];
  rolesAdministracionCuerpoTecnico: String [] = ['ADMIN', 'ENTRENADOR'];

  accesoAdministracionSocios: Boolean = true;
  accesoAdministracionNoticias: Boolean = false;
  accesoAdministracionMiembros: Boolean = false;
  accesoAdministracionPlantilla: Boolean = false;
  accesoAdministracionCuerpoTecnico: Boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    //checkeamos roles solo si el usuario está logado
    if(this.authService.user) {
      this.accesoAdministracionSocios = this.authService.user.roles.some(r=> this.rolesAdministracionSocios.includes(r));
      this.accesoAdministracionNoticias = this.authService.user.roles.some(r=> this.rolesAdministracionNoticias.includes(r));
      this.accesoAdministracionMiembros = this.authService.user.roles.some(r=> this.rolesAdministracionMiembros.includes(r));
      this.accesoAdministracionPlantilla = this.authService.user.roles.some(r=> this.rolesAdministracionPlantilla.includes(r));
      this.accesoAdministracionCuerpoTecnico = this.authService.user.roles.some(r=> this.rolesAdministracionCuerpoTecnico.includes(r));
    }
   
  }


}
