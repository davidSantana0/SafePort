function validation() {
    const inputEmail = document.querySelector('#inputEmail')
    const inputPassword = document.querySelector('#inputPassword')


    if (!inputPassword || !inputEmail) {
        console.log("Um dos inputs não foi encontrado no DOM.")
        return false
    }

    const senha = inputPassword.value.trim()
    const email = inputEmail.value.trim()


    if (!senha || !email) {
        console.log('Preencha os campos')
        return false
    }

    if (senha.length < 8) {
        console.log('A senha tem que ter no minimo 8 caracter')
        alert("sua senha tem que ter no minimo 8 digitos")
        return false
    }
    return true
}

async function login() {
    const URL = 'http://localhost:3000/login'

    const dados = {
        email: document.querySelector('#inputEmail').value.trim(),
        senha: document.querySelector('#inputPassword').value.trim()
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(dados)
        })

        const contentType = response.headers.get('content-type')

        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Resposta não é JSON')
        }


        const data = await response.json()
        console.log(data)
        if (data.user && data.user.id) {
        } else {
            console.log("Usuário inválido na resposta do servidor")

        }

        const devHosts = ['localhost', '127.0.0.1']
        const baseURL = devHosts.includes(window.location.hostname)
            ? 'http://localhost:3000'
            : window.location.origin

        const userId = data.user.id

        if (response.ok) {
            window.location.href = `${baseURL}/home/${userId}`
        } else {
            alert(data.error || 'Erro no login')
            console.log(`Erro no login ${data}`)
        }

    } catch (erro) {
        console.error('Erro no fetch:', erro)
    }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault()
    validacaoFormulario(e)
})

function validacaoFormulario(event) {
    const loginValido = validation()

    if (!loginValido) {
        return
    }

    // console.log('Login realizado com sucesso')
    login()
}
