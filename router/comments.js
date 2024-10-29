const express = require("express");
const router = express.Router();
let comments = []; // Initialize an empty array for comments
let commentId = 1; // ID counter for comments (auto-increment)

// GET /comments
router.get("/", (req, res) => {
  const { userId, postId } = req.query;
  let filteredComments = comments;

  if (userId) {
    filteredComments = filteredComments.filter(
      (comment) => comment.userId === parseInt(userId)
    );
  }

  if (postId) {
    filteredComments = filteredComments.filter(
      (comment) => comment.postId === parseInt(postId)
    );
  }

  res.json(filteredComments);
});

// POST /comments
router.post("/", (req, res) => {
  const { userId, postId, body } = req.body;
  if (userId && postId && body) {
    const newComment = {
      id: commentId++,
      userId,
      postId,
      body,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ error: "userId, postId, and body are required" });
  }
});

// GET /comments/:id
router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// PATCH /comments/:id
router.patch("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    if (req.body.body) {
      comment.body = req.body.body;
    }
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// DELETE /comments/:id
router.delete("/:id", (req, res) => {
  const index = comments.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedComment = comments.splice(index, 1);
    res.json(deletedComment[0]);
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});



module.exports = router;
