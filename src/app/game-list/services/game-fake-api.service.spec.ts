import { TestBed } from '@angular/core/testing';

import { GameFakeApiService } from './game-fake-api.service';

describe('GameFakeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameFakeApiService = TestBed.get(GameFakeApiService);
    expect(service).toBeTruthy();
  });
});
