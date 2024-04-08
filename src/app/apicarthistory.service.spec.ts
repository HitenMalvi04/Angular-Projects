import { TestBed } from '@angular/core/testing';

import { ApicarthistoryService } from './apicarthistory.service';

describe('ApicarthistoryService', () => {
  let service: ApicarthistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicarthistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
