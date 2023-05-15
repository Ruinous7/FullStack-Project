// Angular Modules
import {  Component , HostListener  } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// NgRx Modules
import { Store , select } from '@ngrx/store';
import { Observable,  } from 'rxjs';
import { State } from 'src/app/reducers';
import { setAddPage, setContentPage, setEditPage } from 'src/app/reducers/app.actions';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent {

  // Setting up a host listener for tracking URl movements from the browser buttons.

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(window.location.pathname===`/home/subscriptions/edit/${this.nowEditing.id}`) {
      this._store$.dispatch(setContentPage({payload:false}))
      this._store$.dispatch(setEditPage({payload:true}))
      this._store$.dispatch(setAddPage({payload:false}))
      console.log("setting edit page" , window.location.pathname)
      return
    }
    if(window.location.pathname==="/home/subscriptions/add") {
      this._store$.dispatch(setContentPage({payload:false}))
      this._store$.dispatch(setEditPage({payload:false}))
      this._store$.dispatch(setAddPage({payload:true}))
      console.log("setting add page" , window.location.pathname)
      return
    }
  }

  // Defining the NgRx Store

  storeData$ : Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Members Page Variables

  members : any
  allContentPage : any
  editPage : any
  addPage : any
  nowEditing : any

  constructor(private _store$ : Store<State> ,  public router : Router, public route: ActivatedRoute){

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.members = JSON.parse(JSON.stringify(data.members))
      this.allContentPage = data.contentPage
      this.editPage = data.editPage
      this.addPage = data.addPage
      this.nowEditing = data.nowEditing
    })
  }

  // Navigation Functions

  toMembers(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/subscriptions'])
  }

  toAddMember(){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setAddPage({payload:true}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['add'] ,{relativeTo:this.route})
  }



}
