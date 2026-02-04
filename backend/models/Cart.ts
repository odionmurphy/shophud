import { DataTypes, Model } from "sequelize";
import { db } from "../libs/db.ts";

class Cart extends Model {
  declare id: number;
  declare userId: number;
  declare productId: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "Cart",
    tableName: "carts",
  },
);

export { Cart };
