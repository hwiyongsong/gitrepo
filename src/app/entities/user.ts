export class User {

  public name: string;
  public bio: string;
  public detailUrl: string;

  constructor(responseData?: any) {
    if (responseData) {
      this.name = responseData.login;
      this.bio = responseData.bio;
      this.detailUrl = responseData.url;
    }
  }

}
