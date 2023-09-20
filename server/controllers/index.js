const register = require('./register');
const login = require('./login');
const getUserById = require('./getUserById');
const stripe = require('./stripe');

module.exports = {
    register,
    login,
    getUserById,
    stripe,
};