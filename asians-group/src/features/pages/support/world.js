import {setWorldConstructor, World} from "@cucumber/cucumber";
import puppeteer from "puppeteer";
import url from "../../../data/url.json";

const PAGE = url.urls.url;

class TodoWorld extends World {

    page = null;

    constructor(options) {
        super(options);
    }

    async openTodoPage() {
        this.browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            // slowMo: 250,
            // defaultViewport: null,//width: 1366, height: 768
            defaultViewport:{ width: 1920, height: 1080},
            args: [
                '--start-maximized',
                "--enable-features=NetworkService",
                "--no-sandbox",
                // "--headless"
            ]
        });
        this.pages = await this.browser.pages();
        this.page = this.pages[0];
        await this.page.goto(PAGE, {waitUntil: 'load', timeout: 0});
    }

    async closeTodoPage() {
        let pages = await this.browser.pages();
        await Promise.all(pages.map(page =>page.close()));
        await this.browser.close();
    }
}

setWorldConstructor(TodoWorld);
