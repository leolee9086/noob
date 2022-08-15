const Sequelize =  require('sequelize')
const user = sequelize.define('user', {
    id: {
      type: DataTypes.TEXT,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password:{
        type: DataTypes.TEXT,
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avator:{
        type: DataTypes.TEXT,
        defaultValue: '',

    }
  })

  
  export default models
  