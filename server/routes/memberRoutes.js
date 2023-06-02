const express= require("express")
const router = express.Router()

const membersController = require("../controllers/memberControllers");

router.get("/fetch-members",membersController.fetchAllMembers);
router.post("/post-file",membersController.uploadFile)
router.post("/fetch-my-docs",membersController.fetchMyDocs)

router.get("fetch-viewAccesdocs/:userName")

router.get("/fetch-eligible-docs/:userName",membersController.fetchEligibleDocs)

module.exports = router