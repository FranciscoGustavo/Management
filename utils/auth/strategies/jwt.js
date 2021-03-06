const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserService = require('../../../components/Users/service');
const config = require('../../../config/index');

passport.use(
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function(tokenPayload, cb) {            
            try {
                const user = await UserService.findByEmail(tokenPayload.email);
                if(!user) {
                    return cb(new Error(''), false);
                }

                delete user.password;
                cb(null, { ...user, scopes: tokenPayload.scopes });
            } catch (error) {
                console.log('[ERROR AUTHENTICATE JWT]', error.message);
                cb(error);
            }
        }
    )
);