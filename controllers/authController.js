const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.register = async (req, res) => {
    // Lógica de registro
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email ya registrado');

    // hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear nuevo usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
};


exports.login = async (req, res) => {
    // Lógica de inicio de sesión
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email o contraseña incorrectos');

    // Verificar contraseña
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email o contraseña incorrectos');

    // Crear y asignar un token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); 
};