import { TransferirJugadorDialogComponent } from './transferir-jugador-dialog/transferir-jugador-dialog.component';
import { UpdateJugadorDialogComponent } from './update-jugador-dialog/update-jugador-dialog.component';
import { AddRegistroCorpDialogComponent } from './add-registro-corp-dialog/add-registro-corp-dialog.component';
import { JugadoresService } from './../../services/jugadores.service';
import { Equipo } from './../../models/Equipo';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposService } from './../../services/equipos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Jugador } from 'src/app/models/Jugador';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleJugadorDialogComponent } from './detalle-jugador-dialog/detalle-jugador-dialog.component';
import { DeleteConfirmDialogComponent } from '../abonados/delete-confirm-dialog/delete-confirm-dialog.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})

export class PlantillaComponent implements OnInit {

  constructor(private equiposService: EquiposService, private jugadoresService: JugadoresService,  public dialog: MatDialog) { }
 

  ngOnInit() {
    this.equiposService.getEquipos().subscribe(data => {
      this.equiposArray = data;
      this.tabsEquipos.selectedIndex = 1;
    })
  }

  @ViewChild('tabsEquipos', {static: false}) tabsEquipos: MatTabGroup;
  
  equiposArray: Equipo[] = [];
  dataSourceJugadores: MatTableDataSource<Jugador>;
  displayedColumns: string[] =['nombre', 'apellidos' ,'posicion', 'fecha_nacimiento', 'dni', 'reconocimiento_medico', 'duracion', 'acciones']
  
