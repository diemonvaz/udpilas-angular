import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbonadosComponent } from '../abonados.component';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,  private dialogRef: MatDialogRef<AbonadosComponent>) { }

  ngOnInit(): void {
  }

  

  cerrar(confirmacion: boolean) {
    this.dialogRef.close({data:{confirmacion:confirmacion}})
  
  }

  
 


}
