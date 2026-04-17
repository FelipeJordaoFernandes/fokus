const addTaskBt = document.querySelector('.app__button--add-task')
const taskForm = document.querySelector('.app__form-add-task')

const textArea = document.querySelector('.app__form-textarea')

const ulTarefas = document.querySelector('.app__section-task-list')

const tasks = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tasks))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    const imagemBotao = document.createElement('img')

    imagemBotao.setAttribute('src', 'imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
}

addTaskBt.addEventListener('click', () => {
    taskForm.classList.toggle('hidden')
})

taskForm.addEventListener('submit', (evento) => {
    evento.preventDefault(); 
    const task = {
        descricao: textArea.value
    }
    tasks.push(task)
    const elementoTarefa = criarElementoTarefa(task)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    taskForm.classList.add('hidden')
})

tasks.forEach(task => {
    const elementoTarefa = criarElementoTarefa(task)
    ulTarefas.append(elementoTarefa)
});

const cancelTaskBt = document.querySelector('.app__form-footer__button--cancel')
const limparFormulario = () => {
    textArea.value = ''
    taskForm.classList.add('hidden')
}

cancelTaskBt.addEventListener('click', limparFormulario)