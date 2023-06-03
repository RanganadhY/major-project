const express= require("express")
const router = express.Router()

const fileControllers = require("../controllers/fileControllers")

router.post("/view-logged",fileControllers.viewLogged)
router.post("/edit-logged",fileControllers.editLogged)

router.get("/fetch-logs/:uniqueNumber",fileControllers.fetchAFileLogs)

router.post("/transfer-owner",fileControllers.transferOwner)

router.get("/fetch-public-files",fileControllers.getPublicFiles)

module.exports = router;