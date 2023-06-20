const server = require("./src/app.js");
const { sequelize } = require("./src/db");

server.listen(3001, () => {
  sequelize.sync({ alter: true }); //Elimina tabla al sincronizarse // alter no borra informacion
  console.log("listening on port 3001");
});
