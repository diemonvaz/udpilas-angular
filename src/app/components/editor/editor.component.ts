import { EtiquetasService } from './../../services/etiquetas.service';
import { Etiqueta } from './../../models/Etiqueta';
import { NoticiasService } from './../../services/noticias.service';
import { Noticia } from 'src/app/models/Noticia';
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
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  providers: [NoticiasService,
              EtiquetasService],
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  ngOnInit(): void {
    
  }

  public Editor = ClassicEditor;
  

  constructor(public dialog: MatDialog, private noticiasService: NoticiasService, private etiquetasService: EtiquetasService) { 
    
    /*CHIPS PARA LAS ETIQUETAS*/
    this.allTags = this.getAllEtiquetas();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
    /*CHIPS PARA LAS ETIQUETAS*/


  }


  /*SUBIDA DE IMAGEN*/
  @ViewChild('fileInput') fileInput: ElementRef;
  archivoImagen = '';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.archivoImagen = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.archivoImagen += file.name + ' - ';
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
      this.archivoImagen = 'Imagen de portada';
    }
  }
  /*SUBIDA DE IMAGEN*/


  
  /*CHIPS PARA LAS ETIQUETAS*/
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<String[]>;
  tags: String[] = ['UDPilas'];
  allTags: String[];
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    
    if (value) {
      if (!this.tags.includes(value)) {
        this.tags.push(value);
        this.addNuevaEtiqueta(value);
      }
      
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: String): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    
    if (!this.tags.includes(event.option.viewValue)) {
      this.tags.push(event.option.viewValue);
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }
    
  }

  private _filter(value: String): String[] {
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
      this.fechaSetted = res.data.date;  
    })
  
  }
  /*PROCESAMIENTO DIALOG PARA FECHA DE PUBLICACION*/

  cancelarProgramacion() {
    this.fechaSet = false;
    this.fechaSetted = new Date();
    console.log(this.fechaSet)
  }
  
/* Para realizar el submit del formulario completo, incluyendo contenido del editor */


  @ViewChild('myEditor') myEditor: any;
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  
    console.log(this.tags);
    console.log(this.fechaSetted);
    let tituloPublicacion = f.value.tituloPub;
    let contenidoNoticia;
    if (this.myEditor && this.myEditor.editorInstance) {
      console.log(this.myEditor.editorInstance.getData());
       contenidoNoticia = this.myEditor.editorInstance.getData();
    }
    //aqui buscamos el nick del usuario logeado que está escribiendo la publicacion
    ////
    
    let fechaCre = new Date();
    let fechaCreStr;
    let fechaPub;
    let fechaPubStr;

    if(this.fechaSet){ //Si programamos la fecha
      fechaCreStr = fechaCre.toISOString().slice(0, 19).replace('T', ' ');
      fechaPubStr = this.fechaSetted;
    }else{
      let fechaElegida = this.fechaSetted.toISOString().slice(0, 19).replace('T', ' ');
      fechaCreStr = fechaElegida;
      fechaPubStr = fechaElegida;
    }

    const et: Etiqueta = {nombre: ''} as Etiqueta;
    let etiquetasAsociadas: Etiqueta[] = [];
    for (let i = 0; i < this.tags.length; i++) {
      const et: Etiqueta = {nombre: this.tags[i]} as Etiqueta;
      etiquetasAsociadas.push(et);
    }
    
    this.addNoticia(tituloPublicacion, contenidoNoticia, "Admin", fechaCreStr, fechaPubStr, etiquetasAsociadas);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //Llamadas al servicio para post noticias, get etiquetas y demás

  addNoticia(tituloNoticia: String, contenidoNoticia: String, usuario: String, fechaCreacion: String, fechaPublicacion: String, etiquetas: Etiqueta[]): void {
    const nuevaNoticia: Noticia = {tituloNoticia, contenidoNoticia, usuario, fechaCreacion, fechaPublicacion, etiquetas} as Noticia;
    this.noticiasService.addNoticia(nuevaNoticia).subscribe();

  }

   getAllEtiquetas(): String[] {
    let etiquetasArray: String[] = [];
    this.etiquetasService.getAllEtiquetas().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        etiquetasArray.push(res[i].nombre);
      }
    });
    return etiquetasArray;
  }

  //en typeorm verificamos si ya existe, y si es el caso, no la introducimos en BD
  addNuevaEtiqueta(nombre: String): void {
    const nuevaEtiqueta: Etiqueta = {nombre} as Etiqueta;
    this.etiquetasService.addEtiqueta(nuevaEtiqueta).subscribe();
  }
  

}
