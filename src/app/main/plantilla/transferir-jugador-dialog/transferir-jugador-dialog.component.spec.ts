import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirJugadorDialogComponent } from './transferir-jugador-dialog.component';

describe('TransferirJugadorDialogComponent', () => {
  let component: TransferirJugadorDialogComponent;
  let fixture: ComponentFixture<TransferirJugadorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferirJugadorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirJugadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
