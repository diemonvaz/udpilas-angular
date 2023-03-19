import { PlantillaComponent } from './../plantilla.component';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detalle-jugador-dialog',
  templateUrl: './detalle-jugador-dialog.component.html',
  styleUrls: ['./detalle-jugador-dialog.component.css']
})
export class DetalleJugadorDialogComponent implements OnInit, AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.jugador.registros);   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  public jugador = this.data.jugadorSeleccionado;
  columnasTablaRegistros: string[] =['ALTURA', 'PESO', 'IMC', 'MM', 'MO', 'TMB','AGUA', 'FECHA']


}
