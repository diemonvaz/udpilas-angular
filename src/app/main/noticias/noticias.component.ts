
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit, VERSION } from '@angular/core';
import { Noticia } from 'src/app/models/Noticia';





@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  providers: [NoticiasService],
  styleUrls: ['./noticias.component.css']
})




export class NoticiasComponent implements OnInit {

  
  ngOnInit() {
    
  }


  noticiasArray: Noticia[] = [];
  noticiasPortadaArray: Noticia[] = [];
  

  constructor( private noticiasService: NoticiasService) {
    //aqui desarrollaremos la logica pa sacar tanto la foto de portada, como las etiquetas asociadas a cada noticia
    this.noticiasArray = this.getAllNoticias();
    console.log(this.noticiasArray);
    this.noticiasPortadaArray = this.getNoticiasPortada();
    
    
   }
  


 





  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 
  getAllNoticias(): Noticia[]{
   
    let todasNoticias: Noticia[] = [];
    this.noticiasService.getNoticias().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        todasNoticias.push(res[i]);
      }
    })
    return todasNoticias;
    
  }

  getNoticiasPortada(): Noticia[]{
   
    let todasNoticiasPortada: Noticia[] = [];
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



