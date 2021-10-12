import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CardEntity } from '../core/models/card.model';
import { BoardFacade } from '../core/store/board/board.facade';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBoardComponent implements OnInit {
  cards$: Observable<CardEntity[]>;

  constructor(private readonly boardFacade: BoardFacade) {
    this.cards$ = boardFacade.cards$;
  }

  ngOnInit(): void {
    this.cards$.pipe(tap((c) => console.warn(c))).subscribe();
  }
}
