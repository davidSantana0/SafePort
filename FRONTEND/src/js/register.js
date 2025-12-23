// Bolinha de informação
document.querySelectorAll('.help-icon').forEach(icon => {
    icon.addEventListener('click', e => {
        e.preventDefault()


        const idIcon = icon.id

        let tooltipId = ''
        if (idIcon === 'ajudaData') tooltipId = 'ajudaDataNascimento'
        else if (idIcon === 'ajudaGenero') tooltipId = 'ajudaGeneroTexto'

        const tooltip = document.getElementById(tooltipId)

        if (!tooltip) return


        if (tooltip.style.display === 'block') {
            tooltip.style.display = 'none'
        } else {
            document.querySelectorAll('.tooltip-ajuda').forEach(t => t.style.display = 'none')
            tooltip.style.display = 'block'
        }
    })
})

document.addEventListener('click', e => {

    if (!e.target.closest('.help-icon') && !e.target.closest('.tooltip-ajuda')) {
        document.querySelectorAll('.tooltip-ajuda').forEach(t => t.style.display = 'none')
    }
})



// Validaçao da Senha 
function conferirSenha() {

    const confirmPassword = document.querySelector("#confirmaSenha")
    const passwordInput = document.querySelector("#inputSenha")

    const confirmarSenha = confirmPassword.value.trim()
    const senha = passwordInput.value.trim()


    if (!confirmPassword || !passwordInput) {
        console.log("Um dos inputs não foi encontrado no DOM.")
        return false
    }

    if (!confirmarSenha || !senha) {
        console.log("Preencha os campos!")
        return false
    }

    if (senha.length < 8) {
        alert('A senha precisa ter no mínimo 8 caracteres!')
        return false
    }

    if (senha !== confirmarSenha) {
        console.log('Confirme a sua senha!');
        return false
    }

    console.log("Senha válida e confirmada!")
    console.log("Cadastro realizado com sucesso!")

    return true
}


// Validação do Gênero 
function conferirGenero() {

    const generos = document.querySelectorAll('input[name="sex"]')
    let valorGenero = null

    generos.forEach((genero) => {
        if (genero.checked) {
            valorGenero = genero.value
        }
    })


    if (!valorGenero) {
        console.log("Gênero não selecionado")
        alert("Por favor, selecione um gênero.")
        return false
    }

    if (valorGenero === "1") {
        console.log("Feminino")
    } else if (valorGenero === "2") {
        console.log("Masculino")
    } else if (valorGenero === "3") {
        console.log("Anônimo")
    }

    return true

}

// Validação de Idade
function conferirIdade() {
    const inputNascimento = document.querySelector("#dataNascimento")
    const dataNascimento = new Date(inputNascimento.value)
    const anoNascimento = dataNascimento.getFullYear()
    const anoAtual = new Date().getFullYear()


    if (!inputNascimento.value) {
        console.log("Data de nascimento não preenchida!")
        return false
    }


    if (anoNascimento > anoAtual) {
        alert('Ano de nascimento inválido!')
        console.log('Tá bom senhor do futuro')
        return false
    }

    const idade = anoAtual - anoNascimento

    if (idade < 10) {
        console.log("Você precisa ter no minimo 10 anos de idade")
        alert("Você precisa ter no minimo 10 anos de idade")
        return false
    }

    return true

}

async function enviarCadastro() {
    const URL = 'http://localhost:3000/register'

    const dados = {
        nome: document.querySelector('#inputName').value.trim(),
        data_nascimento: document.querySelector('#dataNascimento').value.trim(),
        genero: document.querySelector('input[name="sex"]:checked')?.value || null,
        email: document.querySelector('#inputEmail').value.trim(),
        senha: document.querySelector('#inputSenha').value.trim(),
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        const data = await response.json()
        const userId = data.user.id

        const devHosts = ['localhost', '127.0.0.1']
        const baseURL = devHosts.includes(window.location.hostname)
            ? 'http://localhost:3000'
            : window.location.origin


        if (response.ok) {
            window.location.href = `${baseURL}/home/${userId}`
        } else {
            alert(data.message || data.error || 'Error no cadastro')
            console.log('Erro no cadastro:', data)
        }
        return data
    } catch (err) {
        console.log(`Erro no fetch: ${err}`)
    }
}


function validacaoFormulario() {
    const generoValido = conferirGenero()
    const idadeValida = conferirIdade()
    const senhaValida = conferirSenha()


    if (!generoValido || !idadeValida || !senhaValida) {
        return
    }
    enviarCadastro()
    console.log("Cadastro Realizado com sucesso!")


}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        validacaoFormulario(event)
    })
})