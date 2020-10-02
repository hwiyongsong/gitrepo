import { User } from "@app/entities/user";

export class Fork {

  public name: string;
  public fullName: string;
  public owner: User;

  constructor(responseData?: any) {
    if (responseData) {
      this.name = responseData.name;
      this.fullName = responseData.full_name;
      this.owner = new User(responseData.owner);
    }
  }

}
