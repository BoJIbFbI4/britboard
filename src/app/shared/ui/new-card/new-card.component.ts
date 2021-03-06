import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainCardComponent } from '../main-card/main-card.component';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCardComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  triggerCardCreation = () => this.dialog.open(MainCardComponent);
}
