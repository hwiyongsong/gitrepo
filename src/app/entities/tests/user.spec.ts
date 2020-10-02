import { AppTestData } from "@app/app-test-data";
import { User } from "@app/entities/user";

describe("[ENTITY] User", () => {
  it("should initialize from response data", () => {
    const user = new User(AppTestData.USER_RESPONSE);

    expect(user.name).toBe("yahoo");
    expect(user.detailUrl).toBe("https://api.github.com/users/yahoo");
    expect(user.bio).toBe("Yahoo is a Verizon Media brand.");
  });
});
