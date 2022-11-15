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
/*Final calendario*/

let titulo = document.querySelector('#input-titulo');
let descricao = document.querySelector('#input-descricao');
let data = document.querySelector('#input-data');
let btnadd = document.querySelector('#btn-add ');
let listatarefa= document.querySelector('#listatarefa');


btnadd.addEventListener('click', (e) =>{

    let tarefa = {
        nome : titulo.value,
        data : data.value,
        id: gerarid(),
    }
    adicionartarefa(tarefa);
});

function gerarid(){
    return Math.floor(Math.random()*3000);
}

function adicionartarefa(tarefa){

    let li = criartag(tarefa);
    listatarefa.appendChild(li);

}

function criartag(tarefa){

    let li = document.createElement('li');

    let titulospan = document.createElement('span');
    titulospan.classList('texto-tarefa');
    titulospan.innerHTML = tarefa.nome;

    let dataspan = document.createElement('span');
    dataspan.classList('data-tarefa');
    dataspan.innerHTML = tarefa.data;

    let div = document.createElement('div');

    let btneditar = document.createElement('button');
    btneditar.classList.add('btnacao');
    btneditar.innerHTML = 'Editar';


    let btnexcluir = document.createElement('button');
    btnexcluir.classList.add('btnacao');
    btnexcluir.innerHTML = 'Excluir';

    div.appendChild(btneditar);
    div.appendChild(btnexcluir);

    li.appendChild(titulospan);
    li.appendChild(dataspan)
    li.appendChild(div);
    return li;

}

