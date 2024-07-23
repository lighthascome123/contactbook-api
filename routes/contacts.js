const express = require('express');
const {
  createAd,
  getMyAds,
  getAdById,
  updateAd,
  deleteAd,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(auth, createAd)
  .get(auth, getMyAds);

router.route('/:id')
  .get(auth, getAdById)
  .put(auth, updateAd)
  .delete(auth, deleteAd);

module.exports = router;
