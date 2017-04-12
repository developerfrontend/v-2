import passport from 'passport';
import { Strategy } from 'passport-local';
import Profile from '../models/profile';

export function setupProfilePassportStrategy () {
    passport.use( new Strategy({
        usernameField: 'username',
        passwordField: 'password',
    }, function passportLocalStrategy (username, password, done) {
        Profile.findOne({
            username,
        }).then((profile) => {
            profile.comparePassword(password, function passwordComparisonCallback (error, isMatch) {
                if (error) {
                    done(error);
                } else if (isMatch) {
                    done(null, {
                        username: profile.username,
                        id: profile._id,
                        message: 'Success',
                    });
                } else {
                    done(null, false, {
                        code: 404,
                    });
                }
            });
        }).catch((error) => {
            done(error);
        });
    }));

    passport.serializeUser(function passportSerializeProfile (profile, done) {
        done(null, profile.id);
    });

    passport.deserializeUser(function passportDeserializeProfile (id, done) {
        Profile.findById(id).then((profile) => {
            done(null, profile);
        }).catch(done);
    });
}
