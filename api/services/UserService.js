const User = require('../models/user');
const RefreshToken = require('../models/refresh-token');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../auth/passport.js');
const crypto = require('crypto');

class UserService {
    static async getAllUsers(role) {
        let find = {}
        role === 'SuperAdmin'
            ? find = ['SuperAdmin', 'Admin', 'Employee']
            : role === 'Admin' 
                ? find = ['Admin', 'Employee']
                : role === 'Employee'
                    ? find = ['Employee']
                    : find = ['']
        try {
            return await User.find({role: {$in: find}});
        } catch (error) {
            throw error;
        }
    }

    static async getUser(id, role) {
        try {
            let user = undefined;
            if (role === 'SuperAdmin'){
                user = await User.findOne({ _id: id });
            }
            else if (role === 'Admin') {
                user = await User.findOne({$and: [{ _id: id}, {role: ['Admin', 'Employee'] }]});
            }
            else user = await User.findOne({$and: [{ _id: id}, {role: role }]});
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async addUser(newUser) {
        try {
            const userToRegister = await User.findOne({ username: String(newUser.username),
                                                        email: String(newUser.email)});

            if (userToRegister) {
                return null;
            } else return await User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, updateUser) {
        try {
            let updatedUser = await User.findOneAndUpdate({ _id: id }, updateUser, {
                useFindAndModify: true,
            });

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const userToDelete = await User.findOneAndDelete(id);
            const disconnected = await RefreshToken.findOneAndDelete({_id: id});
            return userToDelete;
        } catch (error) {
            throw error;
        }
    }

    static async register(newUser) {
        try {
            const userToRegister = await User.findOne({$or: [
                {email: newUser.email},
                {username: newUser.username}
            ]});

            if (userToRegister) {
                return null;
            } else return await User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async login(userLogin, ipAdress) {
        try {
            let userToLogin = {};

            if (userLogin.username) {
                userToLogin = await User.findOne({
                    username: userLogin.username,
                });
            } else if (userLogin.email) {
                userToLogin = await User.findOne({
                    email: userLogin.email,
                });
            }

            if (!userToLogin || !bcrypt.compareSync(userLogin.password, userToLogin.password)) {
                return null;
            }

            const userToken = await RefreshToken.findOne({
                user: userToLogin._id,
            });

            let refreshToken = await createOrUpdateRefreshToken(userToLogin, ipAdress);

            const jwtToken = generateJwtToken(userToLogin);

            return { jwtToken, refreshToken: refreshToken.token };
        } catch (error) {
            throw error;
        }
    }

    static async refreshToken({ token, ipAddress }) {
        const refreshToken = await RefreshToken.findOne({ token }).populate('user');
        
        if (!refreshToken || !refreshToken.isActive) return null;

        const { user } = refreshToken;
        user.password = undefined

        const newRefreshToken = await createOrUpdateRefreshToken(user, ipAddress);

        const jwtToken = generateJwtToken(user);
        return { jwtToken, refreshToken: newRefreshToken.token };
    }

    static async disconnect(id) {
        try {
            let disconnected = await RefreshToken.findOneAndDelete({_id: id});
            
            return disconnected;
        } catch (error) {
            throw error;
        }
    }
}

function generateJwtToken(user) {
    return jwt.sign({ sub: user.id, id: user.id }, keys.variables.secretOrKey, {
        expiresIn: '1w',
    });
}

async function createOrUpdateRefreshToken(user, ipAddress) {
    return await RefreshToken.findOneAndUpdate(
        {
            _id: user._id,
        },
        {
            user: user._id,
            token: crypto.randomBytes(40).toString('hex'),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress,
        },
        { upsert: true, new: true }
    );
}

module.exports = UserService;
