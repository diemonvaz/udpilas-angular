import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TiposCarnetService } from './tipos-abono.service';
import { HttpClient } from '@angular/common/http';

describe('TiposCarnetService', () => {
  let service: TiposCarnetService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.get(HttpClient);
    service = TestBed.get(TiposCarnetService)
    service = TestBed.inject(TiposCarnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
