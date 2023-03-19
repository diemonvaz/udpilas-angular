import { AlertService } from './../../../services/alert.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantillaComponent } from '../plantilla.component';

@Component({
  selector: 'app-transferir-jugador-dialog',
  templateUrl: './transferir-jugador-dialog.component.html',
  styleUrls: ['./transferir-jugador-dialog.component.css']
})
export class TransferirJugadorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<PlantillaComponent>, private alertService: AlertService) { }

  ngOnInit() {
    this.equipoElegido = this.data.equipoTabActual;
  }

  public equipos = this.data.equipos;
  public equipoTabActual = this.data.equipoTabActual;
  public jugador = this.data.jugadorSeleccionado;
  public equipoElegido: any;



  transferir() {
    if (this.equipoElegido != this.equipoTabActual) {
      this.dialogRef.close({data:{equipoDestino: this.equipoElegido}});
    }else {
      this.alertService.warn("El jugador ya se encuentra en este equipo");
    }
    
  }

}
