import { RolesService } from './../../services/roles.service';
import { MiembrosComponent } from './../miembros/miembros.component';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Miembro } from 'src/app/models/Miembro';
import { Rol } from 'src/app/models/Rol';
import { Socio } from 'src/app/models/Socio';
import { Usuario } from 'src/app/models/Usuario';



@Component({
  selector: 'app-add-miembro-dialog',
  templateUrl: './add-miembro-dialog.component.html',
  styleUrls: ['./add-miembro-dialog.component.css']
})
export class AddMiembroDialogComponent implements OnInit, Miembro, AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MiembrosComponent>, private rolesService: RolesService) { }


  ngAfterViewInit() {
    this.rolesService.getRoles().subscribe(data => {
      this.tipos_roles = data;
    } )
  }



  idmiembro: String;
  domicilio: String;
  poblacion: String;
  dni: String;
  usuario: Usuario;
  roles: Rol[];

  ngOnInit(): void {
  }

  public nuevoMiembro = this.data.nuevoMiembro;
  public banner = this.data.banner;
  public check = this.data.check;
  tipos_roles: Rol[];

  actualizar() {
    if(this.nuevoMiembro.usuario.fecha_nacimiento != undefined) {
      this.dialogRef.close({data:{nuevoMiembro:this.nuevoMiembro, modificacion:true}})
    }
   
  }
  
   cancelar() {
     this.dialogRef.close({data:{nuevoMiembro: this.nuevoMiembro, modificacion:false}})
   }
  

 
s
}
