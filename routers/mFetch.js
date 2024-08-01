import express, { response } from "express"
import prisma from "../db.js"

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

export default router
