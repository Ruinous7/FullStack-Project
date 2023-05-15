// Angular Modules
import {  Component , ChangeDetectionStrategy, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// NgRx Modules
import { Store } from '@ngrx/store';
import { State } from '../reducers'
import { Observable } from 'rxjs';
import { isLoggedOut, setContentPage, setHomePage, setManager, setMembers, setMovies } from '../reducers/app.actions'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  // Injecting the services into the to app component
  constructor(private _store$ : Store<State> , private http: HttpClient , private router : Router ){
  }

  // User's Input and Authenticating Variables

  usernameInput: any = {username: null, password:null }
  users : any[] = []
  managingUser : any = {}
  error: string = ""

  // Fetching the site users from the database

  ngOnInit(){
    this.http.get<any>("http://localhost:8000/users").subscribe(data => this.users=data)
    this._store$.dispatch(setHomePage({payload:true}))
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(isLoggedOut({payload:true}))
  }


  checkInput(userIn : any , passIn: any){

    // Checking if the user has entered valid credentials

    // If true :

    this.users.find(user=>{if(user.username==this.usernameInput.username&&user.password==this.usernameInput.password){

      // Sending our store and the app's main component the managing user who has logged in th system
      this.managingUser = user
      this._store$.dispatch(setManager({payload:this.managingUser}))
      this._store$.dispatch(isLoggedOut({payload:false}))
      // Fetching the movies from the database and dispatching it to the store
      this.http.get<any>("http://localhost:8000/movies").subscribe( (data) => this._store$.dispatch(setMovies({payload:data})))
      // Navigating Home
      this.router.navigate(["/home"])

    // ELSE :

    } else {

      // Displaying Error Message

      this.error="Username or Password are incorrect"
      userIn.classList="form-control is-invalid"
      userIn.id="floatingInputInvalid"
      passIn.classList="form-control is-invalid"
      passIn.id="floatingInputInvalid"

    }})
  }

}
