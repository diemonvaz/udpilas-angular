import { AdministracionNoticiasComponent } from './../../administracion-noticias/administracion-noticias.component';
import { MiembrosComponent } from './../../miembros/miembros.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbonadosComponent } from '../abonados.component';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,  private dialogRef: MatDialogRef<AbonadosComponent>, private dialogRefMiembros: MatDialogRef<MiembrosComponent>, private dialogRefGesNoticias: MatDialogRef<AdministracionNoticiasComponent>) { }

  ngOnInit(): void {
  }

  

  cerrar(confirmacion: boolean) {
    this.dialogRef.close({data:{confirmacion:confirmacion}});
    this.dialogRefMiembros.close({data:{confirmacion:confirmacion}});
  }

  
 


}
