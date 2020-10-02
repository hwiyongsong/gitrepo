# Git Repository Search #

A basic app to search Github repositories and view repository detail. 
This app is built using [Ionic/Angular framework](https://ionicframework.com/docs/angular/overview).

It does NOT use any Github OAuth token so it is limited to the default "60 queries per hour" to Github API services.

### Live URL ###
* [https://gitrepo-search.web.app](https://gitrepo-search.web.app)

### To run the app ###
* npm start

### To run the tests ###
* ng test

### Main Files ###
* **src/app/app-routing.module.ts**
    * Contains the various routes.
* **src/app/app-test-data.ts**
    * Contains the test data.
* **src/app/services/github.service.ts**
    * Service that interacts with Github API.
* **src/app/pages/search**
    * The main search page.
* **src/app/modals/repo-detail**
    * The repository detail popup when clicking on the repository "Detail" link.
* **src/app/entities**
    * Various domain models.
* **src/theme/variables.scss**
    * CSS variables.
* **src/global.scss**
    * Global SCSS styles.

### Test Files ###
* **src/app/services/tests/github.service.spec.ts**
* **src/app/pages/search/tests/search.page.spec.ts**
* **src/app/modals/repo-detail/tests/repo-detail.modal.spec.ts**
* **src/app/entities/tests/commit.spec.ts**
* **src/app/entities/tests/fork.spec.ts**
* **src/app/entities/tests/repository.spec.ts**
* **src/app/entities/tests/repository-query-result.spec.ts**
* **src/app/entities/tests/user.spec.ts**
