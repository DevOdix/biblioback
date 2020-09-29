const Livre = require('../models/livre');
const HttpError = require('../models/http-error');
const { uuid } = require('uuid/v4');

const addLivre = async (req,res,next) => {

    const {ident,nomLivre,descriptionLivre,mode} = req.body;
    //const livreId = req.params.livreId ; 

    if (mode == 'UPDATE') {
        let livre;
        
        try {
            livre = await Livre.findOne({ident : ident});
         
        }
        catch (err){
            const error = new HttpError(
                'Livre inexistant .!',
                500
                );
                return next(err);
        }

        livre.nomLivre = nomLivre;
        livre.descriptionLivre = descriptionLivre;
        
        try {
            await livre.save();
        } catch (err) {
            
            const error = new HttpError(
                'Updates up failed, please try again later',
                500
            );
            return next(err);
        }

        res.status(201).
                json({livre : livre});

    }
    else {
        let existingLivre;

        try {
            existingLivre = await Livre.findOne({ident : ident});
        }
        catch (err) {
            const error = new HttpError(
            'Livre inexistant .!',
            500
            );
            return next(err);
        }

        if (!existingLivre){ 
            const createdLivre = new Livre({
                ident,
                nomLivre,
                descriptionLivre
            });

            try {
                await createdLivre.save();
            } catch (err) {
                
                const error = new HttpError(
                    'Created up failed, please try again later',
                    500
                );
                return next(err);
            }
            
            res.status(201).
                json({livre : createdLivre});
        }
    }
    

}

const updateLivre = async (req,res,next) => {


}

const getLivres = async (req,res,next) => {

    let livres;
    try {
        livres = await Livre.find({});
    } catch (err) {
    const error = new HttpError(
        err,
        500
    );
    return next(error);
    }
    res.json({livres});
    

}

exports.getLivres = getLivres;
exports.addLivre = addLivre;