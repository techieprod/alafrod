import { AppSettingService } from './../../../shared/services/app-setting.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { ControlModel } from 'src/app/shared/model/control-model';
import * as moment from 'moment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    currentDate = new Date();
    public clock: Observable<Date>;

    bilDate;
    isTwelveHrFormat: false;


    constructor(private translate: TranslateService, public router: Router, public restApiService: RestApiService,
        public appSettingService: AppSettingService) {
        this.getControlData();



        this.clock = interval(1000).pipe(map(() => new Date())
        );

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }


    ngOnInit() {
        this.pushRightClass = 'push-right';
        // console.log('this.controlModel.lastClosedDate..' + this.controlModel.lastClosedDate);
        //  = this.controlModel.lastClosedDate;
    }


    async getControlData() {
        this.restApiService.getControllData()
            .subscribe((res: ControlModel) => {
                if (res != null) {

                    this.appSettingService.controlModel = res;
                    this.appSettingService.globelBillDate = moment(this.appSettingService.controlModel.lastClosedDate)
                    .add(1, 'days').format('YYYY-MM-DD');
                }
            }, err => {
                console.log(err);
            });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
