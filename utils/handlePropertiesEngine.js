const ENGINE_DB = process.env.ENGINE_DB;

const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  /**------------------------------------------------------------------
   * | Dependiendo de la varible de entorno tomariamos mysql o nosql
   * ------------------------------------------------------------------*/
  return data[ENGINE_DB];
};

module.exports = getProperties;
