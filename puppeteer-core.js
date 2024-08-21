import puppeteer from "puppeteer-core"
import CryptoJS from "crypto-js"
import IATA from "./DummyIATA.js"
// import IATA from "./IATA.js"
import * as fs from "fs"
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
    console.log("IATA", IATA) // Array
    const START = [
      "PVG",
      "SHA",
      "NKG",
      "HGH",
      "HFE",
      "WUH",
      "EHU",
      "KHN",
      "FOC",
      "NGB",
      "XMN",
      "CAN",
      "SZX",
      "CSX",
      "CKG",
      "KMG",
      "NNG",
      "CTU",
      "TFU",
      "XIY",
      "CGO",
      "TAO",
      "PEK",
      "TSN",
      "DLC",
    ]
    const pages = await browser.pages() // const page = await browser.newPage()
    const page = pages[0]
    page.on("console", (msg) => {
      console.log("Console Event: ", msg.text()) // This output is from Browser to ndoe console
    })

    debugger // Server Side debugger method, iTerm2: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 & node --inspect-brk your.js
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.goto("https://www.feeair.com/rates.html", {
        // waitUntil: "networkidle2",
      }),
    ])

    // await page.addScriptTag({
    //   url: "https://code.jquery.com/jquery-3.2.1.min.js",
    // })
    await page.setViewport({ width: 1080, height: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Manually login account

    /*Query without waiting: 
    page.$()
    page.$$()
    page.$eval()
    page.$$eval()
    */
    page.$eval("body", (element) => {
      // debugger // Client Side debugger method
      console.log(
        $ ? "Hi Puppeteer with JQuery" : "Hi Puppeteer without JQuery"
      )
    })

    //Logic goes here
    /*page.on("response", async (response) => {
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
      }
    })*/

    // For Loop starts
    for (let i = 0; i < START.length; i++) {
      for (let j = 0; j < IATA.length; j++) {
        if (START[i] == IATA[j]) continue
        await page.locator("input#start").fill(START[i])
        await page.locator("input#endPod").fill(IATA[j])
        // await page.locator("input.btn").click()

        // await page.waitForNavigation()
        await Promise.all([
          page.waitForNavigation(), // The promise resolves after navigation has finished
          page.locator("input.btn").click(),
        ])
        await new Promise((resolve) => setTimeout(resolve, 3000))
        let ret = await page.evaluate(() => {
          let retData = ""
          if (
            $("div.jsts.alma")["0"] &&
            $("div.jsts.alma")["0"].innerText ==
              "未找到符合您条件的产品,更多运价请咨询客服"
          ) {
            // Do nothing
          } else {
            const lists = $("div.container>ul div.listLi").toArray()

            lists.forEach((item, index) => {
              if (index == 1) {
                // Do nothing, it is an image
              } else {
                //[ "SQ-新加坡航空公司", "D1/2/3/4/5/6/7", "PEK", "北京首都国际机场", "SIN", "BKK", "泰国 曼谷" ]
                let route =
                  item.children[0].children[2].children[0].children[0].innerText.split(
                    /\n/
                  )

                let rates =
                  item.children[0].children[2].children[0].children[1].innerText
                    .split(/(散货\n托盘)|(散货)|(托盘)/)
                    .filter((i) => !i == false)
                rates = rates.map((i) => (i == "散货\n托盘" ? "散货/托盘" : i))
                rates = Array.from({ length: rates.length / 2 }, (el, idx) => {
                  return "\n" + rates[2 * idx] + rates[2 * idx + 1]
                })
                let ratesArr = rates.map((i) => {
                  const tmp = i.split(/\n/).filter((i) => !i == false)
                  let obj = {}
                  obj["type"] = tmp[0]
                  obj["ratio"] = tmp[1]
                  obj["45"] = tmp[2].slice(1)
                  obj["100"] = tmp[3].slice(1)
                  obj["300"] = tmp[4].slice(1)
                  obj["500"] = tmp[5].slice(1)
                  obj["1000"] = tmp[6].slice(1)
                  return obj
                })
                // ratesArr = [...new Set(ratesArr)] // Dedup
                retData += JSON.stringify({ route, ratesArr }) + "\n"
              }
            }) // End of lists.forEach
          }
          return retData
        })
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        let fetchRes = await fetch("http://localhost:3000/admin/puppeteer", {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "text/plain",
          },
          body: ret,
        })
        console.log("fetch ok: ", fetchRes.ok)
      }
    }
  } catch (e) {
    console.log(e)
  } finally {
    // await browser.close()
  }
})()
