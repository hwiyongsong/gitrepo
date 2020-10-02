import { AppTestData } from "@app/app-test-data";
import { RepositoryQueryResult } from "@app/entities/repository-query-result";

describe("[ENTITY] RepositoryQueryResult", () => {
  it("should initialize from response data", () => {
    const queryResult = new RepositoryQueryResult("java", 1, 2, AppTestData.REPOSITORY_QUERY_RESPONSE);

    expect(queryResult.searchTerm).toBe("java");
    expect(queryResult.page).toBe(1);
    expect(queryResult.limit).toBe(2);
    expect(queryResult.resultCount).toBe(2);
    expect(queryResult.totalCount).toBe(2352);
    expect(queryResult.repositories.length).toBe(2);
  });

  it("should initialize from without response", () => {
    const queryResult = new RepositoryQueryResult("java", 1, 2);

    expect(queryResult.searchTerm).toBe("java");
    expect(queryResult.page).toBe(1);
    expect(queryResult.limit).toBe(2);
    expect(queryResult.resultCount).toBe(0);
    expect(queryResult.totalCount).toBe(0);
    expect(queryResult.repositories.length).toBe(0);
  });

  it("should have next page if there are more results", () => {
    const queryResult = new RepositoryQueryResult("java", 1, 10);
    queryResult.totalCount = 100;
    queryResult.resultCount = 10;

    expect(queryResult.hasNextPage()).toBeTrue();
  });

  it("should not have next page if there are no more results", () => {
    const queryResult = new RepositoryQueryResult("java", 1, 2, AppTestData.REPOSITORY_QUERY_RESPONSE);
    queryResult.totalCount = 10;
    queryResult.resultCount = 10;

    expect(queryResult.hasNextPage()).toBeFalse();
  });

  it("should have correct result range for first page", () => {
    const queryResult = new RepositoryQueryResult("java", 1, 10, AppTestData.REPOSITORY_QUERY_RESPONSE);
    queryResult.resultCount = 5;

    expect(queryResult.getRangeStart()).toBe(1);
    expect(queryResult.getRangeEnd()).toBe(5);
  });

  it("should have correct result range for non-first page", () => {
    const queryResult = new RepositoryQueryResult("java", 2, 10, AppTestData.REPOSITORY_QUERY_RESPONSE);
    queryResult.resultCount = 7;

    expect(queryResult.getRangeStart()).toBe(11);
    expect(queryResult.getRangeEnd()).toBe(17);
  });
});
