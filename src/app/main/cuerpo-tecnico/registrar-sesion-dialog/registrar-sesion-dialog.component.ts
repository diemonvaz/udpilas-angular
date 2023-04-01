import { AuthService } from './../../../services/auth.service';
import { EntrenamientosService } from './../../../services/entrenamientos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantillaComponent } from '../../plantilla/plantilla.component';

@Component({
  selector: 'app-registrar-sesion-dialog',
  templateUrl: './registrar-sesion-dialog.component.html',
  styleUrls: ['./registrar-sesion-dialog.component.css']
})
export class RegistrarSesionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>, private entrenamientosService: EntrenamientosService, private authService: AuthService) { }

  ngOnInit(): void {}

  public equipo = this.data.equipo;
  public entrenamientoSeleccionado = this.data.entrenamientoSeleccionado;
  public update = this.data.update;

  formRegistroEntrenamiento = new FormGroup({
    fecha: new FormControl(null, Validators.required),
    observaciones: new FormControl(null),
    jugadores: new FormControl(null)
  });


  async submitFormNuevoRegSesion(formDirective: FormGroupDirective) {
    if (this.formRegistroEntrenamiento.invalid) {
      return;
    } else {
      console.log(this.equipo)
      this.entrenamientosService.nuevoEntrenamiento(this.authService.user.idusuario, this.formRegistroEntrenamiento.get('fecha')?.value, this.formRegistroEntrenamiento.get('observaciones')?.value,
      this.formRegistroEntrenamiento.get('jugadores')?.value, this.equipo.idequipos)
      .subscribe((response) => {
        formDirective.resetForm(); 
        this.formRegistroEntrenamiento.reset();
        this.formRegistroEntrenamiento = null;
        this.dialogRef.close({data:{creacion:true}})
      });
      
    }
  }



}
