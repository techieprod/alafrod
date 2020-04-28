import { BillCancelModule } from './layout/bill-cancel/bill-cancel.module';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { EnvConfigService } from './shared/services/env-config.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from './shared/custom-formatter/dateformat';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



const appInitializerFn = (appConfig: EnvConfigService) => {
    return () => {
      return appConfig.loadAppConfig();
    };
  };


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        DataTablesModule,
        FormsModule,
        BillCancelModule,
        SweetAlert2Module.forRoot(),
        NgbModule



    ],
    declarations: [AppComponent],
    providers: [AuthGuard,
     {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [EnvConfigService]
      },
      {provide: NgbDateAdapter, useClass: CustomAdapter},
      {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}, NgbActiveModal, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
