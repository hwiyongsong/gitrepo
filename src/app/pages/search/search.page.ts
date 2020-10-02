import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Repository } from "@app/entities/repository";
import { RepositoryQueryResult } from "@app/entities/repository-query-result";
import { RepoDetailModal } from "@app/modals/repo-detail/repo-detail.modal";
import { GithubService } from "@app/services/github.service";
import { LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: "app-search-page",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {

  private static readonly SEARCH_TERM_REQUEST_PARAM = "term";
  private static readonly PAGE_REQUEST_PARAM = "page";

  @ViewChild("searchbar") searchbar: any;

  public searchTerm: string;
  public page: number;
  public queryResult: RepositoryQueryResult;
  public errored: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingController: LoadingController,
              private modalController: ModalController,
              private githubService: GithubService) {
  }

  ngOnInit() {
    const requestParamMap = this.activatedRoute.snapshot.queryParamMap;
    const searchTerm = requestParamMap.get(SearchPage.SEARCH_TERM_REQUEST_PARAM);
    const page = Number(requestParamMap.get(SearchPage.PAGE_REQUEST_PARAM)) || 1;  // Default to Page 1 if not exists.

    if (searchTerm) {
      this.doQuery(searchTerm, page);
    }
  }

  onSearchTermChange(searchTerm: string) {
    this.doQuery(searchTerm, 1);
  }

  onNextPage() {
    this.doQuery(this.searchTerm, this.page + 1);
  }

  onPrevPage() {
    // If this is the first page, there is no previous page, so ignore this call.
    if (this.page === 1) {
      return;
    }

    this.doQuery(this.searchTerm, this.page - 1);
  }

  async onRepositoryDetails(repository: Repository) {
    const modal = await this.modalController.create({
      component: RepoDetailModal,
      componentProps: {
        "repository": repository
      }
    });

    return await modal.present();
  }

  private async doQuery(searchTerm: string, page: number) {
    const loading = await this.loadingController.create({
      showBackdrop: false
    });

    loading.present().then(() => {
      this.errored = false;
      this.queryResult = null;

      const sequence = this.githubService.queryRepositories(searchTerm, page);

      sequence.subscribe((queryResult) => {
        // It's possible that there is a race condition if another query is made before the previous one completes.
        // Check to make sure this query result is for the current keyword.
        if (queryResult.searchTerm === searchTerm) {
          this.queryResult = queryResult;
          this.searchTerm = searchTerm;
          this.page = page;
          this.updateRequestParams(searchTerm, page);
        }

        loading.dismiss().then(() => {
          this.searchbar.setFocus();
        });
      }, (error) => {
        this.errored = true;

        loading.dismiss().then(() => {
          this.searchbar.setFocus();
        });
      });
    });
  }

  private updateRequestParams(searchTerm: string, page: number) {
    const requestParams = {};
    requestParams[SearchPage.SEARCH_TERM_REQUEST_PARAM] = searchTerm;
    requestParams[SearchPage.PAGE_REQUEST_PARAM] = page;

    this.router.navigate([], {
      queryParams: requestParams,
      queryParamsHandling: "merge"
    });
  }

}
