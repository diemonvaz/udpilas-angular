import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantillaComponent } from '../plantilla.component';

@Component({
  selector: 'app-update-jugador-dialog',
  templateUrl: './update-jugador-dialog.component.html',
  styleUrls: ['./update-jugador-dialog.component.css']
})
export class UpdateJugadorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>) { }

  ngOnInit(): void {
  }

  
  public jugador = this.data.jugadorSeleccionado;
  public posiciones = this.data.posiciones;

  formEdicionJugador = new FormGroup({
    nombre: new FormControl(this.jugador.nombre, Validators.required),
    apellidos: new FormControl(this.jugador.apellidos, Validators.required),
    posicion: new FormControl(this.jugador.posicion, Validators.required),
    fecha_nacimiento: new FormControl(this.jugador.fecha_nacimiento, Validators.required),
    dni: new FormControl(this.jugador.dni, Validators.required),
    rec_medico: new FormControl(this.jugador.reconocimiento_medico),
    duracion: new FormControl(this.jugador.duracion)
  });

  actualizar(formDirective: FormGroupDirective) {
    if(!this.formEdicionJugador.invalid) {
      this.jugador.nombre = this.formEdicionJugador.get('nombre')?.value;
      this.jugador.apellidos = this.formEdicionJugador.get('apellidos')?.value;
      this.jugador.posicion = this.formEdicionJugador.get('posicion')?.value;
      this.jugador.fecha_nacimiento = this.formEdicionJugador.get('fecha_nacimiento')?.value;
      this.jugador.dni = this.formEdicionJugador.get('dni')?.value;
      this.jugador.reconocimiento_medico = this.formEdicionJugador.get('rec_medico')?.value;
      this.jugador.duracion = this.formEdicionJugador.get('duracion')?.value;
      this.dialogRef.close({data:{jugador:this.jugador}})
    }
  }

  cancelar() {
    this.dialogRef.close({data:{jugador: null}})
  }

}
