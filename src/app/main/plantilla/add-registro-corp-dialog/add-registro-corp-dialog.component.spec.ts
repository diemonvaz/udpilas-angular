import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistroCorpDialogComponent } from './add-registro-corp-dialog.component';

describe('AddRegistroCorpDialogComponent', () => {
  let component: AddRegistroCorpDialogComponent;
  let fixture: ComponentFixture<AddRegistroCorpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegistroCorpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistroCorpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
