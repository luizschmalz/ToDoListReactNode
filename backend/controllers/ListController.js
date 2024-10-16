const ListModel = require('../models/List');

const ListController = {
    create: async (req, res) => {
        try {
            const list = {
                title: req.body.title,
                description: req.body.description
            };

            const response = await ListModel.create(list);

            res.status(201).json({ listId: response._id, msg: "List created successfully" });
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const lists = await ListModel.find();
            res.status(200).json(lists);
        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const list = await ListModel.findById(id);

            if (!list) {
                res.status(404).json({ msg: "List not found" });
                return;
            }

            res.json(list);
        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const list = await ListModel.findById(id);

            if (!list) {
                res.status(404).json({ msg: "List not found" });
                return;
            }

            const deletedList = await ListModel.findByIdAndDelete(id);

            res.status(200).json({ deletedList, msg: "List deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    },

    addTask: async (req, res) => {
        try {
            const { id } = req.params; 
            const { title } = req.body;  

            const list = await ListModel.findById(id);

            if (!list) {
                return res.status(404).json({ msg: "List not found" });
            }

            list.tasks.push({ title });

            const updatedList = await list.save();

            res.status(200).json({ updatedList, msg: "Task added successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "An error occurred" });
        }
    },

    removeTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { taskTitle } = req.body;
    
            const list = await ListModel.findById(id);
    
            if (!list) {
                return res.status(404).json({ msg: "List not found" });
            }
    
            const taskIndex = list.tasks.findIndex(task => task.title === taskTitle);
    
            if (taskIndex === -1) {
                return res.status(404).json({ msg: "Task not found" });
            }
    
            list.tasks.splice(taskIndex, 1);
    
            const updatedList = await list.save();
    
            res.status(200).json({ updatedList, msg: "Task removed successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "An error occurred" });
        }
    }
    
};

module.exports = ListController;