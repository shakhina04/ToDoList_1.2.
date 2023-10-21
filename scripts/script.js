
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
//   .then((res) => reload(res));

let form = document.querySelector(".todoask");
let inp = form.querySelector("#todo");
let container = document.querySelector(".box");
// modal
let modal = document.querySelector(".modal");
let h2 = modal.querySelector("h2");
let modal_form = modal.querySelector("form");
let modal_inp = modal.querySelector("input");
let modal_close = modal.querySelector(".close");
// modal

const base_url = "http://localhost:8080";


let todos = [
  {
    id: Math.random(),
    title: "buy milk",
    isDone: false,
    time:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
  },
  {
    id: Math.random(),
    title: "End the project",
    isDone: false,
    time:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
  },
];

form.onsubmit = (e) => {
  e.preventDefault();

  let todo = {
    id: Math.random(),
    title: inp.value,
    isDone: false,
    time:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
  };

  let user = { name: inp.value };

  fetch(base_url + "/users", {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
        form.reset()
    //   console.log(res);

      fetch(base_url + "/users")
        .then((res) => res.json())
        // .then((res) => reload(todo));

    }
  });
  
    // .then(res => console.log(res))
  

  todos.push(todo);

  reload(todos);
};

reload(todos);

function reload(arr) {
  container.innerHTML = "";

  for (let todo of arr) {
    // a
    let item = document.createElement("div");
    let wrapper = document.createElement("div");
    let info = document.createElement("div");
    let title_text = document.createElement("span");
    let time = document.createElement("span");
    let clsButton = document.createElement("button");
    let img = document.createElement("img");

    // b

    if (todo.isDone === true) {
      title_text.classList.add("done");
    } else {
      title_text.classList.remove("done");
    }

    item.classList.add("item");
    wrapper.classList.add("wrapper");
    info.classList.add("info");
    title_text.classList.add("title");
    time.classList.add("time");
    clsButton.classList.add("del");

    img.src = "img/cls.svg";
    img.alt = "cls";

    title_text.textContent = todo.title;
    time.innerHTML = todo.time;

    // c
    item.append(wrapper);
    wrapper.append(info, clsButton);
    info.append(title_text, time);
    clsButton.append(img);

    container.append(item);

    // d
    title_text.onclick = () => {
      // todo
      todo.isDone = !todo.isDone;

      title_text.classList.toggle("done", todo.isDone);
    };

    item.ondblclick = () => {
      modal.classList.add("show");
      h2.innerHTML = `Title: ${todo.title}`;
      modal_inp.setAttribute("placeholder", `change: ${todo.title}`);

      modal_form.onsubmit = (e) => {
        e.preventDefault();

        todo.title = modal_inp.value;
        todo.time =
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds();

        title_text.innerHTML = todo.title;

        modal_form.reset();
        modal.classList.remove("show");
      };
    };

    clsButton.onclick = () => {
      let idx = todos.indexOf(todo);
      todos.splice(idx, 1);
      item.classList.add("remove-anim");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let txt = todo.title

      fetch(base_url + "/users/" + todo.id, {
        method: "delete"
      }).then(res => {
        if (res.status == 200 || res.status == 201) {
            txt.remove()
        }
      })

    };
  }
}

modal_close.onclick = () => {
  modal_form.reset();
  modal.classList.remove("show");
};

// CRUD
// create
// read
// update
// delete