  public equipoTabActual: any;

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    const equipo = this.equiposArray.find(x => x.nombre === tabChangeEvent.tab.textLabel);
    if(equipo) {
      const jugadoresArray = equipo.jugadores;
      this.dataSourceJugadores = new MatTableDataSource(jugadoresArray);
      this.equipoTabActual = equipo;
    }
  }

  formRegistroJugador = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    posicion: new FormControl(null, Validators.required),
    fecha_nacimiento: new FormControl(null, Validators.required),
    dni: new FormControl(null, Validators.required),
    rec_medico: new FormControl(null),
    duracion: new FormControl(null),
    equipo: new FormControl(null, Validators.required),
    imagen: new FormControl('')
  });

  posiciones: String[] = ['Portero', 'Defensa', 'Central', 'Lateral Izquierdo', 'Lateral Derecho', 'Delantero'];

  archivoSeleccionado: any;
  urlImagen:any;
  @ViewChild('fileInput') fileInput: ElementRef;
  
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.formRegistroJugador.patchValue({
          imagen: file.name + ' - '
        });
        this.archivoSeleccionado = file;
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.formRegistroJugador.patchValue({
        imagen: '',
      });
    }
  }


  async submitFormRegistroJugador(formDirective: FormGroupDirective) {
    if (this.formRegistroJugador.invalid) {
      return;
    } else {
      let urlImgPerfil;
      if (this.archivoSeleccionado != null) {
        urlImgPerfil = await this.storeImage2(); 
      }
      this.jugadoresService.registrarJugador(this.formRegistroJugador.get('nombre')?.value, this.formRegistroJugador.get('apellidos')?.value, this.formRegistroJugador.get('posicion')?.value,
            this.formRegistroJugador.get('fecha_nacimiento')?.value, this.formRegistroJugador.get('dni')?.value, this.formRegistroJugador.get('rec_medico')?.value, 
            this.formRegistroJugador.get('duracion')?.value, this.formRegistroJugador.get('equipo')?.value, this.formRegistroJugador.get('observaciones')?.value,  urlImgPerfil)
            .subscribe((response) => {
              formDirective.resetForm(); 
              this.formRegistroJugador.reset();
              this.archivoSeleccionado = null;  
              this.ngOnInit();
      });
    }
  }

  async storeImage2(): Promise<String> {
    let response = await new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      var data = new FormData();
      data.append("image", this.archivoSeleccionado);
      xhr.open("POST", "https://api.imgur.com/3/image", true);    
      xhr.setRequestHeader("Authorization", "Bearer c209fe8601a9933fe0abba7fe0fb62f67ccd773a");
      xhr.onload = function(e) {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        resolve(undefined);
        console.error("** An error occurred during the XMLHttpRequest");
      };
      xhr.send(data);
   })
   var obj = JSON.parse(response as string);
   return obj.data.link;
  }


  openDialogDetalleJugador(row: any) {
    console.log(row);
    let dialogRef = this.dialog.open(DetalleJugadorDialogComponent, {data: {jugadorSeleccionado:row} });
    dialogRef.afterClosed().subscribe(res => {
    })       
  }

  openDialogAddRegistroCorporal(jugador: Jugador) {
    let dialogRef = this.dialog.open(AddRegistroCorpDialogComponent, {data: {jugador: jugador} });
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(res.data.creacion) {
          this.ngOnInit();
        }
      }
    })       
  }

  openDialogActualizarJugador(jugador: Jugador) {
    let copia = {} as Jugador;
    copia.idjugadores = jugador.idjugadores;
    copia.nombre = jugador.nombre;
    copia.apellidos = jugador.apellidos;
    copia.fecha_nacimiento = jugador.fecha_nacimiento;
    copia.posicion = jugador.posicion;
    copia.dni = jugador.dni;
    copia.reconocimiento_medico = jugador.reconocimiento_medico;
    copia.duracion = jugador.duracion;
    copia.posicion = jugador.posicion;
    let dialogRef = this.dialog.open(UpdateJugadorDialogComponent, {data: {jugadorSeleccionado: copia, posiciones: this.posiciones} });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if(res.data.jugador) {
          this.jugadoresService.updateById(res.data.jugador).subscribe(res => {
            this.ngOnInit();
          });
          
        }
      }
    })
  }

  openDialogTransferencia(row: any) {
    let dialogRef = this.dialog.open(TransferirJugadorDialogComponent, {data: {jugadorSeleccionado:row, equipos: this.equiposArray, equipoTabActual: this.equipoTabActual}});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.jugadoresService.transferirJugador(row.idjugadores, res.data.equipoDestino.idequipos).subscribe(res => {
          this.ngOnInit();
        });;
        
      }
    })       
  }

  deleteRowJugador(jugador: Jugador) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.jugadoresService.deleteById(jugador.idjugadores).subscribe(res => {
          this.ngOnInit();
        });
      }
    })       
  
  }

  exportAsExcel(infoGeneral: boolean) {
    if(infoGeneral) {
      let copiaDataSource = this.dataSourceJugadores;
      const dataParaExportar = copiaDataSource.data.map(({ imagen, registros, ...rest }) => rest);
      const workSheet = XLSX.utils.json_to_sheet(dataParaExportar, {header:[]});
      const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      XLSX.writeFile(workBook, 'plantilla' + this.equipoTabActual.nombre + '.xlsx');
    }else {
      let copiaDataSource = this.dataSourceJugadores;
      const dataParaExportar = copiaDataSource.data.map(({ imagen, registros, ...rest }) => {
        const ultimoRegistro = registros.length > 0 ? registros[registros.length - 1] : null;
        const altura = ultimoRegistro ? ultimoRegistro.altura : null;
        const peso = ultimoRegistro ? ultimoRegistro.peso : null;
        const imc = ultimoRegistro ? ultimoRegistro.altura : null;
        const mm = ultimoRegistro ? ultimoRegistro.masa_muscular : null;
        const mo = ultimoRegistro ? ultimoRegistro.masa_osea : null;
        const agua = ultimoRegistro ? ultimoRegistro.agua : null;
        const tmb = ultimoRegistro ? ultimoRegistro.TMB : null;
        const observaciones = ultimoRegistro ? ultimoRegistro.observaciones : null;
        
        return {
          ...rest,
          altura: altura,
          peso: peso,
          imc: imc,
          masa_muscular: mm,
          masa_osea: mo,
          agua: agua,
          TMB: tmb,
          observaciones: observaciones
        };
      });
      console.log(dataParaExportar)
      const workSheet = XLSX.utils.json_to_sheet(dataParaExportar, {header:[]});
      const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      XLSX.writeFile(workBook, 'plantilla' + this.equipoTabActual.nombre + 'Extendido' + '.xlsx');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceJugadores.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceJugadores.paginator) {
      this.dataSourceJugadores.paginator.firstPage();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  

  

}
