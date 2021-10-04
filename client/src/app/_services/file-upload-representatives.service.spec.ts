import { TestBed } from '@angular/core/testing';

import { FileUploadRepresentativesService } from './file-upload-representatives.service';

describe('FileUploadRepresentativesService', () => {
  let service: FileUploadRepresentativesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadRepresentativesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
