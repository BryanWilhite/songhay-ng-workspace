import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVideoYouTubeComponent } from './player-video-you-tube.component';

describe('PlayerVideoYouTubeComponent', () => {
  let component: PlayerVideoYouTubeComponent;
  let fixture: ComponentFixture<PlayerVideoYouTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerVideoYouTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVideoYouTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
