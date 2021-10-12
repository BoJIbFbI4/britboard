import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LayoutModule } from './core/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<any> => import('./main-board/main-board.module').then((modules) => modules.MainBoardModule),
      },
    ],
  },
  /*ADD NOT FOUND PAGE etc...*/
  // {
  //   path: '**',
  // loadChildren: (): Promise<any> => import().then((modules) => modules.NotFoundPageModule),
  // },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
