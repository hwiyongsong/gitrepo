import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Commit } from "@app/entities/commit";
import { Fork } from "@app/entities/fork";
import { Repository } from "@app/entities/repository";
import { RepositoryQueryResult } from "@app/entities/repository-query-result";
import { User } from "@app/entities/user";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GithubService {

  public static readonly SEARCH_REPOSITORY_ENDPOINT = "https://api.github.com/search/repositories";
  public static readonly QUERY_PARAM = "q";
  public static readonly PAGE_PARAM = "page";
  public static readonly LIMIT_PARAM = "per_page";
  public static readonly SORT_PARAM = "sort";
  public static readonly ORDER_PARAM = "order";

  constructor(private httpClient: HttpClient) {
  }

  queryRepositories(searchTerm: string, page: number = 1, limit: number = 10): Observable<RepositoryQueryResult> {
    const searchable = searchTerm && page > 0 && limit > 0;

    if (searchable) {
      const url = GithubService.SEARCH_REPOSITORY_ENDPOINT;
      const params = new HttpParams().set(GithubService.QUERY_PARAM, searchTerm)
                                     .set(GithubService.PAGE_PARAM, page.toString())
                                     .set(GithubService.LIMIT_PARAM, limit.toString())
                                     .set(GithubService.SORT_PARAM, "stars")
                                     .set(GithubService.ORDER_PARAM, "desc");

      const body = {
        "params": params
      };

      return this.httpClient.get(url, body).pipe((map((responseData: any) => {
        return new RepositoryQueryResult(searchTerm, page, limit, responseData);
      })));
    } else {
      const emptyResult = new RepositoryQueryResult(searchTerm, page, limit);
      return of(emptyResult);
    }
  }

  queryLastCommits(repository: Repository, limit: number = 3): Observable<Array<Commit>> {
    const endpoint = repository.commitsUrl;
    const params = new HttpParams().set(GithubService.LIMIT_PARAM, limit.toString());
    const body = {
      "params": params
    };

    return this.httpClient.get(endpoint, body).pipe((map((responseData: Array<any>) => {
      return responseData.map((commitData) => new Commit(commitData));
    })));
  }

  queryLastForks(repository: Repository, limit: number = 1): Observable<Array<Fork>> {
    const endpoint = repository.forksUrl;
    const params = new HttpParams().set(GithubService.LIMIT_PARAM, limit.toString());
    const body = {
      "params": params
    };

    return this.httpClient.get(endpoint, body).pipe((map((responseData: Array<any>) => {
      return responseData.map((forkData) => new Fork(forkData));
    })));
  }

  getUserDetail(user: User): Observable<User> {
    const endpoint = user.detailUrl;

    return this.httpClient.get(endpoint).pipe((map((responseData: any) => new User(responseData))));
  }

}
