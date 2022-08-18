const Sequelize =  require('sequelize')
const {DataTypes} =  require('sequelize')

const sequelize = new Sequelize("database", null, null, {
  dialect: "sqlite",
  storage: `${naive.pathConstructor.initFilep(
    `${naive.workspaceDir}\\conf\\naiveConf\\naiveDB.db`
  )}`,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  host: "localhost",
  // dialectModule: sqlite3
});

const user = sequelize.define("user", {
  id: {
    type: DataTypes.TEXT,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  avator: {
    type: DataTypes.TEXT,
    defaultValue: "none",
  },
  user_group: {
    type: DataTypes.TEXT,
    defaultValue: "visitor",
  },
});
const   models={
  user:user
}

async function checkAdmin(){
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  
  await sequelize.sync({ alter: true });
  let admin = await models.user.findAll({
    where: { user_group: "admin" },
  });
  if (!admin[0]) {
    noAdminUser = true;
    naive.dbNoUser = true;
  }
}
  
module.exports={
  sequelize:sequelize,
  checkAdmin:checkAdmin,
  models:models
}
  