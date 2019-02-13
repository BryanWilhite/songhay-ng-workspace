import { TestBed } from '@angular/core/testing';

import { PlayerVideoYouTubeService } from './player-video-you-tube.service';

describe('PlayerVideoYouTubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerVideoYouTubeService = TestBed.get(PlayerVideoYouTubeService);
    expect(service).toBeTruthy();
  });
});
