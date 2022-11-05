import { EstadoSocio } from './../../models/EstadoSocio';
import { TipoAbono } from '../../models/TipoAbono';
import { SociosService } from './../../services/socios.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socio } from 'src/app/models/Socio';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddSocioDialogComponent } from '../add-socio-dialog/add-socio-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  providers: [SociosService],
  styleUrls: ['./abonados.component.css']
})
export class AbonadosComponent implements AfterViewInit, Socio {

  constructor(private sociosService: SociosService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.sociosArray);
    
  }

  //Implementa la interfaz
  idsocio: String;
  nombre_completo: String;
  domicilio: String;
  poblacion: String;
  telefono: String;
  correo_electronico: String;
  fecha_nacimiento: String;
  dni: String;
  tipo_abono: TipoAbono;
  estado_2223: EstadoSocio;


  ngAfterViewInit() {
    this.sociosService.getSocios().subscribe(data => {
      this.sociosArray = data;
      this.dataSource = new MatTableDataSource(this.sociosArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  

  dataSource: MatTableDataSource<Socio>;
  sociosArray: Socio[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['idsocio','nombre_completo', 'domicilio', 'poblacion', 'telefono', 'correo_electronico', 'fecha_nacimiento', 'dni', 'tipo_carnet', 'pagadoRecogido', 'acciones'];
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
     
  
  addRow() {
    //const newRow = {"name": "", "occupation": "", "dateOfBirth": "", "age": 0, isEdit: true}
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    let nuevoSocio = {} as Socio;
    let tipoCarnetNuevoSocio = {} as TipoAbono;
    let estadoNuevoSocio = {} as EstadoSocio;
    estadoNuevoSocio.codigo = 'ESTADO_POR_PAGAR';
    tipoCarnetNuevoSocio.precio = 0;
    nuevoSocio.tipo_abono = tipoCarnetNuevoSocio;
    nuevoSocio.estado_2223 = estadoNuevoSocio;
    let dialogRef = this.dialog.open(AddSocioDialogComponent, {data: {nuevoSocio:nuevoSocio, banner: "Registrar nuevo socio", check:true} });

    dialogRef.afterClosed().subscribe(res => {
      if(res.data.nuevoSocio.nombre_completo != undefined && res.data.modificacion) {
        this.sociosService.addSocio(nuevoSocio).subscribe();
        window.location.reload();
      }else {

      }
    
    })    
  }

  updateRow(socio: Socio) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //creamos una copia para evitar problemas de memorias al editar
    let copia = {} as Socio;
    copia.idsocio = socio.idsocio;
    copia.nombre_completo = socio.nombre_completo ?? null;
    copia.domicilio = socio.domicilio ?? null;
    copia.poblacion = socio.poblacion ?? null;
    copia.telefono = socio.telefono ?? null;
    copia.correo_electronico = socio.correo_electronico ?? null;
    copia.fecha_nacimiento = socio.fecha_nacimiento ?? null;
    //para la fecha
    let fechaSplitted = socio.fecha_nacimiento.split("/",3) ?? null;
    let stringAlterado = fechaSplitted[2] + "-" + fechaSplitted [1] + "-" + fechaSplitted [0];
    let fechaFormateada = new Date(stringAlterado);
    //para la fecha
    copia.dni = socio.dni ?? null;
    copia.tipo_abono = socio.tipo_abono ?? null;
    copia.estado_2223 = socio.estado_2223 ?? null;
    let dialogRef = this.dialog.open(AddSocioDialogComponent, {data: {nuevoSocio:copia, banner: "Modificar datos de registro", check:false} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.modificacion) {
        this.sociosService.updateById(res.data.nuevoSocio).subscribe();
        window.location.reload();
      }
    
    })    


  }

  deleteRow(socio: Socio) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.sociosService.deleteById(socio.idsocio).subscribe();
        window.location.reload();
      }
    })       
  
  }

  exportAsExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {header:[]});
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'socios.xlsx');
  }



  

 ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 





}
