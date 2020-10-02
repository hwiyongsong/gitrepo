import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppTestData } from "@app/app-test-data";
import { Commit } from "@app/entities/commit";
import { Fork } from "@app/entities/fork";
import { Repository } from "@app/entities/repository";
import { User } from "@app/entities/user";
import { RepoDetailModal } from "@app/modals/repo-detail/repo-detail.modal";
import { GithubService } from "@app/services/github.service";
import { LoadingController, ModalController } from "@ionic/angular";
import { of } from "rxjs";

describe("[MODAL] RepoDetailModal", () => {
  let fixture: ComponentFixture<RepoDetailModal>;
  let repoDetailModal: RepoDetailModal;
  let debugElement: DebugElement;
  let loadingControllerSpy: any;
  let modalControllerSpy: any;
  let githubServiceSpy: any;

  beforeEach(async () => {
    loadingControllerSpy = jasmine.createSpyObj("LoadingController", ["create"]);
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["create"]);
    githubServiceSpy = jasmine.createSpyObj("GithubService", ["queryLastCommits", "queryLastForks", "getUserDetail"]);

    loadingControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    }));

    modalControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    }));

    const last3CommitsMock = AppTestData.LAST_3_COMMITS_RESPONSE.map((reponseData) => new Commit(reponseData));
    const lastForkMock = AppTestData.LAST_FORK_RESPONSE.map((reponseData) => new Fork(reponseData));
    const userDetailMock = new User(AppTestData.USER_RESPONSE);

    githubServiceSpy.queryLastCommits.and.returnValue(of(last3CommitsMock));
    githubServiceSpy.queryLastForks.and.returnValue(of(lastForkMock));
    githubServiceSpy.getUserDetail.and.returnValue(of(userDetailMock));

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RepoDetailModal],
      providers: [
        {provide: LoadingController, useValue: loadingControllerSpy},
        {provide: ModalController, useValue: modalControllerSpy},
        {provide: GithubService, useValue: githubServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailModal);
    debugElement = fixture.debugElement;
    repoDetailModal = fixture.componentInstance;
    repoDetailModal.repository = new Repository(AppTestData.REPOSITORY_RESPONSE);

    fixture.detectChanges();
  });

  it("should create modal", fakeAsync(() => {
    expect(repoDetailModal).toBeTruthy();
  }));

  it("should show last 3 commits", fakeAsync(() => {
    repoDetailModal.ngOnInit();
    flushMicrotasks();
    fixture.detectChanges();

    const commitLines = debugElement.queryAll(By.css(".commits li"));

    expect(commitLines.length).toBe(3);
  }));

  it("should show last fork", fakeAsync(() => {
    repoDetailModal.ngOnInit();
    flushMicrotasks();
    fixture.detectChanges();

    const forkLines = debugElement.queryAll(By.css(".forks li"));

    expect(forkLines.length).toBe(1);
  }));

  it("should show user biography", fakeAsync(() => {
    repoDetailModal.ngOnInit();
    flushMicrotasks();
    fixture.detectChanges();

    const userBiography = debugElement.query(By.css(".user-detail__bio")).nativeElement.innerText;

    expect(userBiography).toBe("Yahoo is a Verizon Media brand.");
  }));
});
