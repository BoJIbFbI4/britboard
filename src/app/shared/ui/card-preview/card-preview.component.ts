import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardEntity } from '../../../core/models/card.model';
import { MainCardComponent } from '../main-card/main-card.component';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPreviewComponent implements OnInit {
  @Input() card!: CardEntity;

  constructor(private readonly dialog: MatDialog, private readonly router: Router) {}

  ngOnInit(): void {}

  openCard = (card: CardEntity) =>
    this.router.navigate([], { queryParams: { id: card!.id } }).then(() =>
      this.dialog.open(MainCardComponent, {
        data: {
          card,
        },
      })
    );
}
