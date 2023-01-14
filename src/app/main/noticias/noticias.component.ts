import { NoticiasService } from './../../services/noticias.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, VERSION, ViewChild } from '@angular/core';
import { NoticiaRequest } from 'src/app/models/NoticiaRequest';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  providers: [NoticiasService],
  styleUrls: ['./noticias.component.css']
  
})




export class NoticiasComponent implements OnInit {

  
  ngOnInit() {
 
  }
  
  noticiasArray: NoticiaRequest[] = [];
  noticiasPortadaArray: NoticiaRequest[] = [];
  displaySearch: Boolean = false;
  
  constructor( private noticiasService: NoticiasService) {
    this.getAllNoticias();
    this.getNoticiasPortada();
   }

   onPress(): void {
    this.displaySearch = !this.displaySearch;
   }

   
  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 

  getAllNoticias(): void {
   
    let todasNoticias: NoticiaRequest[] = [];
    this.noticiasService.getNoticias().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if(!res[i].esPortada) {
          todasNoticias.push(res[i]);
        }
      }
    })
    this.noticiasArray = todasNoticias;
    
  }

  getNoticiasPortada(): void{
    this.noticiasService.getNoticias().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if(res[i].esPortada) {
          this.noticiasPortadaArray.push(res[i]);
        }
        
      }
    }) 
  }


  //buscar noticias por titulo 

  searchByTitulo(event: any): void {
    const titulo = event.target.value;
    let noticiasFiltradas: NoticiaRequest[] = [];
    if(titulo == ""){
      this.getAllNoticias();
    }else{
      this.noticiasService.getNoticiaByTitulo(titulo).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          noticiasFiltradas.push(res[i]);
        }
      })
      this.noticiasArray = noticiasFiltradas;
    }
   
  }

  searchByEtiqueta(etiqueta: any): void {
    let noticiasFiltradas: NoticiaRequest[] = [];
    this.noticiasService.getNoticiaByEtiqueta(etiqueta).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        noticiasFiltradas.push(res[i]);
      }
    })
    console.log(noticiasFiltradas);
    this.noticiasArray = noticiasFiltradas;
  
   
  }




}



