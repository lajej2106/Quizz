import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('AuthentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });
});
