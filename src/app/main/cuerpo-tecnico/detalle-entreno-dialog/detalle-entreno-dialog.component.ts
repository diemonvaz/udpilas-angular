import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalle-entreno-dialog',
  templateUrl: './detalle-entreno-dialog.component.html',
  styleUrls: ['./detalle-entreno-dialog.component.css']
})
export class DetalleEntrenoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.entrenamiento.jugadores)
    this.dataSource = new MatTableDataSource(this.entrenamiento.jugadores);   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  public entrenamiento = this.data.entrenamientoSeleccionado;
  columnasTablaRegistros: string[] =['nombre', 'apellidos']

}
