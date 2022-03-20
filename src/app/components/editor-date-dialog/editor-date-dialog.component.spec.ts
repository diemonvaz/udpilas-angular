import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDateDialogComponent } from './editor-date-dialog.component';

describe('EditorDateDialogComponent', () => {
  let component: EditorDateDialogComponent;
  let fixture: ComponentFixture<EditorDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorDateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
