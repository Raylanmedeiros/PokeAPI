import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pokemon-list/pokemon-list.module').then(m => m.PokemonListPageModule)
  },
  {
    path: 'pokemon-detail',
    loadChildren: () => import('./pokemon-detail/pokemon-detail.module').then( m => m.PokemonDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
