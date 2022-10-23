import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocioDialogComponent } from './add-socio-dialog.component';

describe('AddSocioDialogComponent', () => {
  let component: AddSocioDialogComponent;
  let fixture: ComponentFixture<AddSocioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
