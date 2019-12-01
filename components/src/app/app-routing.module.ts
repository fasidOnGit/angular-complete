import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeStartComponent} from './recipes/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {AuthComponent} from '../auth/auth.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent}
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting {
}
