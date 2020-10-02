import { Repository } from "@app/entities/repository";

export class RepositoryQueryResult {

  public searchTerm: string;
  public page: number;
  public limit: number;
  public resultCount: number = 0;
  public totalCount: number = 0;
  public repositories: Array<Repository> = [];

  constructor(searchTerm: string, page: number, limit: number, responseData?: any) {
    this.searchTerm = searchTerm;
    this.page = page;
    this.limit = limit;

    if (responseData) {
      this.repositories = responseData.items.map((itemData) => new Repository(itemData));
      this.totalCount = responseData.total_count;
      this.resultCount = this.repositories.length;
    }
  }

  getRangeStart() {
    const pageIndex = this.page - 1;
    return pageIndex * this.limit + 1;
  }

  getRangeEnd() {
    const pageIndex = this.page - 1;
    return pageIndex * this.limit + this.resultCount;
  }

  hasNextPage() {
    return this.getRangeEnd() < this.totalCount;
  }

  hasPrevPage() {
    return this.page > 1;
  }

}
