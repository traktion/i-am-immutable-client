import { TestBed } from '@angular/core/testing';

import { BlogWasmService } from './blog-wasm.service';

describe('BlogWasmService', () => {
  let service: BlogWasmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogWasmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
