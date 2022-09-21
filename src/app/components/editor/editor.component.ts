import { Response } from 'express';
import { EtiquetasService } from './../../services/etiquetas.service';
import { Etiqueta } from './../../models/Etiqueta';
import { NoticiasService } from './../../services/noticias.service';
import { Noticia } from 'src/app/models/Noticia';
import { EditorDateDialogComponent } from './../editor-date-dialog/editor-date-dialog.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as customBuild from '../../ckCustomBuild/build/ckeditor.js';
import {COMMA, ENTER, O} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { Imagen } from 'src/app/models/Imagen';





@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  providers: [NoticiasService,
              EtiquetasService],
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {
  http: any;
  
  ngOnInit(): void {
    
  }
  //el ckeditor5 tiene integracion automatica con el textarea de html. Eventualmente se podria modificar,
  //lo que nos ahorraria el editor.getData() y enviarlo, al hacer el submit del form automaticamente
  //se enviarian los datos
 
 
  constructor(public dialog: MatDialog, private noticiasService: NoticiasService, private etiquetasService: EtiquetasService) { 
    //this.authenticateOauth2Imgur();
    /*CHIPS PARA LAS ETIQUETAS*/
    this.allTags = this.getAllEtiquetas();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
    /*CHIPS PARA LAS ETIQUETAS*/


  }


  public Editor = customBuild;

  public editorConfig = {
  
    simpleUpload : {
      
      // The URL that the images are uploaded to.
      uploadUrl: "https://api.imgur.com/3/image",
            
      // El problema es que no está detectando correctamente la imagen, el formato 
      headers: {
        Authorization: 'Bearer c209fe8601a9933fe0abba7fe0fb62f67ccd773a'
        
      },
      data: 'image'
    }
  };

  authenticateOauth2Imgur() {
    var data = new FormData();
    data.append("refresh_token", "a0fbf2adcffea1391280cd32d8bbe031a9f1d049");
    data.append("client_id", "038629c1648a675");
    data.append("client_secret", "cd1720a9bbdc179c353c43da47e36bea68f8090b");
    data.append("grant_type", "refresh_token");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("POST", "https://api.imgur.com/oauth2/token");
    xhr.send(data);
  }

  /* Este dataImagen seria un objeto que contendrá el archivo de la imagen ppal y al hacer submit de la noticia, se guardará en assets */
  archivoSeleccionado: any;
  urlImagen:any;
  /*SUBIDA DE IMAGEN*/
  @ViewChild('fileInput') fileInput: ElementRef;
  archivoImagen = '';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.archivoImagen = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.archivoImagen += file.name + ' - ';
        this.archivoSeleccionado = file;
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

  public portada = false;
  
  cambiaEstado() {
    this.portada = !this.portada;
  }

  
  @ViewChild('myEditor') myEditor: any;
  async onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
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
    let urlImgPrincipal;
    if (this.archivoSeleccionado != null) {
      urlImgPrincipal = await this.storeImage2(); 
    }
    //esta declaracion de imagen es a modo de prueba, para poder enviar noticias a backend provisionalmente.
    //realmente esto no hará falta luego, puesto todas las imagenes (incluyendo la portada) iran referenciadas en el content
    let imgTest1: Imagen = {nombre: 'imagenTest1'} as Imagen;
    let imgTest2: Imagen = {nombre: 'imagenTest2'} as Imagen;
    let imagenesEnPublicacion: Imagen[] = [];
    imagenesEnPublicacion.push(imgTest1);
    imagenesEnPublicacion.push(imgTest2);
    //Si el formulario cumple las validaciones de front-end, lo enviamos a backend
    if(f.valid) {
      this.addNoticia(tituloPublicacion, contenidoNoticia, "Admin", fechaCreStr, fechaPubStr, etiquetasAsociadas, this.portada, urlImgPrincipal, imagenesEnPublicacion);
    }
  }




  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //Llamadas a los servicios para post noticias, get etiquetas y demás

  

  addNoticia(tituloNoticia: String, contenidoNoticia: String, usuario: String, fechaCreacion: String, fechaPublicacion: String, etiquetas: Etiqueta[], esPortada: Boolean, urlImagen: String, imagenes: Imagen[]): void {
    const nuevaNoticia: Noticia = {tituloNoticia, contenidoNoticia, usuario, fechaCreacion, fechaPublicacion, etiquetas, esPortada, urlImagen, imagenes} as Noticia;
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



  async storeImage2(): Promise<String> {
    let response = await new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      var data = new FormData();
      data.append("image", this.archivoSeleccionado);
      xhr.open("POST", "https://api.imgur.com/3/image", true);    
      xhr.setRequestHeader("Authorization", "Bearer c209fe8601a9933fe0abba7fe0fb62f67ccd773a");
      xhr.onload = function(e) {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        resolve(undefined);
        console.error("** An error occurred during the XMLHttpRequest");
      };
      xhr.send(data);
   })
   var obj = JSON.parse(response as string);
   return obj.data.link;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////


}
