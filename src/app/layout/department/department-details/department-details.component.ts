import { RestApiService } from '../../../shared/services/rest-api.service';
import { RestDataService } from './../../../shared/services/rest-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  animations: [routerTransition()],
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  deparmentData = {
    departmentName: '',
    comments: '',
    inCharge: '',
  };

  id: number;
  private sub: any;

constructor(private api: RestApiService, private restDataService: RestDataService, private route: ActivatedRoute) { }

ngOnInit() {
  this.sub = this.route.params.subscribe(params => {
     this.id = +params['id']; // (+) converts string 'id' to a number

     this.api.getDepartmentDetails(this.id )
     .subscribe((res: any) => {
       this.deparmentData = res;
     //  alert("res.."+res);
     }, err => {
       console.log(err);
       // this.toastService.presentToastWithMessage('Internet is not connected')
     });
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

saveDeparmentEvent() {

this.restDataService.saveDepartmentData(this.deparmentData);
}

}
