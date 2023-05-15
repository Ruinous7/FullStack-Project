// Angular Modules
import { Component,  } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
// NgRx Modules
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { setAddPage, setContentPage, setEditPage, setHomePage, } from 'src/app/reducers/app.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  // Setting up a host listener for tracking URl movements from the browser buttons.

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(window.location.pathname==="/home") {
      this._store$.dispatch(setHomePage({payload:true}))
      this._store$.dispatch(setContentPage({payload:false}))
      console.log("setting home page" , window.location.pathname)
      return
    }
    if(window.location.pathname==="/home/movies") {
      this._store$.dispatch(setHomePage({payload:false}))
      this._store$.dispatch(setContentPage({payload:true}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:false}))
      return
    }
    if(window.location.pathname==="/home/subscriptions") {
      this._store$.dispatch(setHomePage({payload:false}))
      this._store$.dispatch(setContentPage({payload:true}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:false}))
      return
    }
  }

  // Defining the NgRx Store

  storeData$: Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Homepage Variables

  loggedUser: any;
  url: any;
  homePage: boolean = true
  isLoggedOut: boolean = false

  constructor(private _store$: Store<State>, public router: Router, public route: ActivatedRoute) {

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.loggedUser = data.loggedUser
      this.homePage = data.homePage
      this.isLoggedOut = data.isLoggedOut
    })

  }

  logout() {
    this._store$.dispatch(setHomePage({payload:true}))
    this._store$.dispatch(setEditPage({payload:false}))
    this._store$.dispatch(setAddPage({payload:false}))
    this.router.navigate(['login'])
  }

  toHome() {
    this._store$.dispatch(setHomePage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home'])
  }

  toMovies() {
    this._store$.dispatch(setHomePage({payload:false}))
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['movies'], {relativeTo:this.route})
  }

  toSubscriptions(){
    this._store$.dispatch(setHomePage({payload:false}))
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['subscriptions'], { relativeTo: this.route })
  }

}
