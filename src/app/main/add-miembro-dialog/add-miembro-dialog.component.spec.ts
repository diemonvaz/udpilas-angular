import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMiembroDialogComponent } from './add-miembro-dialog.component';

describe('AddMiembroDialogComponent', () => {
  let component: AddMiembroDialogComponent;
  let fixture: ComponentFixture<AddMiembroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMiembroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMiembroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
