const router = require('express').Router();

const {addReaction, createThought, deleteThought, getSingleThought, getThoughts, removeReaction, updateThought} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;
