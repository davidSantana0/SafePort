import bcrypt from 'bcrypt'

export async function kryptoPassword(senha) {
    const saltRounds = 10
    const hash = await bcrypt.hash(senha, saltRounds)
    return hash
}

export async function comparePassword(senha, senhaHash) {
    const isMatch = await bcrypt.compare(senha, senhaHash)
    return isMatch
}