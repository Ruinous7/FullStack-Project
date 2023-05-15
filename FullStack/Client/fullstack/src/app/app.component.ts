// Angular Modules
import {  Component , ChangeDetectionStrategy, HostListener, } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { filter , find , map } from 'rxjs/operators';
// NgRx Modules
import { Store , select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './reducers'
import { isLoggedOut, setHomePage, setMembers, setMovies, setSubscriptions } from './reducers/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'fullstack';

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if( window.location.pathname=="/login"){
      this._store$.dispatch(isLoggedOut({payload:true}))
    }



  }

  constructor(private _store$ : Store<State> , private http: HttpClient , private router : Router , public route: ActivatedRoute ){

  }

  ngOnInit(){
    this.http.get<any>("http://localhost:8000/members").subscribe( (data) => this._store$.dispatch(setMembers({payload:data})))
    this.http.get<any>("http://localhost:8000/movies").subscribe( (data) => this._store$.dispatch(setMovies({payload:data})))
    this.http.get<any>("http://localhost:8000/subscriptions").subscribe( (data) => this._store$.dispatch(setSubscriptions({payload:data})))
    this._store$.dispatch(setHomePage({payload:true}))
    this.router.navigate(['login'])
  }







}




