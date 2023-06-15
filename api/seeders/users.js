const User = require('../models/user');
const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

async function usersSeeder() {
    const superadmin = await User.find({role:'SuperAdmin'})
    if (superadmin.length<=0) {
        let hashPwd = await bcrypt.hash('VoltronVinesPwd', 10);
        await User.create({role:'SuperAdmin', firstname:"Super", lastname:"Admin", email: 'superadmin@vines.com', username:'rootSuperAdmin', password:hashPwd})
    }
    const admin = await User.find({role:'Admin'})
    if (admin.length<=0) {
        let hashPwd = await bcrypt.hash('AdminPwd', 10);
        await User.create({role:'Admin', firstname:"Admin", lastname:"Common", email: 'firstadmin@vines.com', username:'firstAdmin', password:hashPwd})
    }
}

exports.usersSeeder = usersSeeder()