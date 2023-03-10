class Clicking{

    async clickElement(page, element) {
        try {
            await page.waitForSelector(element,{ visible: true,timeout :5000 })
            await page.click( element )
        } catch (errorMessage) {
            throw new Error( `Unable to click on locator ${element} ${errorMessage}`)
        }
    }

    //this function is used to click on element by using xpath expression
    async clickElementByXpath(page,xpath)
    {
        try {
            const element = await page.waitForXPath(xpath,{visible:true,timeout:20000});
            await element.click();
            await page.waitForTimeout(1000);
        }
        catch (e) {
            throw new Error( `Unable to click element with xpath ${xpath} , ${e.stack}`)
        }
    }

    //this method is used for double click
    async doubleClickByXpath(page,xpath){
        try{
            const element = await page.waitForXPath(xpath,{visible:true,timeout:20000});
            const rect = await page.evaluate((element) => {
                const { x, y } = element.getBoundingClientRect();
                return { x, y };
            }, element);

            if (rect) {
                await page.mouse.click(rect.x, rect.y, { clickCount: 2 });
            } else {
                console.error("Element Not Found");
            }
        }
        catch (e) {
            throw new Error( `Unable to click element with xpath ${xpath} , ${e.stack}`)
        }
    }

    //this function is used to remove test by using xpath expression
    async removeTextByXpath(page, xpath)
    {
        try {
            const element = await page.waitForXPath(xpath, {visible: true, timeout: 10000});
            await element.click();
            await page.keyboard.press('Backspace');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await element.click();
        }
        catch (e) {
            throw new Error( `Unable to click element with xpath ${xpath} , ${e}`)
        }
    }


    //this function is used to click checkbox using javascript and selector expression
    async clickCheckBoxBySelector(page, element) {
        try {
            await page.waitForSelector(element)
            await page.evaluate((element) => document.querySelector(element).click(), element);
        } catch (errorMessage) {
            throw new Error( `Unable to click on locator ${element} ${errorMessage}`)
        }
    }

    //this function is used to hover over elements using selector expression and puppeteer
    async clickCheckBoxByXpath(page, element) {
        try {
            await page.waitForXPath(element);
            const elements = await page.$x(element);
            await elements[0].click();

        } catch (errorMessage) {
            throw new Error( `Unable to click on locator ${element} ${errorMessage}`)
        }
    }

    async hoverOverElement(page,element)
    {
        try {
            await page.waitForSelector(element,{visible:true,timeout:10000});
            await page.hover(element);
        }
        catch (e) {
            throw new Error( `Unable to hover over element with  ${element} , ${e.stack}`)
            console.log(e)
        }
    }

    //this function is used to hover over elements using xpath expression
    async hoverOverElementByXpath(page,xpath)
    {
        let element;
        try {
            element = await page.waitForXPath(xpath,{visible:true,timeout:50000});
            await element.hover();
        }
        catch (e) {
            throw new Error( `Unable to hover over element with  ${element} , ${e.stack}`)
            console.log(e)
        }
    }

    //this functions is used to select dropdown using xpath expression
    async selectDropDownValueByXpath(page, selectXpath, optionXpath)
    {
        try {
            // await page.waitForTimeout(5000);
            let selectElement = await page.waitForXPath(selectXpath,{timeout:50000});
            console.log("Selector Found: "+selectElement);
            let selectSelector = await (await selectElement.getProperty('id')).jsonValue();
            selectSelector = "#"+selectSelector;
            if(selectSelector==="#"){
                selectSelector = await (await selectElement.getProperty('name')).jsonValue();
                selectSelector = "select[name='"+selectSelector+"']";
            }
            console.log("SelectorID: "+selectSelector);
            let OptionElement = await page.waitForXPath(optionXpath,{timeout:50000});
            console.log("Element Found: "+OptionElement);
            let optionSelector = await (await OptionElement.getProperty('value')).jsonValue();
            console.log("optionValue: "+optionSelector);
            await this.selectDropDownValue(page,selectSelector,optionSelector);
        }
        catch (e) {
            throw new Error( `Unable to click the dropdown of ${selectXpath} with value ${optionXpath} errorMessage: ${e}, errorStack: ${e.stack}`);
            console.log(e)
        }
    }

    async selectDropDownValueByXpathwithNameSelector(page, selectXpath, optionXpath)
    {
        try {
            // await page.waitForTimeout(5000);
            let selectElement = await page.waitForXPath(selectXpath,{timeout:50000});
            console.log("Selector Found: "+selectElement);
            let selectSelector = await (await selectElement.getProperty('name')).jsonValue();
            selectSelector = "."+selectSelector;
            console.log("SelectorID: "+selectSelector);
            let OptionElement = await page.waitForXPath(optionXpath,{timeout:50000});
            console.log("Element Found: "+OptionElement);
            let optionSelector = await (await OptionElement.getProperty('value')).jsonValue();
            console.log("optionValue: "+optionSelector);
            await this.selectDropDownValue(page,selectSelector,optionSelector);
        }
        catch (e) {
            throw new Error( `Unable to click the dropdown of ${selectXpath} with value ${optionXpath} errorMessage: ${e}, errorStack: ${e.stack}`);
            console.log(e)
        }
    }

    async selectDropDownValue(page,selectSelector,optionValue)
    {
        try {
            await page.waitForSelector(selectSelector,{timeout:5000});
            await page.select(selectSelector,optionValue);
            await page.waitForTimeout(10000);
        }
        catch (e) {
            throw new Error( `Unable to click the dropdown value of ${selectSelector} with value ${optionValue} errorMessage: ${e}, errorStack: ${e.stack}`);
            console.log(e)
        }
    }

    //this function is used to click on Link Text
    async clickLinkText(page, text){
        const xpath = "//a[contains(text(),'" + text + "')]";
        await this.clickElementByXpath(page, xpath);
    }



    //This function is used for drag and drop using selector expressions
    async dragAndDrop(page, originSelector, destinationSelector) {
        // await page.setDragInterception(true);
        const origin = await page.waitForSelector(originSelector)
        const destination= await page.waitForSelector(destinationSelector)
        // originSelector='//h3[contains(text(),\'Cycle\')]';
        // destinationSelector='//h3[contains(text(),\'Project\')]'
        // const origin = (await page.$x(originSelector))[0];
        // const destination = (await page.$x(destinationSelector))[0];
        const ob = await origin.boundingBox();
        const db = await destination.boundingBox();
        console.log(`Dragging from ${ob.x + ob.width / 2}, ${ob.y + ob.height / 2}`);
        await origin.click();
        await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2);
        // await page.waitForTimeout(20000);
        await page.mouse.down();
        console.log(`Dropping at   ${db.x + db.width / 2}, ${db.y + db.height / 2}`)
        await page.mouse.move(db.x + db.width / 2, db.y+ db.height / 2);
        await page.mouse.up();
        await page.waitForTimeout(20000);
        // await page.setDragInterception(false);
        // let dnd = drag({element: origin, // draggable element
        //     dropZones: destination});
        // dnd.start();


        // const origin = await page.waitForSelector(originSelector);
        // const destination = await page.waitForSelector(destinationSelector);
        // const originBox = await origin.boundingBox();
        // const destinationBox = await destination.boundingBox();
        // const lastPositionCoordenate = (box) => ({
        //     x: box.x + box.width / 2,
        //     y: box.y + box.height,
        // });
        // const getPayload = (box) => ({
        //     bubbles: true,
        //     cancelable: true,
        //     screenX: lastPositionCoordenate(box).x,
        //     screenY: lastPositionCoordenate(box).y,
        //     clientX: lastPositionCoordenate(box).x,
        //     clientY: lastPositionCoordenate(box).y,
        // });
        //
        // // Function in browser.
        // const pageFunction = async (_originSelector, _destinationSelector, originPayload, destinationPayload) => {
        //     const _origin = document.querySelector(_originSelector);
        //     let _destination = document.querySelector(_destinationSelector);
        //     // If has child, put at the end.
        //     _destination = _destination.lastElementChild || _destination;
        //
        //     // Init Events
        //     _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload));
        //     _origin.dispatchEvent(new DragEvent('dragstart', originPayload));
        //
        //     await new Promise((resolve) => setTimeout(resolve, 2000));
        //     _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload));
        //     _origin.dispatchEvent(new DragEvent('dragend', destinationPayload));
        // };
        //
        // // Init drag and drop.
        // await page.evaluate(
        //     pageFunction,
        //     originSelector,
        //     destinationSelector,
        //     getPayload(originBox),
        //     getPayload(destinationBox),
        // );
    }

    //This function is used for drag and drop using xpath expressions
    async dragAndDropXpath(page, originXpath, destinationXpath) {
        await page.setDragInterception(true);
        const origin = await page.waitForXPath(originXpath);
        const destination = await page.waitForXPath(destinationXpath);
        const ob = await origin.boundingBox()
        const db = await destination.boundingBox()
        const a = {x:(ob.x + ob.width / 2), y:(ob.y + ob.height / 2)};
        const b = {x:(db.x + db.width / 2), y:(db.y + db.height / 2)};
        await page.mouse.dragAndDrop(a,b);

        // await page.mouse.move(1000, 40);
        // await page.waitForTimeout(1000);
        // await page.mouse.click(1000, 40);
        // await page.waitForTimeout(5000);
        // await page.mouse.click(550, 550);
        // await page.mouse

        // // await page.focus();
        await page.waitForTimeout(5000);
        await page.setDragInterception(false);
        // console.log(`Dragging from ${ob.x + ob.width / 2}, ${ob.y + ob.height / 2}`)
        // await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2)
        // await page.mouse.down()
        // console.log(`Dropping at   ${db.x + db.width / 2}, ${db.y + db.height / 2}`)
        // await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2)
        // await page.mouse.up()
    }

    //This function is used to click on input tag using javascript
    async clickInputButtonBySelector(page,element)
    {
        try {
            await page.waitForSelector(element,{visible:true,timeout:10000});
            // await page.click(element);
            await page.evaluate((element) => document.querySelector(element).click(), element);
        }
        catch (e) {
            throw new Error( `Unable to click element with xpath ${element} , ${e.stack}`)
            console.log(e)
        }
    }

    async selectDropDownOptionByXpath(page,selectXpath,optionXpath)
    {
        try {
            await page.waitForTimeout(20000);
            await page.waitForXPath(selectXpath,{timeout:10000});
            let selectElements = await page.$x(selectXpath);
            console.log("Selector Found: "+selectElements);
            let selectSelector = await (await selectElements[0].getProperty('name')).jsonValue();
            // selectSelector = "#"+selectSelector;
            selectSelector = 'select[name="'+selectSelector+'"]';
            console.log("SelectorName: "+selectSelector);
            await page.waitForXPath(optionXpath,{timeout:10000});
            let OptionElements = await page.$x(optionXpath);
            console.log("Element Found: "+OptionElements[0]);
            let optionSelector = await (await OptionElements[0].getProperty('value')).jsonValue();
            console.log("optionValue: "+optionSelector);
            await page.select(selectSelector,optionSelector);
        }
        catch (e) {
            throw new Error( `Unable to click the dropdown of ${selectXpath} with value ${optionXpath} errorMessage: ${e}, errorStack: ${e.stack}`);
            console.log(e)
        }
    }

    async clickOnTableHeading(page,tableHeading){
        const xpath = "//th[contains(text(),'" + tableHeading + "')]"
        await this.clickElementByXpath(page, xpath)
    }

    async clickOnTableHeaderSelectAllBtn(page,elementLocator){
        await this.clickElementByXpath(page,elementLocator);
        await page.waitForTimeout(5000);
    }

    async elementExistXpath(page, element){
        try {
            await page.waitForXPath(element, {visible: true,timeout:5000})
            return true;
        } catch (errorMessage) {
            return false;

        }
    }


}

export default new Clicking()