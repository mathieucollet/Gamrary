import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardButtons} from '../card-buttons.enum';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.scss']
})
export class GameButtonsComponent implements OnInit {
  @Input() game: string;

  @Output() clicked = new EventEmitter();
  public Buttons = CardButtons;


  onClick(type) {
    this.clicked.emit({type, game: this.game});
  }

  constructor() {
  }

  ngOnInit() {
  }

}
