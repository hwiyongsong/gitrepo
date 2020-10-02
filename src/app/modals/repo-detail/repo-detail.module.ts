import { NgModule } from "@angular/core";
import { AppCommonModule } from "@app/app-common.module";
import { RepoDetailModal } from "@app/modals/repo-detail/repo-detail.modal";

@NgModule({
  imports: [
    AppCommonModule
  ],
  exports: [],
  declarations: [
    RepoDetailModal
  ],
  entryComponents: [
    RepoDetailModal
  ]
})
export class RepoDetailModalModule {
}
