import { TestBed } from '@angular/core/testing';

import { GamePublisherFakeApiService } from './game-publisher-fake-api.service';

describe('GamePublisherFakeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamePublisherFakeApiService = TestBed.get(GamePublisherFakeApiService);
    expect(service).toBeTruthy();
  });
});
