import { RegistrarSesionDialogComponent } from './registrar-sesion-dialog/registrar-sesion-dialog.component';
import { DetalleEntrenoDialogComponent } from './detalle-entreno-dialog/detalle-entreno-dialog.component';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Entrenamiento } from 'src/app/models/Entrenamiento';
import { Equipo } from 'src/app/models/Equipo';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../abonados/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cuerpo-tecnico',
  templateUrl: './cuerpo-tecnico.component.html',
  styleUrls: ['./cuerpo-tecnico.component.css']
})
export class CuerpoTecnicoComponent implements OnInit {

  constructor(private entrenamientosService: EntrenamientosService, private equiposService: EquiposService, private datePipe: DatePipe,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.entrenamientosService.getEntrenamientos().subscribe(data => {
      this.entrenosArray = data;
      this.entrenosArray.forEach(entreno => {
        entreno.fecha = this.datePipe.transform(entreno.fecha, 'yyyy-MM-dd HH:mm');
      });
      this.dataSourceEntrenos = new MatTableDataSource(this.entrenosArray);
      this.dataSourceEntrenos.sort = this.sort;
      //console.log(this.entrenosArray)
    })
    this.equiposService.getEquipos().subscribe(data => {
      this.equiposArray = data;
    });
    this.equipoSeleccionado = null;
  }

  @ViewChild('tabsCuerpoTecnico', {static: false}) tabsCuerpoTecnico: MatTabGroup;
  @ViewChild(MatSort) sort: MatSort;
  equiposArray: Equipo[] = [];
  entrenosArray: Entrenamiento[] = [];
  dataSourceEntrenos: MatTableDataSource<Entrenamiento>;
  displayedColumns: string[] =['fecha', 'miembro' ,'observaciones', 'equipo', 'acciones']
  equipoSeleccionado: Equipo;



  openDialogDetalleEntrenamiento(row: any) {
    let dialogRef = this.dialog.open(DetalleEntrenoDialogComponent, {data: {entrenamientoSeleccionado:row} });
    dialogRef.afterClosed().subscribe(res => {
    })       
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEntrenos.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceEntrenos.paginator) {
      this.dataSourceEntrenos.paginator.firstPage();
    }
  }

  filtrarEntrenamientosPorEquipo() {
    this.dataSourceEntrenos.data = this.entrenosArray.filter(entreno => entreno.equipo.idequipos == this.equipoSeleccionado.idequipos);
  }

  onRadioChange(equipo: Equipo) {
    this.equipoSeleccionado = equipo;
    this.filtrarEntrenamientosPorEquipo();
  }

  mostrarTodos() {
    this.equipoSeleccionado = null;
    this.dataSourceEntrenos.data = this.entrenosArray;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  openDialogAddRegistroSesion(equipo: Equipo) {
    let dialogRef = this.dialog.open(RegistrarSesionDialogComponent, {data: {equipo: equipo, update: false} });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(res.data.creacion) {
          this.ngOnInit();
        }
      }
    })       
  }

  openDialogActualizarEntrenamiento(entrenamiento: Entrenamiento) {
    let copia = {} as Entrenamiento;
    copia.identrenamientos = entrenamiento.identrenamientos;
    copia.fecha = entrenamiento.fecha;
    copia.observaciones = entrenamiento.observaciones;
    copia.jugadores = entrenamiento.jugadores;
    copia.equipo = entrenamiento.equipo;
    
    let dialogRef = this.dialog.open(RegistrarSesionDialogComponent, {data: {entrenamientoSeleccionado: copia, update: true} });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if(res.data.jugador) {
          /*this.jugadoresService.updateById(res.data.jugador).subscribe(res => {
            this.ngOnInit();
          });*/
          
        }
      }
    })
  }

  deleteRowEntrenamiento(entreno: Entrenamiento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(res.data.confirmacion == true) {
          this.entrenamientosService.deleteById(entreno.identrenamientos).subscribe(res => {
            this.ngOnInit();
          });
        }
      }
    })       
  }


}
