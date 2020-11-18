import { Apartment } from "../../../models/Apartment";
import chalkColors from "../../../config/chalk/variables";

const apartments = [
  {
    _id: "1",
    location: "kraków",
    category: "mieszkanie na sprzedaż",
    title: "A",
    description: "AA",
    rooms: 1,
    area: 10,
    price: 2500,
    priceCurrency: 250,
    floor: 0,
    numberOfFloors: 6,
  },
  {
    _id: "2",
    location: "warszawa",
    category: "mieszkanie na sprzedaż",
    title: "B",
    description: "BB",
    rooms: 2,
    area: 20,
    price: 2000,
    priceCurrency: 100,
    floor: 2,
    numberOfFloors: 5,
  },
];

// import { Resolvers } from "./resolvers-types";
// import { Apartment as ApartmentType } from "./resolvers-types";

export const resolvers = {
  Query: {
    apartment: async (_, args) => {
      return await Apartment.findById(args._id).exec();
    },
    apartments: async () => {
      return await Apartment.find({});
    },
  },
  Mutation: {
    createApartmentOffer: async (_, args) => {
      const {
        location,
        category,
        title,
        description,
        rooms,
        area,
        price,
        priceCurrency,
        floor,
        numberOfFloors,
      } = args.apartment;

      const apartment = new Apartment({
        location,
        category,
        title,
        description,
        rooms,
        area,
        price,
        priceCurrency,
        floor,
        numberOfFloors,
      });

      try {
        await apartment.save();

        return apartment;
      } catch (error) {
        console.error(chalkColors.error(error));

        throw new Error(error);
      }
    },
  },
};
