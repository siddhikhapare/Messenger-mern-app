const express = require("express");
const {accessChat,fetchChats,createGroupChat,removeFromGroup,addToGroup,renameGroup} = require("../controller/chatController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/",protect, accessChat);
router.get("/",protect, fetchChats);
router.post("/group",protect, createGroupChat);
router.put("/rename",protect, renameGroup);
router.put("/groupremove",protect, removeFromGroup);
router.put("/groupadd",protect, addToGroup);

module.exports = router;