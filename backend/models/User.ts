import { DataTypes, Model } from "sequelize";
import validator from "validator";

import { db } from "../libs/db.ts";

class User extends Model {
  declare email: string;
  declare password: string;
  declare role: "user" | "admin";
}

User.init(
  {
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must be valid email",
        },
        notNull: {
          msg: "Email can not be empty",
        },
        len: {
          args: [5, 255],
          msg: "Email must be at least 5 characters and less then 255 characters",
        },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [8, 32],
          msg: "Password must be between 8 and 32 characters",
        },

        onlyAllowCertainCharacters(value: string) {
          const check = validator.isAlphanumeric(value); // ä, ü
          if (!check) {
            throw new Error("Password must only contain Letters and Numbers");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize: db, // connect model to database
    modelName: "User",
    tableName: "users",
  },
);

export { User };
