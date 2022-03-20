import { EditorComponent } from './../editor/editor.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";




@Component({
  selector: 'app-editor-date-dialog',
  templateUrl: './editor-date-dialog.component.html',
  styleUrls: ['./editor-date-dialog.component.css']
})


export class EditorDateDialogComponent implements OnInit {

  ngOnInit(): void {
    
  }

  public fechaProgramada = this.data.date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
       private dialogRef: MatDialogRef<EditorComponent>) { }


  programar() {
     this.dialogRef.close({data:{date: this.fechaProgramada, check: true}})
    
  }

  cancelar() {
    this.dialogRef.close({data:{date: this.fechaProgramada, check: false}})
  }



}
