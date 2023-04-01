import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TipoAbono } from 'src/app/models/TipoAbono';
import { TiposCarnetService } from 'src/app/services/tipos-abono.service';

@Component({
  selector: 'app-hazte-socio',
  templateUrl: './hazte-socio.component.html',
  styleUrls: ['./hazte-socio.component.css']
})
export class HazteSocioComponent implements OnInit {

  constructor(private tiposCarnetService: TiposCarnetService) { }

  ngOnInit(): void {
    this.tiposCarnetService.getTipos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


  dataSource: MatTableDataSource<TipoAbono>;
  displayedColumns: string[] =['tipo', 'precio']

}
