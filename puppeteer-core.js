import puppeteer from "puppeteer-core"
;(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: false,
      // userDataDir: "/Users/anthony/Library/Application Support/Google/Chrome",
      // devtools: true, // Client Side debugger method
    })

    // Connect to a remote browser
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint:
    //     "ws://127.0.0.1:9222/devtools/browser/06e098d7-303c-4f32-9bdb-8dddd4a41c89",
    // })

    // Create a page
    const page = await browser.newPage()
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()))
    debugger // Server Side debugger method, iTerm2: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 & node --inspect-brk your.js
    // Go to your site
    await page.goto("https://www.feeair.com/rates.html")

    await page.setViewport({ width: 1080, height: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 10000)) // Manually login account
    page.$eval("body", (element) => {
      // debugger // Client Side debugger method
      console.log("Hi Puppeteer")
    })

    // Close browser.
    //   await browser.close()
  } catch (e) {
    console.log(e)
  }
})()
