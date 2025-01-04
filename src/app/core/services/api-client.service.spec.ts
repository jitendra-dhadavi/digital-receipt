import { TestBed } from '@angular/core/testing';

import { ApiClientService } from './api-client.service';
import { provideHttpClient } from '@angular/common/http';

describe('ApiClientService', () => {
  let service: ApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(ApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
