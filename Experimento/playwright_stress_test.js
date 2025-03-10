const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://cliente-web-488938258128.us-central1.run.app/experiments/create_order';
const TOTAL_USERS = 400;
const USERS_PER_SECOND = 40;
const TEST_DURATION = 60 * 1000; // 60 seconds
const OUTPUT_FILE = path.join(__dirname, 'load_test_results.csv');

let responseTimes = [];
let successCount = 0;
let failureCount = 0;

async function simulateUser(id) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log(`User ${id} starting...`);
        const start = Date.now();
        await page.goto(URL, { waitUntil: 'load' });
        const loadTime = Date.now() - start;

        responseTimes.push({ user: id, time: loadTime });
        successCount++;

        console.log(`User ${id} finished. Load Time: ${loadTime}ms`);
    } catch (error) {
        failureCount++;
        console.error(`User ${id} encountered an error:`, error);
    } finally {
        await browser.close();
    }
}

async function runLoadTest() {
    let userCount = 0;
    const startTime = Date.now();
    let userPromises = [];

    const interval = setInterval(async () => {
        if (Date.now() - startTime >= TEST_DURATION || userCount >= TOTAL_USERS) {
            clearInterval(interval);
            await Promise.all(userPromises); // Ensure all users finish
            printMetrics();
            saveMetricsToCSV();
            return;
        }

        for (let i = 0; i < USERS_PER_SECOND && userCount < TOTAL_USERS; i++, userCount++) {
            userPromises.push(simulateUser(userCount + 1));
        }
    }, 1000); // Run every second
}

function printMetrics() {
    if (responseTimes.length > 0) {
        const times = responseTimes.map(entry => entry.time);
        const avgResponse = times.reduce((a, b) => a + b, 0) / times.length;
        const minResponse = Math.min(...times);
        const maxResponse = Math.max(...times);

        console.log('\n=== Test Results ===');
        console.log(`Total Users Simulated: ${TOTAL_USERS}`);
        console.log(`Successful Requests: ${successCount}`);
        console.log(`Failed Requests: ${failureCount}`);
        console.log(`Avg Load Time: ${avgResponse.toFixed(2)}ms`);
        console.log(`Min Load Time: ${minResponse}ms`);
        console.log(`Max Load Time: ${maxResponse}ms`);
    } else {
        console.log('No successful responses recorded.');
    }
}

function saveMetricsToCSV() {
    const header = 'User,ResponseTime(ms)\n';
    const rows = responseTimes.map(entry => `${entry.user},${entry.time}`).join('\n');
    const summary = `\n\nTotal Users,${TOTAL_USERS}\nSuccessful Requests,${successCount}\nFailed Requests,${failureCount}\nAvg Load Time,${(responseTimes.reduce((a, b) => a + b.time, 0) / responseTimes.length).toFixed(2)}ms\nMin Load Time,${Math.min(...responseTimes.map(e => e.time))}ms\nMax Load Time,${Math.max(...responseTimes.map(e => e.time))}ms`;

    fs.writeFileSync(OUTPUT_FILE, header + rows + summary, 'utf8');

    console.log(`\nMetrics saved to ${OUTPUT_FILE}`);
}

runLoadTest();
