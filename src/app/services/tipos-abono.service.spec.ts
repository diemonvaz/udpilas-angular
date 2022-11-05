import { TestBed } from '@angular/core/testing';

import { TiposCarnetService } from './tipos-abono.service';

describe('TiposCarnetService', () => {
  let service: TiposCarnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposCarnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
