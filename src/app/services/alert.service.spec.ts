import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a success mesage', () => {
    service.success("mensaje exito test");
  });

  it('should create a warn mesage', () => {
    service.warn("mensaje advertencia test");
  });

  it('should create a error mesage', () => {
    service.error("mensaje error test");
  });

  it('should clear the created message', () => {
    service.clear();
  });



});
