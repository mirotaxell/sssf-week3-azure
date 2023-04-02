import {ObjectId} from 'mongoose';
// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import {Cat} from '../../interfaces/Cat';
import CatModel from '../models/catModel';
import rectangleBounds from '../../utils/rectangleBounds';
import {locationInput} from '../../interfaces/Location';
import {User} from '../../interfaces/User';
import {Types} from 'mongoose';

export default {
  Query: {
    cats: async () => {
      return await CatModel.find();
    },
    catById: async (_parent: undefined, args: Cat) => {
      return await CatModel.findById(args.id);
    },
    catsByOwner: async (_parent: undefined, args: String) => {
      console.log('catsByOwner: ', args);
      return await CatModel.find({
        owner: {
          id: args,
        },
      });
    },
    catsByArea: async (_parent: undefined, args: locationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await CatModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },
  Mutation: {
    createCat: async (_parent: undefined, args: Cat) => {
      const cat = new CatModel(args);
      return await cat.save();
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      return await CatModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteCat: async (_parent: undefined, args: Cat) => {
      return await CatModel.findByIdAndDelete(args.id);
    },
  },
};
