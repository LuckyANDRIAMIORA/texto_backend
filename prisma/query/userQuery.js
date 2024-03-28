const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

let saveUser = async (user) => {
    try {
        await prisma.User.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password
            }
        }).then(() => {
            prisma.$disconnect()
        })

    } catch (error) {
        prisma.$disconnect()
        throw new Error("422")
    }
}

let singIn = async (email) => {
    const user = await prisma.User.findUnique({
        where: { email }
    })

    if(!user) throw new Error("404")
    return user
}

module.exports = { saveUser, singIn }