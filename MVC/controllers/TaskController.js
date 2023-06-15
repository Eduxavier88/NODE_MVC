const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }

  static createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    Task.create(task)
      .then(res.redirect("/tasks"))
      .catch((err) => console.log());
  }

  static showTasks(req, res) {
    Task.findAll({ raw: true })
      .then((data) => {
        let emptyTasks = false;

        if (data.length === 0) {
          emptyTasks = true;
        }

        res.render("tasks/all", { tasks: data, emptyTasks });
      })
      .catch((err) => console.log(err));
  }

  static removeTask(req, res) {
    const id = req.body.id;

    Task.destroy({ where: { id: id } })
      .then(res.redirect("/tasks"))
      .catch((err) => console.log());
  }

  static updateTask(req, res) {
    const id = req.params.id;

    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render("tasks/edit", { task: data });
      })
      .catch((err) => console.log());
  }

  static updateTaskPost(req, res) {
    const id = req.body.id;

    const task = {
      title: req.body.title,
      description: req.body.description,
    };

    Task.update(task, { where: { id: id } })
      .then(res.redirect("/tasks"))
      .catch((err) => console.log());
  }

  static toggleTaskStatus(req, res) {
    const id = req.body.id;

    const task = {
      done: req.body.done === "0" ? true : false,
    };

    console.log(task);

    Task.update(task, { where: { id: id } })
      .then(res.redirect("/tasks"))
      .catch((err) => console.log());
  }
};
//Dentro dessa função, há uma linha que diz "res.render("tasks/create")".
//Isso significa que o TaskController vai mostrar para você uma página chamada "create" que tem um formulário para você preencher com os detalhes da sua tarefa.
//Quando você terminar de preencher o formulário e clicar em um botão, o TaskController vai receber as informações que você colocou e pode fazer algo com elas.
//Por exemplo, ele pode salvar essas informações em algum lugar, como em um banco de dados, para que você possa acessá-las mais tarde.
