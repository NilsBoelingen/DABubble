import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatContentComponent } from './main-chat-content.component';

describe('MainChatContentComponent', () => {
  let component: MainChatContentComponent;
  let fixture: ComponentFixture<MainChatContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainChatContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainChatContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
