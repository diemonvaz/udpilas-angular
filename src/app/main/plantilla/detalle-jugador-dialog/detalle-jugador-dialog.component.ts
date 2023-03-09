import { PlantillaComponent } from './../plantilla.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/models/Jugador';

@Component({
  selector: 'app-detalle-jugador-dialog',
  templateUrl: './detalle-jugador-dialog.component.html',
  styleUrls: ['./detalle-jugador-dialog.component.css']
})
export class DetalleJugadorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>) { }

  ngOnInit(): void {
  }

  public jugador = this.data.jugadorSeleccionado;
  columnasTablaRegistros: string[] =['ALTURA', 'PESO', 'IMC', 'MM', 'MO', 'TMB','AGUA', 'FECHA']


}
