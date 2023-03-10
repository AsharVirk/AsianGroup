import { Before, After,setDefaultTimeout } from "@cucumber/cucumber";
import env from "../../../data/url.json"

setDefaultTimeout(240*1000);

Before(async function () {
  await this.openTodoPage();
  await this.attach("Environment: "+env.urls.url, 'text/plain');
});


After(async function (scenario) {
  if (scenario.result.status.toLowerCase() === "failed") {
    try {
      const screenShot = await this.page.screenshot({fullPage: true});
      const image18 = Buffer.from(screenShot, "base64");
      await this.attach(image18, "image/png");
    } catch (e) {
      console.log(e.message);
    }
  }
  await this.closeTodoPage();
});
