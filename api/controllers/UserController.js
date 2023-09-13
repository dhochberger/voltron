const UserService = require('../services/UserService');
const Util = require('../utils/Utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../auth/passport.js');

const util = new Util();

class UserController {
    static async getAllUsers(req, res) {
        
        try {
            const users = await UserService.getAllUsers(req.user.role);

            if (users.length > 0) {
                    for (const user of users) {
                        user.password = undefined;
                        user.username = undefined
                    }
                    util.setSuccess(200, 'Users retrieved', users);
                } else {
                    util.setError(404, 'No user found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getUser(req, res) {
        const { id } = req.params;

        try {
                const user = await UserService.getUser(id, req.user.role);

                if (!user) {
                    util.setError(404, `Cannot find user with the id ${id}`);
                } else {
                    user.username = undefined
                    user.password = undefined
                    util.setSuccess(200, 'Found user', user);
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getProfile(req, res) {
        req.user.password = undefined
        util.setSuccess(200, `Your profile`, req.user);
        return util.send(res);
    }

    static async updateProfile(req, res) {
        const alteredUser = req.body;

        if (!alteredUser) {
            util.setError(400, `Please enter a body`);
        }

        if (alteredUser.password) {
            alteredUser.password = bcrypt.hashSync(alteredUser.password, 10);
        }

        try {
            const updateUser = await UserService.updateUser(req.user.id, alteredUser);
            
            if (!updateUser) {
                util.setError(404, `Cannot find user with the id ${id}`);
            } else {
                if (updateUser.password) updateUser.password = undefined;
                util.setSuccess(200, `User updated ${updateUser.username}`, updateUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }

    static async deleteProfile(req, res) {

        try {
            const userFound = await UserService.deleteUser(req.user.id);

            if (userFound) {
                util.setSuccess(200, `User deleted ${req.user.id}`);
            } else {
                util.setError(404, `User with the id ${req.user.id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }

    static async updateUser(req, res) {
        let alteredUser = req.body;
        const { id } = req.params;

        if (alteredUser.password && id === req.user.id) {
            //Hash password
            var hashPassword = async function () {
                var hashPwd = await bcrypt.hash(alteredUser.password, 10);
                return hashPwd;
            };
            let pwd = await hashPassword();
            alteredUser.password = pwd;
        } else if (alteredUser.password && id !== req.user.id) {
            util.setError(403, 'Can\'t modify another user\'s password')
            return util.send(res);
        }

        if (req.user.id !== id) {
                if (req.user.role === 'Admin'){
                    let userRole = await UserService.getUser(id, req.user.role);
                    if (!userRole) {
                        util.setError(404, 'User doesn\'t exist')
                        return util.send(res);
                    } else if (userRole.role === 'SuperAdmin' || userRole.role === 'Admin') {
                        util.setError(403, 'Can\'t modify a SuperAdmin or Admin')
                        return util.send(res);
                    }
                }
            }

        try {
                const updateUser = await UserService.updateUser(id, alteredUser);

                if (!updateUser) {
                    util.setError(404, `Cannot find user with the id ${id}`);
                } else {
                    if (updateUser.password) updateUser.password = undefined;
                    util.setSuccess(200, `User updated ${updateUser.email}`, updateUser);
                }
                return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        
        if (req.user.id !== id) {
            if (req.user.role === 'Admin'){
                let userRole = await UserService.getUser(id, req.user.role);
                if (!userRole) {
                    util.setError(404, 'User doesn\'t exist or is SuperAdmin or Admin')
                    return util.send(res);
                }else if (userRole.role === 'SuperAdmin' || userRole.role === 'Admin') {
                    util.setError(403, 'Can\'t modify a SuperAdmin or Admin')
                    return util.send(res);
                }
            }
        }

        try {
                const userFound = await UserService.deleteUser(id);

                if (userFound) {
                    util.setSuccess(200, `User deleted ${id}`);
                } else {
                    util.setError(404, `User with the id ${id} cannot be found`);
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async register(req, res) {
        const newUser = req.body;

        if (!newUser.email || !newUser.username || !newUser.password) {
            util.setError(422, 'Please provide complete details');
            return util.send(res);
        }

        //Hash password
        var hashPassword = async function () {
            var hashPwd = await bcrypt.hash(newUser.password, 10);
            return hashPwd;
        };
        let pwd = await hashPassword();

        newUser.password = pwd;

        try {
            let userCreated = await UserService.register(newUser);

            if (!userCreated) {
                util.setError(409, 'This email or username already exists');
            } else {
                userCreated.password = undefined;

                util.setSuccess(201, `User ${userCreated.username} created`, userCreated);
            }

            return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }

    static async addUser(req, res) {
        const newUser = req.body;

        if (!newUser.email || !newUser.username || !newUser.password) {
            util.setError(422, 'Please provide complete details');
            return util.send(res);
        }

        //Hash password
        var hashPassword = async function () {
            var hashPwd = await bcrypt.hash(newUser.password, 10);
            return hashPwd;
        };
        let pwd = await hashPassword();
    }

    static async login(req, res) {
        const loginUser = req.body;

        if (!loginUser.username && !loginUser.email) {
            util.setError(422, 'Please provide an username or an email');
            return util.send(res);
        }
        if (!loginUser.password) {
            util.setError(422, 'Please provide a password');
            return util.send(res);
        }

        try {
            let userIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
            const data = await UserService.login(loginUser, userIp);

            if (data) {
                util.setSuccess(200, `User connected ${loginUser.username || loginUser.email}`, data);
            } else {
                util.setError(401, `Invalid username or password`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(500, `Internal error`);
            return util.send(res);
        }
    }

    static async refreshToken(req, res) {
        const token = req.body.refreshToken;
        const ipAdress = req.ip;

        if (!token) {
            util.setError(422, `Please provide a refresh token`);
            return util.send(res);
        }

        const data = await UserService.refreshToken({ token, ipAdress });

        if (!data) {
            util.setError(401, `Invalid refresh token`);
            return util.send(res);
        }

        util.setSuccess(201, `Token refreshed`, data);
        return util.send(res);
    }

    static async disconnect(req, res) {

        try {
            const userToDelete = await UserService.disconnect(req.user.id);
            if (userToDelete) {
                util.setSuccess(200, `User ${req.user.username} logged out`);
            } else {
                util.setError(401, `User ${req.user.username} couldn't be logged out`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }
}

module.exports = UserController;
