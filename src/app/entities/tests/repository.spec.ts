import { AppTestData } from "@app/app-test-data";
import { Repository } from "@app/entities/repository";

describe("[ENTITY] Repository", () => {
  it("should initialize from response data", () => {
    const repository = new Repository(AppTestData.REPOSITORY_RESPONSE);

    expect(repository.name).toBe("spark");
    expect(repository.fullName).toBe("apache/spark");
    expect(repository.owner.name).toBe("apache");
    expect(repository.detailUrl).toBe("https://github.com/apache/spark");
    expect(repository.commitsUrl).toBe("https://api.github.com/repos/apache/spark/commits");
    expect(repository.forksUrl).toBe("https://api.github.com/repos/apache/spark/forks");
    expect(repository.starCount).toBe(27594);
  });
});
