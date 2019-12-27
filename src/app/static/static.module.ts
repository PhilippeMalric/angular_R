import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { QuestionComponent } from './question/question.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';

import { StatutReglementComponent } from './statut-reglement/statut-reglement.component';
import { ManifesteComponent } from './manifeste/manifeste.component';
import { TibbleComponent } from '@app/examples/tibble/tibble.component';
import { MatChipsModule } from '@angular/material';



@NgModule({
  imports: [SharedModule,
     StaticRoutingModule,
     MatTableModule,
     MatPaginatorModule,
     MatStepperModule,
     MatListModule,
     MatChipsModule],
  declarations: [AboutComponent,
    FeaturesComponent,
    QuestionComponent,
    StatutReglementComponent,
    ManifesteComponent,
    TibbleComponent]
})
export class StaticModule {}
