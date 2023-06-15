const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    Task.create(task)
      .then(res.redirect("/tasks"))
      .catch((err) => console.log());
  }
  static async taskRemove(req, res) {
    const id = req.body.id;
    await Task.destroy({ where: { id: id } });
    res.redirect("/tasks");
  }
  static async updateTask(req, res) {
    const id = req.params.id;
    const task = await Task.findOne({ where: { id: id }, raw: true });

    res.render("tasks/edit", { task });
  }
  static async updateTaskPost(req, res) {
    const id = req.body.id; //tudo que vier de formularios html

    const task = {
      title: req.body.title,
      description: req.body.description,
    };
    await Task.update(task, { where: { id: id } });
    res.redirect("/tasks");
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });
    res.render("tasks/all", { tasks });
  }
};
//Dentro dessa função, há uma linha que diz "res.render("tasks/create")".
//Isso significa que o TaskController vai mostrar para você uma página chamada "create" que tem um formulário para você preencher com os detalhes da sua tarefa.
//Quando você terminar de preencher o formulário e clicar em um botão, o TaskController vai receber as informações que você colocou e pode fazer algo com elas.
//Por exemplo, ele pode salvar essas informações em algum lugar, como em um banco de dados, para que você possa acessá-las mais tarde.
