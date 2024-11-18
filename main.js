const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate the page to the ExampleForm page
    await page.goto('https://testsite.getjones.com/ExampleForm/');
  
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
  
    // Fill out the form by type values in the Name, Email, Phone and Company fields
    await page.type('#name', 'SpongeBob SquarePants');
    await page.type('#email', 'spongebob@example.com');
    await page.type('#phone', '0501234567');
    await page.type('#company', 'Nickelodeon');

    // // Change the "number of employees" dropdown to "51-500"
    await page.select('#employees', '51-500');

    // Take a screenshot of the page before submission
    await page.screenshot({
        path: 'screenshots\\page_before_submission.png',
        fullPage: true
    });

    // Wait and click on first result
    await page.waitForSelector('.primary.button', { timeout: 5000 });
    await page.click('.primary.button');

    // Wait for the thank you page to load and load a success message
    try {
        await page.waitForSelector('.bg-wrapper.thank-you h1', { timeout: 15000 });
        console.log('Thank you page reached successfully.');
    } catch (error) {
        console.log('Timeout error: Did not reach the thank you page.');
    }

    // Close the browser
    await browser.close();
  })();