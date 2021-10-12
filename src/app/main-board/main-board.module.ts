import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CardPreviewModule } from '../shared/ui/card-preview/card-preview.module';
import { MainCardModule } from '../shared/ui/main-card/main-card.module';
import { NewCardModule } from '../shared/ui/new-card/new-card.module';
import { MainBoardComponent } from './main-board.component';
import { FlightLogRouting } from './main-board.routing';

@NgModule({
  declarations: [MainBoardComponent],
  imports: [CommonModule, FlightLogRouting, CardPreviewModule, NgScrollbarModule, FlexModule, NewCardModule, MainCardModule],
})
export class MainBoardModule {}
