import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleJugadorDialogComponent } from './detalle-jugador-dialog.component';

describe('DetalleJugadorDialogComponent', () => {
  let component: DetalleJugadorDialogComponent;
  let fixture: ComponentFixture<DetalleJugadorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleJugadorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleJugadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
