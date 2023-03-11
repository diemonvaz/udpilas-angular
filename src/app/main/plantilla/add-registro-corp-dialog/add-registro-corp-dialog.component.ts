import { AlertService } from './../../../services/alert.service';
import { RegistrosCorporalesService } from './../../../services/registros-corporales.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantillaComponent } from '../plantilla.component';


@Component({
  selector: 'app-add-registro-corp-dialog',
  templateUrl: './add-registro-corp-dialog.component.html',
  styleUrls: ['./add-registro-corp-dialog.component.css']
})
export class AddRegistroCorpDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>, public regCorporalService: RegistrosCorporalesService, public alertService: AlertService) { }

  ngOnInit(): void {
  }


  public jugador = this.data.jugador;

  formRegistroCorporal = new FormGroup({
    altura: new FormControl(null),
    peso: new FormControl(null),
    imc: new FormControl(null),
    masa_muscular: new FormControl(null),
    masa_osea: new FormControl(null),
    tmb: new FormControl(null),
    agua: new FormControl(null),
    observaciones: new FormControl(null)   
  });


  async submitFormNuevoRegCorporal(formDirective: FormGroupDirective) {
    if (this.formRegistroCorporal.invalid) {
      return;
    }else if (Object.values(this.formRegistroCorporal.value).every(val => val == null || val == undefined)){
      this.alertService.error("Introduce, al menos, un dato para continuar con el nuevo registro corporal");
    } else {
      this.regCorporalService.nuevoRegistroCorporal(this.jugador.idjugadores,this.formRegistroCorporal.get('altura')?.value, this.formRegistroCorporal.get('peso')?.value, this.formRegistroCorporal.get('imc')?.value, 
      this.formRegistroCorporal.get('masa_muscular')?.value, this.formRegistroCorporal.get('masa_osea')?.value, this.formRegistroCorporal.get('tmb')?.value, this.formRegistroCorporal.get('agua')?.value,
      this.formRegistroCorporal.get('observaciones')?.value)
      .subscribe((response) => {
        formDirective.resetForm(); 
        this.formRegistroCorporal.reset();
        this.formRegistroCorporal = null;
        this.dialogRef.close({data:{creacion:true}})
      });
    }
  }



}
