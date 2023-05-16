import { AddMiembroDialogComponent } from './../add-miembro-dialog/add-miembro-dialog.component';
import { RolesService } from './../../services/roles.service';
import { MiembrosService } from './../../services/miembros.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Miembro } from 'src/app/models/Miembro';
import { Usuario } from 'src/app/models/Usuario';
import { Rol } from 'src/app/models/Rol';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DeleteConfirmDialogComponent } from '../abonados/delete-confirm-dialog/delete-confirm-dialog.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  providers: [MiembrosService, RolesService, AlertService],
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements  AfterViewInit, Miembro {

  constructor(private miembrosService: MiembrosService, private rolesService: RolesService, private authService: AuthService, public dialog: MatDialog) { 

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
    }, error => {
      if(error.status == '401') {
        this.authService.logout();
        window.location.reload();
      }else {
        console.log(error);
      }
    })

    this.rolesService.getRoles().subscribe(data => {
      this.rolesExistentes = data;
      this.dataSourceRoles = new MatTableDataSource(this.rolesExistentes);
      this.dataSourceRoles.paginator = this.paginator;
      this.dataSourceRoles.sort = this.sort;
    }, error => {
      if(error.status == '401') {
        this.authService.logout();
        window.location.reload();
      }else {
        console.log(error);
      }
    })
  }


  dataSourceRoles: MatTableDataSource<Rol>;
  dataSource: MatTableDataSource<Miembro>;
  miembrosArray: Miembro[] = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'dni', 'fecha_nacimiento', 'telefono', 'domicilio', 'poblacion', 'roles', 'acciones'];
  displayedColumnsRoles: string[] = ['codigo', 'descripcion'];

  
  
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

  formRoles = new FormGroup({
    codigo: new FormControl(null, Validators.required),
    descripcion: new FormControl(null),
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
        this.ngAfterViewInit();
    });
  }

  submitFormCrearRol(formDirective: FormGroupDirective) {
    if (this.formRoles.invalid) {
      return;
    }   
    this.rolesService
      .crearRol(this.formRoles.get('codigo')?.value, this.formRoles.get('descripcion')?.value)
      .subscribe((response) => {
        formDirective.resetForm(); // reseteo los validadores
        this.formRoles.reset();  //reseteo el data de los inputs
        this.ngAfterViewInit();
    });
  }
  
  updateRow(miembro: Miembro) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //creamos una copia para evitar problemas de memorias al editar
    let copia = {} as Miembro;
    let usuarioDeLaCopia = {} as Usuario;
    copia.usuario = usuarioDeLaCopia;
    copia.idmiembro = miembro.idmiembro;
    copia.usuario.nombre = miembro.usuario.nombre ?? null;
    copia.usuario.apellidos = miembro.usuario.apellidos ?? null;
    copia.domicilio = miembro.domicilio ?? null;
    copia.usuario.telefono = miembro.usuario.telefono ?? null;
    copia.poblacion = miembro.poblacion ?? null;
    copia.usuario.telefono = miembro.usuario.telefono ?? null;
    copia.usuario.email = miembro.usuario.email ?? null;
    copia.usuario.fecha_nacimiento = miembro.usuario.fecha_nacimiento ?? null;
    //QUITAR
    let fechaSplitted = miembro.usuario.fecha_nacimiento.split("/",3) ?? null;
    let stringAlterado = fechaSplitted[2] + "-" + fechaSplitted [1] + "-" + fechaSplitted [0];
    //QUITAR
    copia.dni = miembro.dni ?? null;
    copia.usuario.roles = miembro.usuario.roles ?? null;
    console.log(copia)
    let dialogRef = this.dialog.open(AddMiembroDialogComponent, {data: {nuevoMiembro:copia, banner: "Modificar datos de registro", check:false} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.modificacion) {
        console.log(res.data.nuevoMiembro)
        this.miembrosService.updateById(res.data.nuevoMiembro).subscribe();
        window.location.reload();
      }
    
    })    


  }


  deleteRowMiembro(miembro: Miembro) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.miembrosService.deleteById(miembro.idmiembro).subscribe();
        window.location.reload();
      }
    })       
  
  }

  deleteRowRol(rol: Rol) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {data: {} });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.confirmacion == true) {
        this.rolesService.deleteById(rol.idroles).subscribe();
        window.location.reload();
      }
    })       
  
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
