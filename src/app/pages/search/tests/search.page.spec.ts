import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AppTestData } from "@app/app-test-data";
import { RepositoryQueryResult } from "@app/entities/repository-query-result";
import { SearchPage } from "@app/pages/search/search.page";
import { GithubService } from "@app/services/github.service";
import { LoadingController, ModalController } from "@ionic/angular";
import { of } from "rxjs";

describe("[PAGE] SearchPage", () => {
  let fixture: ComponentFixture<SearchPage>;
  let searchPage: SearchPage;
  let debugElement: DebugElement;
  let routerSpy: any;
  let loadingControllerSpy: any;
  let modalControllerSpy: any;
  let githubServiceSpy: any;
  let searchbarSpy: any;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    loadingControllerSpy = jasmine.createSpyObj("LoadingController", ["create"]);
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["create"]);
    githubServiceSpy = jasmine.createSpyObj("GithubService", ["queryRepositories"]);
    searchbarSpy = jasmine.createSpyObj("Searchbar", ["setFocus"]);

    loadingControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    }));

    modalControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    }));

    const activatedRouteStub = {
      snapshot: {
        queryParamMap: {
          get: (key: string) => ""
        }
      }
    };

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SearchPage],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: LoadingController, useValue: loadingControllerSpy},
        {provide: ModalController, useValue: modalControllerSpy},
        {provide: GithubService, useValue: githubServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPage);
    searchPage = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    // The searchbar gets initialized via ViewChild which doesn't work in jasmine testing.
    // Replace it with a spy object.
    searchPage.searchbar = searchbarSpy;
  });

  it("should create page", fakeAsync(() => {
    expect(searchPage).toBeTruthy();
  }));

  it("should show query results on search", fakeAsync(() => {
    const searchTerm = "java";
    const page = 1;
    const limit = 10;

    const mockQueryResult = new RepositoryQueryResult(searchTerm, page, limit, AppTestData.REPOSITORY_QUERY_RESPONSE);
    githubServiceSpy.queryRepositories.and.returnValue(of(mockQueryResult));

    // Run the search query.
    searchPage.onSearchTermChange("java");
    flushMicrotasks();
    fixture.detectChanges();

    expect(searchPage.queryResult.resultCount).toBe(2);

    const tableRows = debugElement.queryAll(By.css(".data-table tr"));
    const firstRow = tableRows[1]; // We skip index 0 since that's the table header.

    expect(firstRow.query(By.css(".data-table__repo-name")).nativeElement.innerText).toBe("spark");
    expect(firstRow.query(By.css(".data-table__owner-name")).nativeElement.innerText).toBe("apache");
    expect(firstRow.query(By.css(".data-table__star-count")).nativeElement.innerText).toBe("27,594");
    expect(firstRow.query(By.css(".data-table__repo-url a")).nativeElement.innerText).toBe("apache/spark");
  }));

  it("should paginate to next and back", fakeAsync(() => {
    const mockQueryResult = new RepositoryQueryResult("java", 1, 10, AppTestData.REPOSITORY_QUERY_RESPONSE);
    githubServiceSpy.queryRepositories.and.returnValue(of(mockQueryResult));

    // Run the search query.
    searchPage.onSearchTermChange("java");
    flushMicrotasks();

    searchPage.onNextPage();
    flushMicrotasks();

    expect(searchPage.page).toBe(2);

    searchPage.onPrevPage();
    flushMicrotasks();

    expect(searchPage.page).toBe(1);
  }));

  it("should open modal on repository detail", fakeAsync(() => {
    const mockQueryResult = new RepositoryQueryResult("java", 1, 10, AppTestData.REPOSITORY_QUERY_RESPONSE);
    githubServiceSpy.queryRepositories.and.returnValue(of(mockQueryResult));

    modalControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    }));

    // Run the search query.
    searchPage.searchbar = searchbarSpy;
    searchPage.onSearchTermChange("java");
    flushMicrotasks();
    fixture.detectChanges();

    const firstRepository = mockQueryResult.repositories[0];
    searchPage.onRepositoryDetails(firstRepository);
    flushMicrotasks();

    expect(modalControllerSpy.create.calls.count()).toBe(1);
  }));
});
