import { DataTypes, BuildOptions, Model } from 'sequelize';
import { sequelize } from '../sequelize';

interface IUser {
    firstname: string
    lastname: string
    email: string
    password: string
    role: string
}
export interface UserModel extends Model<IUser>, IUser {}
export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};
export const User: UserStatic = sequelize.define('User', {
firstname: DataTypes.STRING,
lastname: DataTypes.STRING,
email: DataTypes.STRING,
password: DataTypes.STRING,
role: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'users'
})


