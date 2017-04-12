import mongoose from 'mongoose';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import cryptoJS from 'crypto-js';
import { INTERNAL_SERVER_KEY } from '../env/config';

const Schema = mongoose.Schema;
const Profile = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    passwordKey: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

Profile.statics.findAll = function profileStaticFindAll () {
    return new Promise((resolve, reject) => {
        this.find({}, (error, profiles) => {
            if (error) {
                reject(error);
            } else {
                resolve(profiles);
            }
        });
    });
};

Profile.statics.findByName = function profileStaticFindOne (username) {
    return new Promise((resolve, reject) => {
        this.findOne({
            username,
        }).then((profile) => {
            if (profile) {
                resolve(profile);
            } else {
                reject({
                    message: `User with username: ${username} is not founded.`,
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

Profile.statics.findById = function profileStaticFindById (id) {
    return new Promise((resolve, reject) => {
        this.findOne({
            _id: id,
        }).then((profile) => {
            if (profile) {
                resolve(profile);
            } else {
                reject({
                    message: `User with id: ${id} is not founded.`,
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

Profile.pre('save', function profilePreSave (next) {
    const user = this; // eslint-disable-line no-invalid-this

    if (!user.isModified('password')) {
        next();
    } else {
        bcrypt.genSalt(function profilePasswordSalt (error, salt) {
            if (error) {
                next(error);
            } else {
                //TO DO!!!!! How securly store server hash key?
                user.password = cryptoJS.HmacSHA512(user.password, INTERNAL_SERVER_KEY).toString(); //eslint-disable-line new-cap

                bcrypt.hash(user.password, salt, function profilePasswordSaltHash (error2, hash) {
                    if (error) {
                        next(error2);
                    } else {
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    }
});

Profile.methods.comparePassword = function profileComporePassword (candidatePassword, callback) {
    const hashedCandidatePassword = cryptoJS.HmacSHA512(candidatePassword, INTERNAL_SERVER_KEY).toString(); //eslint-disable-line new-cap

    bcrypt.compare(hashedCandidatePassword, this.password, function profileBcryptComparePasswords (error, isMatch) {
        if (error) {
            callback(error);
        } else {
            callback(null, isMatch);
        }
    });
};

export default mongoose.model('Profile', Profile);
