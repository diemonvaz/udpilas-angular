import { AbonadosComponent } from './../abonados/abonados.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socio } from 'src/app/models/Socio';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-socio-dialog',
  templateUrl: './add-socio-dialog.component.html',
  styleUrls: ['./add-socio-dialog.component.css']
})
export class AddSocioDialogComponent implements OnInit, Socio {

  ngOnInit(): void {
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AbonadosComponent>) {
   
  }
  
  idsocio: String;
  domicilio: String;
  poblacion: String;
  telefono: String;
  correo_electronico: String;
  fecha_nacimiento: String;
  dni: String;
  tipo_carnet: String;
  nombre_completo: String;

  tipos_carnet : String[] = ['PENSIONISTA', 'JUBILADO', 'ADULTO' , 'JOVEN', 'DUO'];

  public nuevoSocio = this.data.nuevoSocio;
  public banner = this.data.banner;
  public check = this.data.check;
 
registrar() {
  if(this.nuevoSocio.fecha_nacimiento != undefined) {
    var fechaSplitted = this.nuevoSocio.fecha_nacimiento.split("-",3);
    this.nuevoSocio.fecha_nacimiento = fechaSplitted[2] + "/" + fechaSplitted[1] +  "/" + fechaSplitted[0];
  }
  this.dialogRef.close({data:{nuevoSocio:this.nuevoSocio, modificacion:true}})
}

actualizar() {
  if(this.nuevoSocio.fecha_nacimiento != undefined) {
    var fechaSplitted = this.nuevoSocio.fecha_nacimiento.split("-",3);
    this.nuevoSocio.fecha_nacimiento = fechaSplitted[2] + "/" + fechaSplitted[1] +  "/" + fechaSplitted[0];
  }
  this.dialogRef.close({data:{nuevoSocio:this.nuevoSocio, modificacion:true}})
}

 cancelar() {
   this.dialogRef.close({data:{nuevoSocio: this.nuevoSocio, modificacion:false}})
 }


}
