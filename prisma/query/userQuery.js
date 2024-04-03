const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const saveUser = async (user) => {
    try {
        await prisma.User.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password,
                actif: true
            }
        }).then(() => {
            prisma.$disconnect()
        })

    } catch (error) {
        prisma.$disconnect()
        throw new Error("422")
    }
}

const singIn = async (email) => {
    const user = await prisma.User.findUnique({
        where: { email }
    }).finally(() => {
        prisma.$disconnect()
    })

    if (!user) throw new Error("404")
    return user
}

const setStatus = async (email, status) => {
    await prisma.User.update({
        where: {
            email: email
        },
        data: {
            actif: status
        }
    }).catch((err) => {
        throw new Error("404")
    }).finally(() => {
        prisma.$disconnect()
    })
}

const findUsersActif = async () => {
    const users = await prisma.User.findMany({ where: { actif: true }, select:{email: true, username: true, password: false, actif: true}}).finally(() => {
        prisma.$disconnect()
    })
    return users;
}

module.exports = { saveUser, singIn, findUsersActif, setStatus }