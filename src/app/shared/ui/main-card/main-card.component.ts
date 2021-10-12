import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { CardEntity } from '../../../core/models/card.model';
import { BoardFacade } from '../../../core/store/board/board.facade';
import { Destroy } from '../../services/destroy.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
  viewProviders: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCardComponent implements OnInit, AfterViewInit, OnDestroy {
  cardForm = new FormGroup({}, { updateOn: 'change' });
  authorControl = new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]);
  contentControl = new FormControl('', { validators: [Validators.required, Validators.maxLength(800)] });
  isEditMode: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<MainCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: CardEntity } | undefined,
    private readonly _fb: FormBuilder,
    private readonly boardFacade: BoardFacade,
    private readonly matSnackBar: MatSnackBar,
    private readonly $destroy: Destroy,
    private readonly router: Router
  ) {
    this.cardForm = _fb.group({
      author: this.authorControl,
      content: this.contentControl,
    });

    if (data?.card) {
      this.authorControl.setValue(data.card.author_name);
      this.contentControl.setValue(data.card.content);
    } else {
      this.isEditMode = true;
    }
  }

  onPost(): void {
    const card = {
      ...this.data?.card,
      content: this.contentControl.value,
      author_name: this.authorControl.value,
      create_time: this.data?.card.create_time || new Date().toISOString(),
      update_time: '',
      id: this.data?.card.id || new Date().valueOf(),
    };
    !this.data?.card ? this.boardFacade.addCard(card) : this.boardFacade.changeCard(card);
  }

  ngOnInit(): void {
    this.boardFacade.cardChanged$
      .pipe(
        tap(() => {
          this.dialogRef.close(true);
          this.matSnackBar.open('Card edit success', '', { duration: 3000 });
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();

    this.boardFacade.cardRemoved$
      .pipe(
        tap(() => {
          this.dialogRef.close(true);
          this.matSnackBar.open('Card removed', '', { duration: 3000 });
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();

    this.boardFacade.cardAdded$
      .pipe(
        tap(() => {
          this.dialogRef.close(true);
          this.matSnackBar.open('Card created success', '', { duration: 3000 });
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();
  }

  requestDelete = () => this.boardFacade.removeCard(<CardEntity>this.data?.card);

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.router.navigate([], { queryParamsHandling: '' });
  }
}
