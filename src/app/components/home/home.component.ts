import { Component, OnInit } from '@angular/core';
import { NoticiaRequest } from 'src/app/models/NoticiaRequest';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [NoticiasService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private noticiasService: NoticiasService) { 
    this.getUltimasInsertadas(2);
  }

  ngOnInit(): void {
  }
  ultimasInsertadas: NoticiaRequest[] = [];


  getUltimasInsertadas(num): void{
    this.noticiasService.getUltimasInsertadas(num).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.ultimasInsertadas.push(res[i]);
      }
    })
  }

}
