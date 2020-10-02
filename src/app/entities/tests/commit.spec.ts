import { AppTestData } from "@app/app-test-data";
import { Commit } from "@app/entities/commit";

describe("[ENTITY] Commit", () => {
  it("should initialize from response data", () => {
    const commit = new Commit(AppTestData.COMMIT_RESPONSE);

    expect(commit.sha).toBe("e62d24717eb774f1c7adfd0fbe39640b96bc661d");
    expect(commit.authorName).toBe("ulysses");
  });
});
