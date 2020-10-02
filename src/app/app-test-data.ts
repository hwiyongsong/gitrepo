export class AppTestData {

  public static readonly REPOSITORY_QUERY_RESPONSE = {
    "total_count": 2352,
    "items": [
      {
        "name": "spark",
        "full_name": "apache/spark",
        "owner": {
          "login": "apache",
          "url": "https://api.github.com/users/apache"
        },
        "html_url": "https://github.com/apache/spark",
        "commits_url": "https://api.github.com/repos/apache/spark/commits{/sha}",
        "forks_url": "https://api.github.com/repos/apache/spark/forks",
        "watchers_count": 27594,
      },
      {
        "name": "CMAK",
        "full_name": "yahoo/CMAK",
        "owner": {
          "login": "yahoo",
          "url": "https://api.github.com/users/yahoo"
        },
        "html_url": "https://github.com/yahoo/CMAK",
        "commits_url": "https://api.github.com/repos/yahoo/CMAK/commits{/sha}",
        "forks_url": "https://api.github.com/repos/yahoo/CMAK/forks",
        "watchers_count": 9410,
      }
    ]
  };

  public static readonly LAST_3_COMMITS_RESPONSE = [
    {
      "sha": "e62d24717eb774f1c7adfd0fbe39640b96bc661d",
      "commit": {
        "author": {
          "name": "ulysses"
        }
      }
    },
    {
      "sha": "9c618b33084c8ff6f68e5183e2574ba368fb7758",
      "commit": {
        "author": {
          "name": "Dongjoon Hyun"
        }
      }
    },
    {
      "sha": "0963fcd848f62b4f2231dfcf67f9beabf927c21e",
      "commit": {
        "author": {
          "name": "yangjie01"
        }
      }
    }
  ];

  public static readonly LAST_FORK_RESPONSE = [
    {
      "name": "spark",
      "full_name": "n-marion/spark",
      "owner": {
        "login": "n-marion"
      }
    }
  ];

  public static readonly REPOSITORY_RESPONSE = {
    "name": "spark",
    "full_name": "apache/spark",
    "owner": {
      "login": "apache",
      "url": "https://api.github.com/users/apache",
    },
    "html_url": "https://github.com/apache/spark",
    "forks_url": "https://api.github.com/repos/apache/spark/forks",
    "commits_url": "https://api.github.com/repos/apache/spark/commits{/sha}",
    "watchers_count": 27594
  };

  public static readonly COMMIT_RESPONSE = {
    "sha": "e62d24717eb774f1c7adfd0fbe39640b96bc661d",
    "commit": {
      "author": {
        "name": "ulysses"
      }
    }
  };

  public static readonly FORK_RESPONSE = {
    "name": "spark",
    "full_name": "n-marion/spark",
    "owner": {
      "login": "n-marion"
    }
  };

  public static readonly USER_RESPONSE = {
    "login": "yahoo",
    "url": "https://api.github.com/users/yahoo",
    "bio": "Yahoo is a Verizon Media brand.",
    "created_at": "2009-01-17T20:14:40Z",
    "updated_at": "2020-09-14T14:26:22Z"
  };

}
