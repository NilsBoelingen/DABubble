import { TestBed } from '@angular/core/testing';

import { FirebaseSorageService } from './firebase-storage.service';

describe('FirebaseSorageService', () => {
  let service: FirebaseSorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseSorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
