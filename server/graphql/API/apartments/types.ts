export const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    apartment(_id: ID!): Apartment
    apartments: [Apartment!]
  }

  type Mutation {
    createApartmentOffer(apartment: ApartmentInput!): Apartment!
    uploadFiles(files: [Upload!]): Boolean!
  }

  input ApartmentInput {
    location: String!
    category: String!
    title: String!
    description: String!
    rooms: Int!
    area: Float!
    price: Float
    priceCurrency: Float
    floor: Int!
    numberOfFloors: Int!
  }

  type Apartment {
    _id: ID!
    location: String!
    category: String!
    title: String!
    description: String!
    rooms: Int!
    area: Float!
    price: Float
    priceCurrency: Float
    floor: Int!
    numberOfFloors: Int!
  }
`;
