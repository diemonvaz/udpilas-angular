import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
  }
  
  formContacto = new FormGroup({
    email: new FormControl(null, Validators.required),
    nombre: new FormControl(null, Validators.required),
    asunto: new FormControl(null, Validators.required)
  });

  async submitFormContacto(formDirective: FormGroupDirective) {
    if (this.formContacto.invalid) {
      return;
    } else {
      /*const email = this.formContacto.value.email;
      const nombre = this.formContacto.value.nombre;
      const asunto = this.formContacto.value.asunto;
      this.utilsService.sendMail(email, nombre, asunto);*/
      this.formContacto.reset();
      this.formContacto = null;
    }
  }

}
