const Actor = require('../models/actor');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const bcrypt = require('bcryptjs');

const getActors = async (req,res,next) => {

    let actor;
    try {
        actor = await Actor.find({},'-password');
    } catch (err) {
    const error = new HttpError(
        err,
        500
    );
    return next(error);
    }
    res.json({ actor });
    

}

const login =  async (req, res, next) => {

    const { email, password } = req.body;
 
    let existingActor;

    try {
        existingActor = await Actor.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
        'Compte inexistant .!',
        500
        );
        return next(error);
    }
    
    if (!existingActor) {
        const error = new HttpError(
        'Utilisateur Inexistant',
        401
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingActor.password);
    } catch (err) {
      const error = new HttpError(
        "Nom d'utilisateur ou mot de passe incorrecte",
        500
      );
      return next(error);
    }
    
    if (!isValidPassword) {
      const error = new HttpError(
        "Mot de passe incorrecte",
        401
      );
      return next(JSON.stringify(error));
    //  return next(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }

    res.json({
        actorId : existingActor.id,
        name : existingActor.name,
        email: email
    });

};


const logout =  async (req, res, next) => {

    

};



const signup =  async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const {name, email, password , roleadmin , image} = req.body;
    
    let existingActor;
    try {
        existingActor = await Actor.findOne({email: email});
    }
    catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later',
            500
        );
        return next(error);
    }

    if (existingActor) {
        const error = new HttpError(
            'Utilisateur déjà existant !!',
            422
        );
        return next(error);
    }
    
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        'Could not create user, please try again.',
        500
      );
      return next(error);
    }
    const createdActor = new Actor({
        name,
        email,
        password: hashedPassword,
        roleadmin:roleadmin
    }); 

    try {
        await createdActor.save();
    } catch (err) {
        
        const error = new HttpError(
            'Signing up failed, please try again later',
             500
        );
        return next(error);
    }

    res
    .status(201)
    .json({ actorId : createdActor.id,actorName: createdActor.name, email: createdActor.email });
};

exports.login = login;
exports.logout = logout;
exports.signup = signup;
exports.getActors = getActors;