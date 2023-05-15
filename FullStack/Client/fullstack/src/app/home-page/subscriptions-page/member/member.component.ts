// Angular Modules
import {  Component , ChangeDetectionStrategy , Input, Output , EventEmitter, SimpleChanges } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal ,  ModalDismissReasons, NgbDatepickerModule, } from '@ng-bootstrap/ng-bootstrap';
// NgRx Modules
import { Store , select } from '@ngrx/store';
import { Observable, from, pipe, fromEvent } from 'rxjs';
import { map, filter, tap, subscribeOn } from 'rxjs/operators'
import { State } from 'src/app/reducers';
import { addSubscriptions, deleteMember, deleteMovie, nowEditing, setAddPage, setContentPage, setEditPage } from 'src/app/reducers/app.actions';
// Other
import { DateRangePicker } from '@syncfusion/ej2-calendars';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  // Defining the NgRx Store

  storeData$ : Observable<any> = this._store$.pipe(
    select('app')
  )

  // Fetching Data from Parent Comp

  @Input()
  member : any = {}

  // General Member Variables

  subscriptions : any = []
  moviesDB : any = []
  movies : any = {watched : [] , unWatched: []}

  memberActive : boolean = true
  subscriptionObj: any = {
    id: 0,
    movieID: 0,
    memberID: 0,
    date: ""
  }

  closeResult = '';

  constructor(private _store$ : Store<State> , private http: HttpClient , public router : Router, public route: ActivatedRoute , private modalService: NgbModal){

    this.storeData$.subscribe(data=>{
      this.moviesDB = JSON.parse(JSON.stringify(data.movies))
      this.movies.unWatched = JSON.parse(JSON.stringify(data.movies))
      this.subscriptions = JSON.parse(JSON.stringify(data.subscriptions))
    })

  }

  // Subscriptions Functions

  addSubscriptionFunc(fillAlert,movieID){
    this.subscriptionObj.memberID=this.member.id
    if(this.subscriptionObj.movieID==0||this.subscriptionObj.date==""){
      this.openSubscriptionAlert(fillAlert)
    } else {
      const uid = () =>
        String(
          Date.now() +
          Math.random()
        ).replace(/\./g, '')
      this.subscriptionObj.id = uid()
      this.subscriptionObj.movieID = movieID
      this.subscriptions.push(this.subscriptionObj)
      this._store$.dispatch(addSubscriptions({payload:this.subscriptions}))
      this.http.post<any>("http://localhost:8000/subscriptions",this.subscriptionObj).subscribe(data=>console.log(data))
      this.toMembers()
    }
  }

  openSubscriptionAlert(deleteContent){
		this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // to Edit Subscribed Movies

  toEditMovie(id,payload){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(nowEditing({payload:payload}))
    this.router.navigate([`home/movies/edit/${id}`])
  }

  // to Edit Member

  toEditMember(id){
    this._store$.dispatch(setContentPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(nowEditing({payload:this.member}))
    this.router.navigate([`edit/${id}`] ,{relativeTo:this.route})
  }

  // to Delete Functions

  toDeleteMember(id){
    this._store$.dispatch(deleteMember({payload:id}))
    this.http.delete<any>(`http://localhost:8000/members/${id}`).subscribe( data => console.log(data) )
    this.router.navigate(['home/subscriptions'])
  }

  open(deleteContent) {
		this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // to Members

  toMembers(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/subscriptions'])
  }

  ngOnInit(){
    // Managing the subscriptions data of the member
    this.moviesDB.forEach((movie,index)=>{
      this.subscriptions.find(sub=>{
        if(sub.memberID==this.member.id&&sub.movieID==movie.id){
          let watchedMovie : any = {
            mainData : movie ,
            subscriptionData : sub,
          }
          this.movies.watched.push(watchedMovie)
        }
      })

    })
    this.movies.watched.forEach((watched)=>{
      this.movies.unWatched.forEach((unWatched,index)=>{
        if(watched.mainData.id==unWatched.id){
          this.movies.unWatched.splice(index,1)
        }
      })
    })
  }

}
