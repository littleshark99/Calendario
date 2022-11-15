// seleção de elementos
const todoform = document.querySelector('#todo-form');
const todoinput = document.querySelector('#todo-input');
const todoinputdata = document.querySelector('#todo-input-data');
const todolist = document.querySelector('#todo-list');
const editform = document.querySelector('#edit-form');
const editinput = document.querySelector('#edit-input');
const canceleditbtn = document.querySelector('#cancel-edit-btn');

let oldinputvalue;


//função
const savetodo = (Text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todotitle = document.createElement('h3');
    todotitle.innerHTML = Text;
    todo.appendChild(todotitle);

    const tododata = document.createElement('h4');
    tododata.innerHTML = Text;
    todo.appendChild(tododata);

    const donebtn =  document.createElement("button");
    donebtn.classList.add("finish-todo");
    donebtn.innerHTML = 'Feito';
    todo.appendChild(donebtn);

    const editbtn =  document.createElement("button");
    editbtn.classList.add("edit-todo");
    editbtn.innerHTML = 'Editar';
    todo.appendChild(editbtn);

    const deletebtn =  document.createElement("button");
    deletebtn.classList.add("remove-todo");
    deletebtn.innerHTML = 'Excluir';
    todo.appendChild(deletebtn);

    todolist.appendChild(todo);

    todoinput.value = "";
    todoinputdata.value = "";
    
};

const toggleforms = () =>{
    editform.classList.toggle("hide");
    todoform.classList.toggle("hide");
    todolist.classList.toggle("hide");

}

const updatetodo = (Text) =>{

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        
        let todotitle = todo.querySelector("h3");

        if(todotitle.innerText === oldinputvalue){
            todotitle.innerText = Text;
        }

    });

}



// eventos
todoform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const inputvalue = todoinput.value;
    const inputdata = todoinputdata.value;
    
    if(inputvalue && inputdata){
        
        savetodo(inputvalue ,inputdata);
        
    }

});

document.addEventListener("click", (e)=>{

    const targetel = e.target;
    const parentel = targetel.closet("div");
    let todotitle;

    if(parentel && parentel.querySelector("h3")){
        todotitle = parentel.querySelector("h3").innerText;
    }

    if(targetel.classList.contains("finish-todo")){
            parentel.classList.toggle("done");

    }

    if(targetel.classList.contains("remove-todo")){
        parentel.remove();
    }

    if(targetel.classList.contains("edit-todo")){
        toggleforms();

        editinput.value = todotitle;
        oldinputvalue = todotitle;
    }

});

canceleditbtn.addEventListener("click",(e)=>{
    e.preventDefault();

    todoform();
});

editform.addEventListener("submit", (e)=>{
    e.preventDefault();

    const editinputvalue = editinput.value;

    if(editinputvalue){
        updatetodo(editinputvalue)
    }
    toggleforms();

});

// inicio calendario
document.addEventListener('DOMContentLoaded',function(){
    const monthsBR = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const tabledays = document.getElementById('dias');    

    function getDaysCalendar(mes,ano){
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;

        let primeiroDayWeek = new Date(ano,mes,1).getDay();
        let ultimoDayMonth = new Date(ano,mes+1,0).getDate();

        for(var i = -primeiroDayWeek,index = 0; i < (35-primeiroDayWeek); i++,index++){
            let dt = new Date(ano,mes,i);
            let dtnow = new Date();
            let dayTable = tabledays.getElementsByTagName('td')[index];
            dayTable.classList.remove('mes-anterior');
            dayTable.classList.remove('proximo-mes');
            dayTable.classList.remove('dia-atual');            
            dayTable.innerHTML = dt.getDate();

            if(dt.getFullYear() == dtnow.getFullYear() && dt.getMonth() == dtnow.getMonth() && dt.getDate() == dtnow.getDate()){
                dayTable.classList.add('dia-atual');
            }

            if(i < 1){
                dayTable.classList.add('mes-anterior');
            }
            if(i > ultimoDayMonth){
                dayTable.classList.add('proximo-mes');
            }
        }
    }

    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    getDaysCalendar(mes,ano);

    const botaoant = document.getElementById('btn-prev');
    const botaoprox = document.getElementById('btn-next');

    botaoprox.onclick = function(){
        mes++;
        if(mes >11){
            mes = 0;
            ano++;
        }
        getDaysCalendar(mes,ano);
    }
    botaoant.onclick = function() {
        mes--;
        if(mes < 0){
            mes = 11;
            ano--;
        }
        getDaysCalendar(mes,ano);
    }    

    getDaysCalendar(1,2022);
});  