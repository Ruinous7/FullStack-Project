// Angular Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// App Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home-page/home/home.component';
import { AllMoviesComponent } from './home-page/movies-page/all-movies/all-movies.component';
import { AddMovieComponent } from './home-page/movies-page/add-movie/add-movie.component';
import { MovieComponent } from './home-page/movies-page/movie/movie.component';
import { EditMovieComponent } from './home-page/movies-page/edit-movie/edit-movie.component';
// NgRx Modules
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllMembersComponent } from './home-page/subscriptions-page/all-members/all-members.component';
import { AddMemberComponent } from './home-page/subscriptions-page/add-member/add-member.component';
import { EditMemberComponent } from './home-page/subscriptions-page/edit-member/edit-member.component';
import { MemberComponent } from './home-page/subscriptions-page/member/member.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    AllMoviesComponent,
    AddMovieComponent,
    MovieComponent,
    EditMovieComponent,
    AllMembersComponent,
    AddMemberComponent,
    EditMemberComponent,
    MemberComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
