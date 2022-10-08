import { check, validationResult } from 'express-validator'
import { generateId } from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'

import Usuario from '../models/Usuario.js'

const login = (req, res) => {
    res.json('login')
}

const register = async (req, res) => {

    const { nombre, email, password } = req.body

    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no es un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe ser de minimo 6 caracteres').run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const existeUsuario = await Usuario.findOne({ where: { email } })
    if (existeUsuario) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generateId()
    })

    // Email confimacion
    const { token } = usuario;
    emailRegistro({ nombre, email, token })

    res.json({ msg: 'Usuario creado correctamente, hemos enviado un Email de confirmacion', usuario })
}

const confirmar = async (req, res) => {

    const { token } = req.params

    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.status(400).json({ msg: 'Hubo en error al confirmar tu cuenta, intenta de nuevo' });
    }

    usuario.token = null;
    usuario.confirmado = true;

    await usuario.save();

    return res.status(200).json({ msg: 'La cuenta se confirmo correctamente' });

}

const forgotPassword = async (req, res) => {

    await check('email').isEmail().withMessage('Eso no es un email').run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
        return res.status(400).json({ msg: 'El email no pertenece a ningun usuario' });
    }

    usuario.token = generateId();
    await usuario.save();

    // Email 
    emailOlvidePassword({ nombre: usuario.nombre, email: usuario.email, token: usuario.token })

    res.json({ msg: 'Hemos enviado un email con las instrucciones' })
}

const comprobarToken = (req, res, next) => {
    next();

}
const nuevoPassword = (req, res) => {

}

export {
    login,
    register,
    confirmar,
    forgotPassword,
    comprobarToken,
    nuevoPassword
}