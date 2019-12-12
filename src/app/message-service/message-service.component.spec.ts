import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServiceComponent } from './message-service.component';

describe('MessageServiceComponent', () => {
  let component: MessageServiceComponent;
  let fixture: ComponentFixture<MessageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
