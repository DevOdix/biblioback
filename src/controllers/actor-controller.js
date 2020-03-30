const Actor = require('../models/actor');

const login =  async (req, res, next) => {

    const { email, password } = req.body;

    alert('email : ' + email);

};


const logout =  async (req, res, next) => {



};



const signup =  async (req, res, next) => {



};

exports.login = login;
exports.logout = logout;
exports.signup = signup;