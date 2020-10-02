import { AppTestData } from "@app/app-test-data";
import { Fork } from "@app/entities/fork";

describe("[ENTITY] Fork", () => {
  it("should initialize from response data", () => {
    const fork = new Fork(AppTestData.FORK_RESPONSE);

    expect(fork.name).toBe("spark");
    expect(fork.fullName).toBe("n-marion/spark");
    expect(fork.owner.name).toBe("n-marion");
  });
});
