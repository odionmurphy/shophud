import { DataTypes, Model } from "sequelize";
import { db } from "../libs/db.ts";

class Category extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare icon: string;
  declare createdAt: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "Category",
    tableName: "categories",
  },
);

export { Category };
