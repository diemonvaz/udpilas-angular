import { NoticiaRequest } from './../../models/NoticiaRequest';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Noticia } from 'src/app/models/Noticia';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { Imagen } from 'src/app/models/Imagen';
import { DeleteConfirmDialogComponent } from '../abonados/delete-confirm-dialog/delete-confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-administracion-noticias',
  templateUrl: './administracion-noticias.component.html',
  styleUrls: ['./administracion-noticias.component.css']
})
export class AdministracionNoticiasComponent implements AfterViewInit, NoticiaRequest {

  constructor(private noticiasService: NoticiasService, private authService: AuthService, public dialog: MatDialog, private datePipe: DatePipe) { }

  idnoticias: String;
  tituloNoticia: String;
  contenidoNoticia: String;
  usuario: String;
  fechaCreacion: string;
  fechaPublicacion: string;
  esPortada: Boolean;
  imagen: Imagen;
  etiquetas: Etiqueta[];

  
  
  ngAfterViewInit(): void {
    this.noticiasService.getNoticias().subscribe(
      data => {
      this.noticiasArray = data;
      this.noticiasArray.forEach(noticia => {
        noticia.fechaPublicacion = this.datePipe.transform(noticia.fechaPublicacion, 'yyyy-MM-dd HH:mm');
        noticia.fechaCreacion = this.datePipe.transform(noticia.fechaCreacion, 'yyyy-MM-dd HH:mm');
      });
      this.dataSource = new MatTableDataSource(this.noticiasArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
      }, error =>  {
        if(error.status == '401') {
          this.authService.logout();
          window.location.reload();
        }else {
          console.log(error);
        }
      }
    )
  }

  dataSource: MatTableDataSource<NoticiaRequest>;
  noticiasArray: NoticiaRequest[] = [];
  displayedColumns: string[] = ['tituloNoticia', 'fechaPublicacion', 'fechaCreacion', 'etiquetas','acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRowNoticia(noticia: NoticiaRequest) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.noticiasService.deleteById(noticia.idnoticias).subscribe();
        window.location.reload();
      }
    })       
  
  }

  
  
}
