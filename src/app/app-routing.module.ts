import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GameFormComponent} from './game-form/game-form.component';


const routes: Routes = [
  {
    path: 'product',
    children: [{
      path: '',
      component: GameListComponent
    }, {
      path: 'new',
      component: GameFormComponent,
      pathMatch: 'full'
    }, {
      path: ':id',
      component: GameDetailsComponent,
      pathMatch: 'full'
    }, {
      path: ':id/edit',
      component: GameFormComponent,
      pathMatch: 'full'
    }]
  },
  {path: '', redirectTo: '/product', pathMatch: 'full'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
