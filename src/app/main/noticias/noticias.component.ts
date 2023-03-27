import { NoticiasService } from './../../services/noticias.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NoticiaRequest } from 'src/app/models/NoticiaRequest';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  providers: [NoticiasService],
  styleUrls: ['./noticias.component.css']
  
})




export class NoticiasComponent implements OnInit {

  
  ngOnInit() {
   
    this.noticiasService.getNoticiasAfterDate().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if(!res[i].esPortada) {
          res[i].fechaPublicacion = this.datePipe.transform(res[i].fechaPublicacion, 'dd/MM/yyyy');
          this.noticiasArray.push(res[i]);
        }else {
          res[i].fechaPublicacion = this.datePipe.transform(res[i].fechaPublicacion, 'dd/MM/yyyy');
          this.noticiasPortadaArray.push(res[i]);
        }
      }

      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }
  
  noticiasArray: NoticiaRequest[] = [];
  noticiasPortadaArray: NoticiaRequest[] = [];
  displaySearch: Boolean = false;
  
  //creamos un dataSource a partir del array de noticias 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<NoticiaRequest> = new MatTableDataSource<NoticiaRequest>(this.noticiasArray);


  constructor( private noticiasService: NoticiasService, private changeDetectorRef: ChangeDetectorRef, private datePipe: DatePipe) {

   }

   onPress(): void {
    this.displaySearch = !this.displaySearch;
   }

   


  ////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  //LLAMADAS A LOS SERVICIOS
 

  getAllNoticias(): void {
   
    let todasNoticias: NoticiaRequest[] = [];
    this.noticiasService.getNoticiasAfterDate().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if(!res[i].esPortada) {
          todasNoticias.push(res[i]);
        }
      }
      this.dataSource = new MatTableDataSource(todasNoticias);
      this.paginator.length = todasNoticias.length;
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
    
  }

  getNoticiasPortada(): void{
    this.noticiasService.getNoticiasAfterDate().subscribe(res => {
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
    let cont = 0;
    if(titulo == ""){
      this.getAllNoticias();
    }else{
      this.noticiasService.getNoticiaByTitulo(titulo).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].fechaPublicacion = this.datePipe.transform(res[i].fechaPublicacion, 'dd/MM/yyyy');
          noticiasFiltradas.push(res[i]);
          cont = cont + 1;  
        }
        this.dataSource = new MatTableDataSource(noticiasFiltradas);
        this.paginator.length = noticiasFiltradas.length;
        this.obs = this.dataSource.connect();
      })  
    }
   
  }

   //buscar noticias por etiqueta 
  searchByEtiqueta(etiqueta: any): void {
    let noticiasFiltradas: NoticiaRequest[] = [];
    this.noticiasService.getNoticiaByEtiqueta(etiqueta).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].fechaPublicacion = this.datePipe.transform(res[i].fechaPublicacion, 'dd/MM/yyyy');
        noticiasFiltradas.push(res[i]);
      }
      this.dataSource = new MatTableDataSource(noticiasFiltradas);
      this.paginator.length = noticiasFiltradas.length;
      this.obs = this.dataSource.connect();
    })
  }

  



}



