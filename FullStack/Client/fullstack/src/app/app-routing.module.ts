import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home-page/home/home.component';
import { AllMoviesComponent } from './home-page/movies-page/all-movies/all-movies.component';
import { MovieComponent } from './home-page/movies-page/movie/movie.component';
import { EditMovieComponent } from './home-page/movies-page/edit-movie/edit-movie.component';
import { AddMovieComponent } from './home-page/movies-page/add-movie/add-movie.component';
import { AllMembersComponent } from './home-page/subscriptions-page/all-members/all-members.component';
import { EditMemberComponent } from './home-page/subscriptions-page/edit-member/edit-member.component';
import { AddMemberComponent } from './home-page/subscriptions-page/add-member/add-member.component';

const appRoutes : Routes = [
  {path: 'login', component : LoginPageComponent, },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'movies',
        component: AllMoviesComponent,
        children:[
          {path:'edit/:id', component: EditMovieComponent},
          {path:'add', component: AddMovieComponent}
        ]
      },
      {
        path: 'subscriptions',
        component: AllMembersComponent,
        children:[
          {path:'edit/:id', component: EditMemberComponent},
          {path:'add', component: AddMemberComponent}
        ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

