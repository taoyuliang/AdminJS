import fs from "node:fs"
import readline from "node:readline"
import url from "node:url"
import pg from "pg"
import { execSync } from "node:child_process"
const { Client } = pg
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
// console.log(import.meta.url) //file:///Users/anthony/Downloads/HTML/AdminJS/crud.js
// console.log(new URL(".", import.meta.url)) // URL object
const connectionString =
  "postgresql://adminjs:changeme@localhost:5432/adminjs?schema=public"
const client = new Client({
  connectionString,
})

/* Top level await is not supported in Node.js yet, so we have to wrap our code in an async function.
What is it: Any modules that include this module will wait for the fetch to resolve before running any code,
const colors = fetch("../data/colors.json").then((response) => response.json());
export default await colors;
*/
await client.connect() // TODO: wrap await to async function

let lineReader = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/public/puppeteer.txt`),
  //   crlfDelay: Infinity,
})

lineReader.on("close", function () {
  console.log("all done")
  client.end()
})

// let n = 0

for await (const line of lineReader) {
  // TODO: wrap await to async function
  //   n++
  //   if (n == 3) process.exit(1)
  let item = JSON.parse(line)
  console.log(item)
  const text =
    'INSERT INTO s_routes(name, "from", stop, "to", "ratesArr", airline, schedule_date, from_name, to_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)'
  //{"route":["HU-海南航空有限公司","D4","DLC","大连周水子国际机场","直达","VVO","俄罗斯 海参崴"],"ratesArr":[{"45":"10","100":"8","300":"7","500":"6","1000":"5","type":"散货","ratio":"no ratio"}]}

  let values = [
    "",
    item.route[2],
    item.route[4],
    item.route[5],
    item.ratesArr,
    item.route[0],
    item.route[1],
    item.route[3],
    item.route[6],
  ]

  await client.query(text, values)
  //   execSync("sleep 1")
}

// lineReader.on("line", async function (line) {
// })
