import { AppSettingService } from './../../shared/services/app-setting.service';
import { RestApiService } from './../../shared/services/rest-api.service';
import { CustomModelService } from './../../shared/services/custom-model.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-close-day',
    templateUrl: './close-day.component.html',
    styleUrls: ['./close-day.component.css']
})
export class CloseDayComponent implements OnInit {

    billDate;


    constructor(public restApiService: RestApiService, public appSettingService: AppSettingService, public customModelService: CustomModelService
    ) {

        this.billDate = this.appSettingService.globelBillDate;
    }

    ngOnInit() {

    }
}
