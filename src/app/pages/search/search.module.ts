import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonModule } from "@app/app-common.module";
import { RepoDetailModalModule } from "@app/modals/repo-detail/repo-detail.module";
import { SearchPage } from "@app/pages/search/search.page";

const routes: Routes = [
  {
    path: "",
    component: SearchPage
  }
];

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
    RepoDetailModalModule
  ],
  exports: [],
  declarations: [
    SearchPage
  ],
  entryComponents: []
})
export class SearchPageModule {
}
