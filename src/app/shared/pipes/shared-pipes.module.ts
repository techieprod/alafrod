import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupByPipe } from './group-by.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [GroupByPipe]
})
export class SharedPipesModule { }
