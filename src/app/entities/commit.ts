export class Commit {

  public sha: string;
  public authorName: string;

  constructor(responseData?: any) {
    if (responseData) {
      this.sha = responseData.sha;
      this.authorName = responseData.commit?.author?.name;
    }
  }

}
