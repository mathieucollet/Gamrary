import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListFilterComponent } from './game-list-filter.component';

describe('GameListFilterComponent', () => {
  let component: GameListFilterComponent;
  let fixture: ComponentFixture<GameListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
