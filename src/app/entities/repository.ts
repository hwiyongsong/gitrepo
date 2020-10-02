import { User } from "@app/entities/user";

export class Repository {

  public name: string;
  public fullName: string;
  public owner: User;
  public starCount: number;
  public detailUrl: string;
  public commitsUrl: string;
  public forksUrl: string;

  constructor(responseData?: any) {
    if (responseData) {
      this.name = responseData.name;
      this.fullName = responseData.full_name;
      this.owner = new User(responseData.owner);
      this.starCount = responseData.watchers_count;
      this.detailUrl = responseData.html_url;
      this.commitsUrl = responseData.commits_url?.replace("{/sha}", "");
      this.forksUrl = responseData.forks_url;
    }

  }

}
