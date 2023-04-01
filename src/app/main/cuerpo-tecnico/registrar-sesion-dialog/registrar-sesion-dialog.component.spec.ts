import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSesionDialogComponent } from './registrar-sesion-dialog.component';

describe('RegistrarSesionDialogComponent', () => {
  let component: RegistrarSesionDialogComponent;
  let fixture: ComponentFixture<RegistrarSesionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSesionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSesionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
