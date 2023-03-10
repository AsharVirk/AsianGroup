import urls from "../../data/url.json";
import fs from "fs-extra";
// import path from 'path';

async function setEnvironment () {
    let args =  process.argv.length; //total length of command written on command prompt
    let command = process.argv[args-1]; //Last command
    if(command.includes("qa")){
        await console.log("Setting Up Qa Environment with URL: "+urls.urls.qaURL);
        let jsonFile = urls;
        jsonFile.urls.url=urls.urls.qaURL;
        await fs.writeJson("./src/data/url.json", jsonFile);
        await console.log("Qa Environment Setup Completed")
    }else if(command.includes("prod")){
        await console.log("Setting Up Prod Environment with URL: "+urls.urls.prodURL)
        let jsonFile = urls;
        jsonFile.urls.url=urls.urls.prodURL;
        await fs.writeJson("./src/data/url.json", jsonFile);
        await console.log("Prod Environment Setup Completed")
    }
}
await setEnvironment();