const router = require('express').Router();

const listController = require('../controllers/ListController');

router.route('/lists').post((req, res) => {
    listController.create(req, res);
})

router.route('/lists').get((req, res) => {
    listController.getAll(req, res);
})

router.route('/lists/:id').get((req, res) => {
    listController.get(req, res);
})

router.route('/lists/:id').delete((req, res) => {
    listController.delete(req, res);
})

router.route('/lists/:id/addTask').post((req, res) => {
    listController.addTask(req, res);
});

router.route('/lists/:id/removeTask').post((req, res) => {
    listController.removeTask(req, res);
});

module.exports = router;