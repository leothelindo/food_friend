import { User } from "./models/user";
import { Order } from "./models/order";
import bcrypt from "bcryptjs";

export const resolvers = {
  Query: {
    helloWorld: () => "hello world",
    users: () => User.find(),
    orders: () => Order.find()
  },

  Mutation: {
    createUser: async (_, args) => {
      var input;
      await bcrypt
        .hash(args.userInput.password, 12)
        .then(hashedPassword => {
          console.log("hash complete");
          input = {
            name: args.userInput.name,
            email: args.userInput.email,
            password: hashedPassword
          };
        })
        .catch(err => {
          console.log(err);
          throw err;
        });

      const newUser = new User(input);
      await newUser
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
      return newUser;
    },
    createOrder: async (_, args) => {
      const input = {
        restaurant: args.orderInput.restaurant,
        foodItems: args.orderInput.foodItems,
        price: args.orderInput.price
      };
      const newOrder = new Order(input);
      await newOrder
        .save()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
      return newOrder;
    }
  }
};
