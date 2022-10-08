import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, nombre, token } = datos;
    
    await transport.sendMail({
        from: 'bienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en bienesraices.com',
        text: 'Confirma tu cuenta en bienesraices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienes racies</p>
            </br>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">confirmar Cuenta</a></p>
            </br>
            <p>Si tu no creaste esta cuenta puede ignorar el mensaje.</p>
        `
    })
};

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, nombre, token } = datos;
    
    await transport.sendMail({
        from: 'bienesRaices.com',
        to: email,
        subject: 'Reestable tu contraseña en bienesraices.com',
        text: 'Confirma tu cuenta en bienesraices.com',
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu contraseña en bienes racies</p>
            </br>
            <p>}sigue el siguiente enlace para generar una contraseña nueva <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/forgotPassword/${token}">Reestablecer Contraseña</a></p>
            </br>
            <p>Si tu no solicitaste cambiar la contraseña, puedes ignorar el mensaje.</p>
        `
    })
};

export { emailRegistro, emailOlvidePassword };
