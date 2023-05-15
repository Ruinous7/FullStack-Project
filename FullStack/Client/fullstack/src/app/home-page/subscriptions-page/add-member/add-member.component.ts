// Angular Modules
import { Component} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// NgRx Modules
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { addMember, setAddPage, setContentPage, setEditPage, } from 'src/app/reducers/app.actions';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {


  // Defining the NgRx Store

  storeData$: Observable<any> = this._store$.pipe(
    select('app')
  )

  // General Variables

  members : any = []
  closeResult = '';

  constructor(private _store$: Store<State>, private http: HttpClient, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) {

    // Subscribing to the Store

    this.storeData$.subscribe(data => {
      this.members = [...data.members]
    })

  }

  // New Member Obj


  memberObj : any = {
    id: 0,
    name: "",
    email: "",
    city: "",
  }

   // Modal for filling in Relevant Information

  open(deleteContent) {
		this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
	}

  // Adding the New Member to the store and the database

  add(fillAlert){
    if(this.memberObj.name==""||this.memberObj.email==""||this.memberObj.city==""){
      this.open(fillAlert)
    } else {
      const uid = () =>
        String(
          Date.now() +
          Math.random()
        ).replace(/\./g, '')
      this.memberObj.id = uid()
      this.members.push(this.memberObj)
      this._store$.dispatch(addMember({payload: this.members}))
      this.http.post<any>("http://localhost:8000/members",this.memberObj).subscribe(data=>console.log(data))
      this.toMembers()
    }
  }

  // to Members Homepage

  toMembers(){
    this._store$.dispatch(setContentPage({payload:true}))
    this._store$.dispatch(setAddPage({payload:false}))
    this._store$.dispatch(setEditPage({payload:false}))
    this.router.navigate(['home/subscriptions'])
  }




}
