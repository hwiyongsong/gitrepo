import { Component, Input, OnInit } from "@angular/core";
import { GithubService } from "@app/services/github.service";
import { Commit } from "@app/entities/commit";
import { Fork } from "@app/entities/fork";
import { Repository } from "@app/entities/repository";
import { User } from "@app/entities/user";
import { LoadingController, ModalController } from "@ionic/angular";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-repo-detail-modal",
  templateUrl: "./repo-detail.modal.html",
  styleUrls: ["./repo-detail.modal.scss"],
})
export class RepoDetailModal implements OnInit {

  private static readonly COMMIT_FETCH_LIMIT = 3;
  private static readonly FORK_FETCH_LIMIT = 1;

  @Input() repository: Repository;

  public lastCommits: Array<Commit> = [];
  public lastForks: Array<Fork> = [];
  public ownerDetail: User;
  public loaded: boolean;
  public errored: boolean;

  constructor(private loadingController: LoadingController,
              private modalController: ModalController,
              private githubService: GithubService) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      showBackdrop: false
    });

    loading.present().then(() => {
      // Fetch the data as all-or-nothing, so we don't show incomplete data to the user.
      const sequence = forkJoin([
        this.githubService.queryLastCommits(this.repository, RepoDetailModal.COMMIT_FETCH_LIMIT),
        this.githubService.queryLastForks(this.repository, RepoDetailModal.FORK_FETCH_LIMIT),
        this.githubService.getUserDetail(this.repository.owner)
      ]);

      sequence.subscribe(([lastCommits, lastForks, ownerDetail]) => {
        this.lastCommits = lastCommits;
        this.lastForks = lastForks;
        this.ownerDetail = ownerDetail;
        this.loaded = true;

        loading.dismiss();
      }, (error) => {
        this.errored = true;

        loading.dismiss();
      });
    });
  }

  async onClose() {
    await this.modalController.dismiss();
  }

}
