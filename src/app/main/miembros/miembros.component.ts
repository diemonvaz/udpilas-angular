import { RolesService } from './../../services/roles.service';
import { MiembrosService } from './../../services/miembros.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Miembro } from 'src/app/models/Miembro';
import { Usuario } from 'src/app/models/Usuario';
import { Rol } from 'src/app/models/Rol';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  providers: [MiembrosService, RolesService, AlertService],
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements  AfterViewInit, Miembro {

  constructor(private miembrosService: MiembrosService, private rolesService: RolesService, public dialog: MatDialog) { 

  }
  

  idmiembro: String;
  domicilio: String;
  poblacion: String;
  dni: String;
  usuario: Usuario;
  roles: Rol[];

  rolesExistentes: Rol[];

  ngAfterViewInit() {
    this.miembrosService.getMiembros().subscribe(data => {
      this.miembrosArray = data;
      this.dataSource = new MatTableDataSource(this.miembrosArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.rolesService.getRoles().subscribe(data => {
      this.rolesExistentes = data;
    })
  }


  @ViewChild(MiembrosComponent) private component: MiembrosComponent;
  onTabChanged(event: MatTabChangeEvent) 
  {
    if(event.index == 0) {
        //this.component.;//Or whatever name the method is called
    } else {
    }
  }


  dataSource: MatTableDataSource<Miembro>;
  miembrosArray: Miembro[] = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'dni', 'fecha_nacimiento', 'telefono', 'domicilio', 'poblacion', 'roles'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    nombre: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    dni: new FormControl(null, Validators.required),
    poblacion: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
    fecha_nacimiento: new FormControl(null, Validators.required),
    domicilio: new FormControl(null, Validators.required),
    roles: new FormControl(null, Validators.required),
  });


  submitFormRegistro(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }   
    this.miembrosService
      .registrarMiembro(this.form.get('email')?.value, this.form.get('password')?.value, this.form.get('nombre')?.value, this.form.get('apellidos')?.value, 
       this.form.get('dni')?.value, this.form.get('poblacion')?.value, this.form.get('telefono')?.value, this.form.get('fecha_nacimiento')?.value, 
       this.form.get('domicilio')?.value, this.form.get('roles')?.value)
      .subscribe((response) => {
        formDirective.resetForm(); // reseteo los validadores
        this.form.reset();  //reseteo el data de los inputs
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
