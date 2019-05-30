import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyBannerComponent } from './pretty-banner.component';

describe('PrettyBannerComponent', () => {
  let component: PrettyBannerComponent;
  let fixture: ComponentFixture<PrettyBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettyBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
