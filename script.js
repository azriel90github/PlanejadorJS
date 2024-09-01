//objet {}
const atividade = {
    nome : 'Visitar os Lençóis Maranhenses',
    data : new Date('2024-07-12 07:30'),
    finalizada: false
}

// lista, array, vetor = []
//lista de atividades (simulação de um banco de dados)
let listaAtividades = [
    atividade,
    {
        nome: 'Devocional',
        data: new Date('2024-07-11 08:00'),
        finalizada: true
    },
    {
        nome : 'Estudar a beira mar',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Nadar na Piscina',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Visitar',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Fazer Compras',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Passear',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Cinema',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Estudio',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Programar',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    },
    {
        nome : 'Correr na Praia',
        data : new Date('2024-07-10 07:00'),
        finalizada: true
    }
]

//listaAtividades = []

//formatação da data
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            extenso: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}


//função para criar as atividades (colocar no formato ideal para a visualização do usuário)
const criarItemAtividades = (att) => {
    let input = `
    <input type="checkbox" 
    onchange = "concluirAtividade(event)"
    value = "${att.data}" ` //valor único para cada checkbox (facilitar a localização do input para mudar o estado - checked ou nao)
    
    if (att.finalizada) {
        input += `checked`;
    } 
    input += `>`;

    const formatar = formatador(att.data)

    return ` 
   <div class="card-bg">
        ${input}

        <div>
        <img src="assets/check-ativo.svg" class="ativo">
        <img src="assets/check-inativo.svg" class="inativo">
        <span>${att.nome}</span>
        </div>

        <time class="short">
        ${formatar.dia.extenso.curto},
        ${formatar.dia.numerico} <br>
        ${formatar.hora}
        </time>
        <time class="full">
        ${formatar.dia.extenso.longo},
        dia ${formatar.dia.numerico}
        de ${formatar.mes}
        às ${formatar.hora}
        </time>
    </div>
   `;
}

//função para atualizar a visualização das atividades e add na página
const atualizarListaAtividades = () => {
    const section = document.querySelector('section');
    section.innerHTML = ''
    
    //verificar se a lista está vazia
    if (listaAtividades.length == 0) {
        section.innerHTML = '<p>Nenhuma atividade cadastrada.</p>'
        return
    }
    
    for (let i in listaAtividades) {
        section.innerHTML += criarItemAtividades(listaAtividades[i]);
    }

}
atualizarListaAtividades()

// função para salvar a atividade registrada pelo usuário no form
// será executada no clique do botão 
const salvarAtividade = (event) => {
    event.preventDefault()

    //coleta dos dados do formulário (objet)
    const dadosForm = new FormData(event.target)

    //coleta específica dos dados de cada campo do form
    const nome = dadosForm.get('atividade')
    const dia = dadosForm.get('dia')
    const hora = dadosForm.get('hora')
    const data = `${dia} ${hora}`

    //criação de um novo objeto contendo todos os dados da nova atividade cadastrada pelo user
    const novaAtividade = {
        nome, //simplificação pois o nome da propriedade e do valor é o mesmo
        data,
        finalizada: false
    }

    //o find irá procurar dentro da lista de atividades se existe alguma atividade com a mesma data (dia e hora) da nova atividade
    //ele testará a novaAtividade com todos os itens da lista, um por vez
    const atividadeExistente = listaAtividades.find((atividadesPresentes) => {
        return atividadesPresentes.data == novaAtividade.data
    })
    
    //se retornar false é porque não existe atividades na mesma data, logo não entrará nesse if e o user poderá cadastra-lá. 
    //se retornar true é porque existe, logo ele entrará nesse if, que irá retornar a função com um alert que não permitirá o cadastro dessa atividade
    if (atividadeExistente) {
        return alert('Dia/Hora não disponível!')
    }

    // os '...' adiciona as atividades antigas da lista
    listaAtividades = [novaAtividade, ...listaAtividades]
    atualizarListaAtividades()

}

// função para criar as opções de dias da viagem do user
// no momento as datas não são dinâmicas
const criarSelecaoDias = () => {
    let diasViagem = [
        "2024-03-07",
        "2024-03-08",
        "2024-03-09",
        "2024-03-10",
        "2024-03-11",
        "2024-03-12",
        "2024-03-13",
        "2024-03-14",
        "2024-03-15",
        "2024-03-16",
        "2024-03-17",
        "2024-03-18",
        "2024-03-19"
    ]

    let diasSelecao = ''
    
    for(let dia of diasViagem) {
        // esse for será executado para cada item da lista diasViagem
        // a variável dia irá armazenar um item por vez

        // o conteúdo armazenado em 'dia' será enviado para a função formatador. Este irá retornar um objeto com todas as formatações definidas do dia que está sendo trabalhado, e isso será armazenado na variável formatar
        const formatar = formatador(dia)

        // será acessado as propriedades desejadas no objeto armazenado em formatar, nesse caso acessaremos a propriedade numerico da propriedade dia, que formata a data 2024-03-19 para 19, e também o mês escrito por extenso, nesse exemplo será março. 
        // essa formatação da data, para o formato desejado, será guardada na variável diaFormatado
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
        
        //após esse processo, será add um option em diasSelecao com o dia formatado
        diasSelecao += `<option value="${dia}">${diaFormatado}</option>`
    }

    //acessa o select do html que possui o name "dia" e adiciona o conteúdo da variável diasSelecao na página html
    document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}

criarSelecaoDias()

//função para criar todas as opções de hora, de meia em meia hora
const criarSelecaoHora = () => {
    let horasDisponiveis = ''

    for (let i=5; i < 23; i++) {
        //transformação do i (int) em string para formatar a hora
        //padStart irá preencher o inicio da string i caso ele não tenha 2 caracteres
        //ou seja, números menores que 10 deverão ser preenchidos com o 0 (valor informado) para que tenha 2 caracteres, deixando o formato da hora em 05:00 
        //logo, se for de 10 para cima, não precisará do 0 na frente
        //resultado: numeros < 10 (06:00) | numeros >= 10 (15:00)

        const addZeroHora = String(i).padStart(2,'0')

        horasDisponiveis += `<option value="${addZeroHora}:00">${addZeroHora}:00</option>`
        horasDisponiveis += `<option value="${addZeroHora}:30">${addZeroHora}:30</option>`
    }

    document.querySelector('select[name= "hora"]').innerHTML = horasDisponiveis
}
criarSelecaoHora()


//função para dar um check ou remover o check e manter a mudança feita nos inputs
const concluirAtividade = (event) => {
    //o value do input checkbox é a data, pois só é permitido uma atividade por dia e hora, tornando esse valor único para cada input
    const input = event.target //localiza o input checkbox que foi clicado
    const dataDesseInput = input.value

    //estando com o ID do input armazenado, o método find irá procurar na lista de atividades se tem alguma atividade registrada com essa mesma data
    const checkAtividade = listaAtividades.find((check) => {
        return check.data == dataDesseInput
    })

    //se não encontrar uma atividade com a mesma data do checkbox (valor dele), apenas irá retornar para a execução do código
    if (!checkAtividade) {
        return
    }

    //mas se encontrar a atividade com mesma data, significa que o user clicou no checkbox, logo o valor da propriedade finalizada (do objeto atividade) precisa inverter o seu valor
    //se era true, deve virar false. Se era false, deve virar true
    //para isso, usa-se a exclamação (!) que inverte o valor guardado, em boolen, e depois substituiremos na propriedade finalizada

    checkAtividade.finalizada = !checkAtividade.finalizada
}