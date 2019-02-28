import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtComponent } from './yt.component';

describe('YtComponent', () => {
  let component: YtComponent;
  let fixture: ComponentFixture<YtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
