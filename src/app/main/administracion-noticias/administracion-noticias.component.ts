import { NoticiaRequest } from './../../models/NoticiaRequest';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Noticia } from 'src/app/models/Noticia';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { Imagen } from 'src/app/models/Imagen';

@Component({
  selector: 'app-administracion-noticias',
  templateUrl: './administracion-noticias.component.html',
  styleUrls: ['./administracion-noticias.component.css']
})
export class AdministracionNoticiasComponent implements AfterViewInit, NoticiaRequest {

  constructor(private noticiasService: NoticiasService,  public dialog: MatDialog) { }

  idnoticias: Number;
  tituloNoticia: String;
  contenidoNoticia: String;
  usuario: String;
  fechaCreacion: String;
  fechaPublicacion: String;
  esPortada: Boolean;
  imagen: Imagen;
  etiquetas: Etiqueta[];

  
  
  ngAfterViewInit(): void {
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticiasArray = data;
      this.dataSource = new MatTableDataSource(this.noticiasArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }

  dataSource: MatTableDataSource<NoticiaRequest>;
  noticiasArray: NoticiaRequest[] = [];
  displayedColumns: string[] = ['tituloNoticia', 'fechaPublicacion', 'fechaCreacion', 'etiquetas', 'esPortada','acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  
}
