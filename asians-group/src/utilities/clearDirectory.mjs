import fs from "fs-extra"
// const fs = require('fs-extra')
async function clearDirectory () {
    try {
        await fs.emptyDir('./src/report/json/');
        console.log('success for json dir');
        await fs.emptyDir('./src/report/rerun/');
        console.log('success for rerun dir');
        await fs.emptyDir('./src/report/html/');
        console.log('success for html dir');
        await fs.emptyDir('./src/report/screenshots/');
        console.log('success for screenshots dir');
        await fs.emptyDir('./src/data/download');
        console.log('success for download dir');
    } catch (err) {
        console.error(err)
    }
}
await clearDirectory();