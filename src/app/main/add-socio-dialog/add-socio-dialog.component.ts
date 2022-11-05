import { EstadosSociosService } from './../../services/estados-socios.service';
import { EstadoSocio } from './../../models/EstadoSocio';
import { TiposCarnetService } from '../../services/tipos-abono.service';
import { AbonadosComponent } from './../abonados/abonados.component';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socio } from 'src/app/models/Socio';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoAbono } from 'src/app/models/TipoAbono';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-socio-dialog',
  templateUrl: './add-socio-dialog.component.html',
  providers : [TiposCarnetService, EstadosSociosService],
  styleUrls: ['./add-socio-dialog.component.css']
})
export class AddSocioDialogComponent implements OnInit, Socio, AfterViewInit {

  ngOnInit(): void {
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AbonadosComponent>, private tiposCarnetService: TiposCarnetService,
      private estadosSociosService: EstadosSociosService) {
   
  }


  ngAfterViewInit() {
    this.tiposCarnetService.getTipos().subscribe(data => {
      this.tipos_abono = data;
    }
    );
    this.estadosSociosService.getEstados().subscribe(data => {
      this.estados_socios = data;
    } )
  }
  
  //Implemento la interfaz
  idsocio: String;
  domicilio: String;
  poblacion: String;
  telefono: String;
  correo_electronico: String;
  fecha_nacimiento: String;
  dni: String;
  tipo_abono: TipoAbono;
  estado_2223: EstadoSocio;
  nombre_completo: String;
  //Implemento la interfaz

  tipos_abono: TipoAbono[];
  estados_socios: EstadoSocio[];

  public nuevoSocio = this.data.nuevoSocio;
  public banner = this.data.banner;
  public check = this.data.check;
 
registrar() {
  if(this.nuevoSocio.fecha_nacimiento != undefined) {
    this.dialogRef.close({data:{nuevoSocio:this.nuevoSocio, modificacion:true}})

  }
}

actualizar() {
  if(this.nuevoSocio.fecha_nacimiento != undefined) {
    let tipoAbonoActualizado = {} as TipoAbono;
    this.tipos_abono.forEach ((k) => {
      if(k.tipo == this.nuevoSocio.tipo_abono.tipo) {
        tipoAbonoActualizado = k;
      }
    })
    let estadoActualizado = {} as EstadoSocio;
    this.estados_socios.forEach ((k) => {
      if(k.codigo == this.nuevoSocio.estado_2223.codigo) {
        estadoActualizado = k;
      }
    })
    this.nuevoSocio.tipo_abono = tipoAbonoActualizado;
    this.nuevoSocio.estado_2223 = estadoActualizado;
    this.dialogRef.close({data:{nuevoSocio:this.nuevoSocio, modificacion:true}})
  }
 
}

 cancelar() {
   this.dialogRef.close({data:{nuevoSocio: this.nuevoSocio, modificacion:false}})
 }


}
