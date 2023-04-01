import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEntrenoDialogComponent } from './detalle-entreno-dialog.component';

describe('DetalleEntrenoDialogComponent', () => {
  let component: DetalleEntrenoDialogComponent;
  let fixture: ComponentFixture<DetalleEntrenoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEntrenoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEntrenoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
