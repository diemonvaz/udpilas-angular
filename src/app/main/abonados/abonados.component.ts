import { AlertService } from 'src/app/services/alert.service';
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
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  providers: [SociosService, AlertService],
  styleUrls: ['./abonados.component.css']
})
export class AbonadosComponent implements AfterViewInit, Socio {

  constructor(private sociosService: SociosService, private alertService: AlertService, public dialog: MatDialog, private authService: AuthService) { 
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
    this.sociosService.getSocios().subscribe(
      (data: Socio[]) => {
        this.sociosArray = data;
        this.dataSource = new MatTableDataSource(this.sociosArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        if(error.status == '401') {
          this.authService.logout();
          window.location.reload();
        }
      }
    )
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
    //estadoNuevoSocio.codigo = 'ESTADO_POR_PAGAR';
    //tipoCarnetNuevoSocio.precio = 0;
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
  /* Funcion duplicada pero sin exportar las columnas de estado y tipo de abono
  exportAsExcel() {
    console.log(this.dataSource.data);
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {header:[]});
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'socios.xlsx');
  }*/

  exportAsExcel() {
    const dataCopy = JSON.parse(JSON.stringify(this.dataSource.data));
    for (let i = 0; i < dataCopy.length; i++) {
      dataCopy[i].estado_2223 = dataCopy[i].estado_2223.codigo;
      dataCopy[i].tipo_abono = dataCopy[i].tipo_abono.tipo;
    }
    const workSheet = XLSX.utils.json_to_sheet(dataCopy, { header: [] });
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'socios.xlsx');
  }
  


  delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  

 ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 





}
