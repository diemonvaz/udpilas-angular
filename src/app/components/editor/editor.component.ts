import { EditorDateDialogComponent } from './../editor-date-dialog/editor-date-dialog.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {

  ngOnInit(): void {
  }

  public Editor = ClassicEditor;

  constructor(public dialog: MatDialog) { 
    
    /*CHIPS PARA LAS ETIQUETAS*/
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
    /*CHIPS PARA LAS ETIQUETAS*/


  }


  /*SUBIDA DE IMAGEN*/
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Imagen de portada';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Imagen de portada';
    }
  }
  /*SUBIDA DE IMAGEN*/


  
  /*CHIPS PARA LAS ETIQUETAS*/
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['UDPilas'];
  allTags: string[] = ['Senior', 'Juveniles', 'Portada','Directiva','Liga','Anuncios', 'Abonos'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
  /*CHIPS PARA LAS ETIQUETAS*/



  /*PROCESAMIENTO DIALOG PARA FECHA DE PUBLICACION*/
  public fechaSet = false;
  public fechaSetted  = new Date();

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /* En el dialogConfig le podemos pasar datos a la componente "hijo", aunque para este caso no es necesario */
    let dialogRef = this.dialog.open(EditorDateDialogComponent, {data: {date: this.fechaSetted, check: this.fechaSet} });

    dialogRef.afterClosed().subscribe(res => { 
      console.log(res);
      this.fechaSet = res.data.check;
        
    })
  
  }
  /*PROCESAMIENTO DIALOG PARA FECHA DE PUBLICACION*/

  cancelarProgramacion() {
    this.fechaSet = false;
    this.fechaSetted = new Date();
    console.log(this.fechaSet)
  }
  


}
