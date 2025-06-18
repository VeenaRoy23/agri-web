// models/SoilData.js
module.exports = (sequelize, DataTypes) => {
  const SoilData = sequelize.define('SoilData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ph: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    organicMatter: {
      type: DataTypes.FLOAT,
      field: 'organic_matter',
      allowNull: false
    },
    nitrogen: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    phosphorus: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    potassium: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    }
  }, {
    tableName: 'soil_data',
    timestamps: true
  });

  return SoilData;
};
