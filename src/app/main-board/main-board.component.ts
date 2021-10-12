import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CardEntity } from '../core/models/card.model';
import { BoardFacade } from '../core/store/board/board.facade';
import { Destroy } from '../shared/services/destroy.service';
import { MainCardComponent } from '../shared/ui/main-card/main-card.component';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class MainBoardComponent implements OnInit, AfterViewInit {
  cards$: Observable<CardEntity[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly boardFacade: BoardFacade,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly $destroy: Destroy
  ) {
    this.cards$ = boardFacade.cards$;
  }

  ngOnInit(): void {
    this.cards$.pipe(tap((c) => console.warn(c))).subscribe();
  }

  ngAfterViewInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.$destroy),
        take(1),
        // first((params) => !!params?.id),
        withLatestFrom(this.cards$),
        map(([{ id }, cards]) => <CardEntity>_.find(cards, { id: +id })),
        tap((card: CardEntity) =>
          !!card
            ? this.dialog.open(MainCardComponent, {
                data: {
                  card,
                },
              })
            : this.router.navigate([], { queryParamsHandling: '' })
        )
      )
      .subscribe();
  }
}
