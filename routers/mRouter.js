import express, { response } from "express"
import prisma from "../_db.js"
import multer from "multer"
import * as fs from "node:fs/promises"
import path from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"))
  },
  filename: async function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Buffer.from(file.originalname, "latin1").toString("utf8"))
  },
})
const upload = multer({ storage: storage })
const router = express.Router()
// GET /admin/getItems    alice?searchProperty=name
router.get("/get_items", async (req, res) => {
  try {
    const response = await global.prismaGlobal.supplier.findMany()
    res.send(response)
  } catch (e) {
    console.error("e")
  }
})

router.post("/post_items", async (req, res) => {
  try {
    const response = await global.prismaGlobal.s_routes.createMany({
      data: req.body.items,
      // skipDuplicates: true,
    })
    res.send(response)
  } catch (e) {
    console.error("e")
  }
})

router.post(
  "/upload_files",
  upload.single(
    "file"
  ) /* file is the input-element value, upload.array("files")*/,
  (req, res) => {
    try {
      // console.log(req.file)
      res.json({ message: "Successfully uploaded files" })
    } catch (e) {
      console.error("e")
    }
  }
)

// puppeteer
router.post("/puppeteer", async (req, res) => {
  try {
    await fs.appendFile(
      path.join(__dirname, "../public/puppeteer.txt"),
      req.body
    )
    res.send({ ok: true })
  } catch (e) {
    console.error(e)
  }
})

export default router
