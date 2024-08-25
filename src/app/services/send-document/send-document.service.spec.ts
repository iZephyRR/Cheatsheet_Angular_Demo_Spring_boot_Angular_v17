import { TestBed } from '@angular/core/testing';

import { SendDocumentService } from './send-document.service';

describe('SendDocumentService', () => {
  let service: SendDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
