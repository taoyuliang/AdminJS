import puppeteer from "puppeteer-core"
import CryptoJS from "crypto-js"
;(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    userDataDir: "/Users/anthony/Library/Application Support/Google/Chrome",
    // devtools: true, // Client Side debugger method
  })
  try {
    // Connect to a remote browser
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint:
    //     "ws://127.0.0.1:9222/devtools/browser/06e098d7-303c-4f32-9bdb-8dddd4a41c89",
    // })

    const pages = await browser.pages() // const page = await browser.newPage()
    const page = pages[0]
    page.on("console", (msg) => {
      console.log("Console Event: ", msg.text()) // This output is in Browser
    })

    debugger // Server Side debugger method, iTerm2: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 & node --inspect-brk your.js

    await page.goto("https://www.feeair.com/rates.html")

    await page.setViewport({ width: 1080, height: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 3000)) // Manually login account

    /*Query without waiting: 
    page.$()
    page.$$()
    page.$eval()
    page.$$eval()
    */
    page.$eval("body", (element) => {
      // debugger // Client Side debugger method
      console.log("Hi Puppeteer!")
    })

    //Logic goes here
    page.on("response", async (response) => {
      const headers = response.headers()
      const url = response.url()

      if (
        url.includes("searchBaseRates") &&
        headers["content-type"] == "application/json"
      ) {
        const res = await response.json()
        // console.log(res)
        const ret = CryptoJS.AES.decrypt(
          res.data,
          CryptoJS.enc.Utf8.parse("17DC17DC17DC17dc"),
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString(CryptoJS.enc.Utf8)
        console.log(JSON.parse(ret))
        console.log(JSON.parse(ret).freightQueryVOS[0].rates)
      }
    })

    await page.locator("input#start").fill("SHA")
    await page.locator("input#endPod").fill("HKG")
    await page.locator("input.btn").click()
  } catch (e) {
    console.log(e)
  } finally {
    // await browser.close()
  }
})()
