import { PlantillaComponent } from './../plantilla.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-detalle-jugador-dialog',
  templateUrl: './detalle-jugador-dialog.component.html',
  styleUrls: ['./detalle-jugador-dialog.component.css']
})
export class DetalleJugadorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>) { }

  ngOnInit(): void {}

  ngAfterViewInit() {}



  public jugador = this.data.jugadorSeleccionado;
  columnasTablaRegistros: string[] =['ALTURA', 'PESO', 'IMC', 'MM', 'MO', 'TMB','AGUA', 'FECHA']


}
