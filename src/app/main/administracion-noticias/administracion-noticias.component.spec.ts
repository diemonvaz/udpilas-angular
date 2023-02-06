import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionNoticiasComponent } from './administracion-noticias.component';

describe('AdministracionNoticiasComponent', () => {
  let component: AdministracionNoticiasComponent;
  let fixture: ComponentFixture<AdministracionNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
