const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/add", TaskController.createTask);
router.post("/add", TaskController.createTaskSave);
router.get("/", TaskController.showTasks);

module.exports = router;
//Simplificando, quando alguém quer criar uma tarefa,
//eles acessam o caminho "/add" no site. O "router" sabe que isso significa chamar o TaskController,
//que mostra a página certa para criar a tarefa.