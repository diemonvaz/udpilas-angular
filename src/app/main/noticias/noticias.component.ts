
import { NoticiasService } from './../../services/noticias.service';
import { Component, EventEmitter, OnInit, Output, VERSION } from '@angular/core';
import { Noticia } from 'src/app/models/Noticia';
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
  
  constructor( private noticiasService: NoticiasService) {
    //aqui desarrollaremos la logica pa sacar tanto la foto de portada, como las etiquetas asociadas a cada noticia
    //tendremos que sacar cada instancia de cada noticia, cada imagen de portada asociada a cada una y sus etiquetas
    this.noticiasArray = this.getAllNoticias();
    console.log(this.noticiasArray);
    this.noticiasPortadaArray = this.getNoticiasPortada();
    
    
   }
  
   
    





  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 

  getAllNoticias(): NoticiaRequest[]{
   
    let todasNoticias: NoticiaRequest[] = [];
    this.noticiasService.getNoticias().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        todasNoticias.push(res[i]);
      }
    })
    return todasNoticias;
    
  }

  getNoticiasPortada(): NoticiaRequest[]{
   
    let todasNoticiasPortada: NoticiaRequest[] = [];
    this.noticiasService.getNoticias().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if(res[i].esPortada && todasNoticiasPortada.length < 2) {
          todasNoticiasPortada.push(res[i]);
        }
        
      }
    })
    return todasNoticiasPortada;
    
  }




}



