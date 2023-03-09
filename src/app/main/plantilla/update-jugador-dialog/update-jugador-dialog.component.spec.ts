import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJugadorDialogComponent } from './update-jugador-dialog.component';

describe('UpdateJugadorDialogComponent', () => {
  let component: UpdateJugadorDialogComponent;
  let fixture: ComponentFixture<UpdateJugadorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJugadorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJugadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
