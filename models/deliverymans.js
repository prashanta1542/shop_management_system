const sequelize = require('../connection');
const Sequelize = require('sequelize');

const deliverymanreg = sequelize.define('deliverymandetail', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pstree: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phouse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pCity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ppostoffice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ppostcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parstree: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parhouse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parCity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parpostoffice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parpostcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobilenumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alternatenumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    officenumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    joiningdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

const Login = sequelize.define('deliverystafflogin', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
const Schedule = sequelize.define('schedule', {

    staffId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    startsTime: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
            const startsTime = new Date(this.getDataValue('startsTime'));
            return startsTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
    },
    endsTime: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
            const endsTime = new Date(this.getDataValue('endsTime'));
            return endsTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
    }
});
const weeklySchedule = sequelize.define('weekday', {
    staffid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    day1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    day2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    day3: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
const LoginState = sequelize.define('loginState', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    state: {
        type: Sequelize.ENUM('active', 'scheduled'),
        allowNull: false,
        defaultValue: 'scheduled'
    }

});

const paymentInfo = sequelize.define('deliverymanpaymentinfo', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    paymeenttype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bakshnumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    netpay: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

const Report = sequelize.define('deliveryreport', {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    otp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    reporttype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const jobs = sequelize.define('jobs', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    deliverymanid:{
        type: Sequelize.STRING,
        allowNull: false
    },
    order_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false,
        // get() {
        //     const endsTime = new Date(this.getDataValue('scheduled'));
        //     return endsTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }

})
const Ondelivery = sequelize.define('ondelivery', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    deliverymanid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'true',
    }
})
function deliverymodelsync(req, res) {
    sequelize.sync({ alter: true })
        .then(() => {
            res.send('Delivery table created successfully');
        })
        .catch((error) => {
            res.send('Error occurred');
            console.error('Unable to create customer table:', error);
        });
}

module.exports = {
    weeklySchedule,
    deliverymanreg,
    Login,
    Schedule,
    LoginState,
    paymentInfo,
    Report,
    jobs,
    deliverymodelsync,
    Ondelivery,
}