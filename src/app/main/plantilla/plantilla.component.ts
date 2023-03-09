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
  
  
  
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    const equipo = this.equiposArray.find(x => x.nombre === tabChangeEvent.tab.textLabel);
    if(equipo) {
      const jugadoresArray = equipo.jugadores;
      this.dataSourceJugadores = new MatTableDataSource(jugadoresArray);
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
    observaciones:  new FormControl(null),
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
      console.log(urlImgPerfil);
      this.jugadoresService.registrarJugador(this.formRegistroJugador.get('nombre')?.value, this.formRegistroJugador.get('apellidos')?.value, this.formRegistroJugador.get('posicion')?.value,
            this.formRegistroJugador.get('fecha_nacimiento')?.value, this.formRegistroJugador.get('dni')?.value, this.formRegistroJugador.get('rec_medico')?.value, 
            this.formRegistroJugador.get('duracion')?.value, this.formRegistroJugador.get('equipo')?.value, this.formRegistroJugador.get('observaciones')?.value,  urlImgPerfil)
            .subscribe((response) => {
              formDirective.resetForm(); 
              this.formRegistroJugador.reset();  
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


  deleteRowJugador(jugador: Jugador) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.jugadoresService.deleteById(jugador.idjugadores).subscribe();
        window.location.reload();
      }
    })       
  
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
