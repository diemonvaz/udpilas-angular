import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantillaComponent } from '../plantilla.component';

@Component({
  selector: 'app-update-jugador-dialog',
  templateUrl: './update-jugador-dialog.component.html',
  styleUrls: ['./update-jugador-dialog.component.css']
})
export class UpdateJugadorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantillaComponent>) { }

  ngOnInit(): void {
  }

  
  public jugadorSeleccionado = this.data.jugadorSeleccionado;


  actualizar() {
    this.dialogRef.close({data:{jugadorSeleccionado:this.jugadorSeleccionado, modificacion:true}})
  }

}
