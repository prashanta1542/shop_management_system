const sequelize = require('../connection');
const Sequelize = require('sequelize');


const StaffReg = sequelize.define('staffreg', {
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
        type: Sequelize.STRING,
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

const Login = sequelize.define('login', {
    staffid: {
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

const costtype = sequelize.define('typescost', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    costs: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})
const costs = sequelize.define('cost', {
    costid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
function staffmodelsync(req, res) {
    sequelize.sync({alter:true})
        .then(() => {
            res.send('Product table created successfully');
        })
        .catch((error) => {
            res.send('Error occurred');
            console.error('Unable to create product table:', error);
        });
}


module.exports = {
    staffmodelsync,
    StaffReg,
    Login,
    costs,
    costtype,

};
