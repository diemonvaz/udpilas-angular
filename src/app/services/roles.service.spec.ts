import { TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RolesService', () => {
  let service: RolesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(RolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new Rol', () => {
    service.crearRol("codigoNuevoRol", "descripcion");
  });

  it('should delete an existing Rol', () => {
    service.deleteById("idRolAEliminar");
  });


});
