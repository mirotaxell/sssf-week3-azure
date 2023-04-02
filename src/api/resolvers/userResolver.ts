// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import {User} from '../../interfaces/User';
import UserModel from '../models/userModel';
import {Cat} from '../../interfaces/Cat';

export default {
  Cat: {
    owner: async (parent: Cat) => {
      return await UserModel.findById(parent.owner);
    },
  },
  Query: {
    users: async () => {
      return await UserModel.find();
    },
    userById: async (_parent: undefined, args: User) => {
      return await UserModel.findById(args.id);
    },
  },
  Mutation: {
    createUser: async (_parent: undefined, args: User) => {
      const user = new UserModel(args);
      return await user.save();
    },
    updateUser: async (_parent: undefined, args: User) => {
      return await UserModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteUser: async (_parent: undefined, args: User) => {
      return await UserModel.findByIdAndDelete(args.id);
    },
  },
};
