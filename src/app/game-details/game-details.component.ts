import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameApiService} from '../services/game-api.service';
import {Games} from '../interfaces/games';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  game: Games;

  constructor(private gameApi: GameApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getGame(params.id);
    });
  }

  getGame(gameId: number) {
    this.gameApi.getGame(gameId)
      .subscribe((data: Games) => {
        this.game = data;
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  deleteGame(id: number) {
    if (confirm('Are you sure you want to delete this game ?')) {
      this.gameApi.deleteGame(id)
        .subscribe(data => {
          this.router.navigateByUrl('/product');
        });
    }
  }
}
