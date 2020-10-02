import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { AppTestData } from "@app/app-test-data";
import { Repository } from "@app/entities/repository";
import { User } from "@app/entities/user";
import { GithubService } from "@app/services/github.service";

describe("[SERVICE] GithubService", () => {
  let testBed: TestBed;
  let githubService: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    testBed = getTestBed();
    httpMock = testBed.inject(HttpTestingController);
    githubService = testBed.inject(GithubService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should return repositories for valid search term", () => {
    const searchTerm = "java";
    const page = 1;
    const limit = 10;

    githubService.queryRepositories(searchTerm, page, limit).subscribe(queryResult => {
      expect(queryResult.searchTerm).toBe(searchTerm);
      expect(queryResult.page).toBe(page);
      expect(queryResult.limit).toBe(limit);
      expect(queryResult.resultCount).toBe(2);
      expect(queryResult.totalCount).toBe(2352);
      expect(queryResult.repositories[0]).toBeTruthy();
      expect(queryResult.repositories[0].name).toBe("spark");
      expect(queryResult.repositories[0].fullName).toBe("apache/spark");
      expect(queryResult.repositories[0].owner).toBeTruthy();
      expect(queryResult.repositories[0].owner.name).toBe("apache");
      expect(queryResult.repositories[0].detailUrl).toBe("https://github.com/apache/spark");
      expect(queryResult.repositories[0].commitsUrl).toBe("https://api.github.com/repos/apache/spark/commits");
      expect(queryResult.repositories[0].forksUrl).toBe("https://api.github.com/repos/apache/spark/forks");
      expect(queryResult.repositories[0].starCount).toBe(27594);
    });

    const endpoint = "https://api.github.com/search/repositories?q=java&page=1&per_page=10&sort=stars&order=desc";
    const request = httpMock.expectOne(endpoint);

    expect(request.request.method).toBe("GET");

    request.flush(AppTestData.REPOSITORY_QUERY_RESPONSE);
  });

  it("should return no repository for empty search term", () => {
    const searchTerm = "";
    const page = 1;
    const limit = 10;

    githubService.queryRepositories(searchTerm, page, limit).subscribe(queryResult => {
      expect(queryResult.searchTerm).toBe(searchTerm);
      expect(queryResult.page).toBe(page);
      expect(queryResult.limit).toBe(limit);
      expect(queryResult.resultCount).toBe(0);
      expect(queryResult.totalCount).toBe(0);
      expect(queryResult.repositories.length).toBe(0);
    });

    const endpoint = "https://api.github.com/search/repositories?q=&page=1&per_page=10&sort=stars&order=desc";
    const request = httpMock.expectNone(endpoint);
  });

  it("should return 3 commits", () => {
    const repository = new Repository();
    repository.commitsUrl = "https://api.github.com/repos/apache/spark/commits";

    const limit = 3;

    githubService.queryLastCommits(repository, limit).subscribe(commits => {
      expect(commits.length).toBe(3);
      expect(commits[0].sha).toBe("e62d24717eb774f1c7adfd0fbe39640b96bc661d");
      expect(commits[0].authorName).toBe("ulysses");
    });

    const endpoint = "https://api.github.com/repos/apache/spark/commits?per_page=3";
    const request = httpMock.expectOne(endpoint);

    expect(request.request.method).toBe("GET");

    request.flush(AppTestData.LAST_3_COMMITS_RESPONSE);
  });

  it("should return 1 fork", () => {
    const repository = new Repository();
    repository.forksUrl = "https://api.github.com/repos/apache/spark/forks";

    const limit = 1;

    githubService.queryLastForks(repository, limit).subscribe(forks => {
      expect(forks.length).toBe(1);
      expect(forks[0].name).toBe("spark");
      expect(forks[0].fullName).toBe("n-marion/spark");
      expect(forks[0].owner.name).toBe("n-marion");
    });

    const endpoint = "https://api.github.com/repos/apache/spark/forks?per_page=1";
    const request = httpMock.expectOne(endpoint);

    expect(request.request.method).toBe("GET");

    request.flush(AppTestData.LAST_FORK_RESPONSE);
  });

  it("should return user detail", () => {
    const user = new User();
    user.detailUrl = "https://api.github.com/users/apache";

    githubService.getUserDetail(user).subscribe(userDetail => {
      expect(userDetail.name).toBe("yahoo");
      expect(userDetail.bio).toBe("Yahoo is a Verizon Media brand.");
    });

    const endpoint = "https://api.github.com/users/apache";
    const request = httpMock.expectOne(endpoint);

    expect(request.request.method).toBe("GET");

    request.flush(AppTestData.USER_RESPONSE);
  });
});
