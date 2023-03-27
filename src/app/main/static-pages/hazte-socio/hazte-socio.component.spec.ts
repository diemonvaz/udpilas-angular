import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazteSocioComponent } from './hazte-socio.component';

describe('HazteSocioComponent', () => {
  let component: HazteSocioComponent;
  let fixture: ComponentFixture<HazteSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazteSocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazteSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
