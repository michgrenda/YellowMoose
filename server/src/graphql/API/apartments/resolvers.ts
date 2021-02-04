import { createWriteStream, unlink } from "fs";
import shortid from "shortid";
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

const UPLOAD_DIR = "./uploads";

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
    uploadFiles: async (_, args) => {
      const resolvedFiles = await Promise.allSettled(args.files);
      console.log(resolvedFiles);
      resolvedFiles.forEach(async (resolvedFile) => {
        const { createReadStream, filename, mimetype } = resolvedFile.value;
        const stream = createReadStream();
        const id = shortid.generate();
        const path = `${UPLOAD_DIR}/${id}-${filename}`;
        const file = { id, filename, mimetype, path };
        try {
          // Store the file in the filesystem.
          await new Promise((resolve, reject) => {
            // Create a stream to which the upload will be written.
            const writeStream = createWriteStream(path);

            // When the upload is fully written, resolve the promise.
            writeStream.on("finish", resolve);

            // If there's an error writing the file, remove the partially written file
            // and reject the promise.
            writeStream.on("error", (error) => {
              unlink(path, () => {
                reject(error);
              });
            });

            // In Node.js <= v13, errors are not automatically propagated between piped
            // streams. If there is an error receiving the upload, destroy the write
            // stream with the corresponding error.
            stream.on("error", (error) => writeStream.destroy(error));

            // Pipe the upload into the write stream.
            stream.pipe(writeStream);
          });
        } catch (error) {
          console.error(chalkColors.error(error));

          throw new Error(error);
        }
      });

      return true;
    },
  },
};
