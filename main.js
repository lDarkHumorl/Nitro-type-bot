const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://www.nitrotype.com/login`); 
    await page.focus('#username');
    await page.keyboard.type('AutoZoneer');
    await page.focus('[id="password"]');
    await page.keyboard.type('12345678910po');

    await page.click('[class="btn btn--primary btn--fw"]');

    await new Promise(r => setTimeout(r, 6000));

    await page.click('[class="btn btn--primary btn--fw animate--iconSlam well well--b well--s"]');

    while(true) {
        await page.waitForSelector('[class="dash-letter is-waiting"]');
        console.log('found it!!!');
        let elements = await page.$('[class="dash-letter is-waiting"]');
        let value = await page.evaluate(el => el.textContent, elements);
    
    
        const text = await page.evaluate(() => Array.from(document.querySelectorAll('[class="dash-letter"]'), element => element.textContent));
    
    
        console.log(value);
    
        console.log(text);

    
        await new Promise(r => setTimeout(r, 5000));
    
        for (let i = -1; i < text.length; i++) {
            if(i == -1) {
                await page.keyboard.type(value);
                console.log(value);
            }
            else {
                if(text[i] == '\xa0') {
                    console.log('space bar');
                    await page.keyboard.press(' ');
                }
                else {
                    await page.keyboard.type(text[i]);
                    console.log(text[i]);
                    //this controls the delay between each key press. If you want to it to type slower you will want to increase this value and vice-versa.
                    await new Promise(r => setTimeout(r, 110));
                }
            }
        }

        await new Promise(r => setTimeout(r, 3000));

        await page.goto(`https://www.nitrotype.com/race`); 
    }


})();
