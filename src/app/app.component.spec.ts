import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Platform } from "@ionic/angular";

import { AppComponent } from "./app.component";

describe("[APP] AppComponent", () => {

  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj("StatusBar", ["styleDefault"]);
    splashScreenSpy = jasmine.createSpyObj("SplashScreen", ["hide"]);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj("Platform", {ready: platformReadySpy});

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: StatusBar, useValue: statusBarSpy},
        {provide: SplashScreen, useValue: splashScreenSpy},
        {provide: Platform, useValue: platformSpy},
      ],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should initialize the app", async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
