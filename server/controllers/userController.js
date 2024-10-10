require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {Users} = require('../models/models');

const generadeJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res) {
        const {login, name, surname, patronymic, email, password, role} = req.body;
        try {
            const existingUserByLogin = await Users.findOne({where: {login}});
            const existingUserByEmail = await Users.findOne({where: {email}});
    
            if(existingUserByLogin) {
                return res.status(400).json({message: 'Пользователь с таким login уже зарегистрирован'});
            }
    
            if(existingUserByEmail) {
                return res.status(400).json({message: 'Пользователь с таким email уже зарегистрирован'});
            }
    
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({
                login, name, surname, patronymic, email, password: hashedPassword, role
            });
            const token = generadeJwt(user.id, user.login, user.role);
            return res.status(200).json({message: 'Пользователь зарегистрирован', user, token});
        } catch(e) {
            console.log(e);
            return res.status(500).json({message: 'Ошибка сервера'});
        }
    };    

    async login (req, res) {
        const {login, password} = req.body;

        try {
            const user = await Users.findOne({where: {login}})
            if(!user) {
                return res.status(404).json({message: 'Пользователь с таким login не зарегистирован'});
            }
    
            const comparePassword = await bcrypt.compare(password, user.password)
            if(!comparePassword) {
                return res.status(400).json({message: 'Не верный пароль'});
            }
    
            const token = generadeJwt(user.id, user.email, user.role)
            return res.status(200).json({message: 'Пользователь авторизован', user, token, role: user.role})
        } catch (e) {
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async check (req, res) {
        const token = generadeJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }   
}

module.exports = new UserController()