import { User } from "./models/user";
import { Order } from "./models/order";
import bcrypt from "bcryptjs";

// reterns a user object of a given user ID
const user = async userID => {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      _id: user.id,
      createdOrders: orders.bind(this, user._doc.createdOrders)
    };
  } catch (err) {
    throw err;
  }
};

// reterns a order objects for a given array of order IDs
const orders = async orderIds => {
  try {
    const orders = await Order.find({ _id: { $in: orderIds } });
    orders.map(order => {
      return {
        ...order._doc,
        _id: order.id,
        creator: user.bind(this, order.creator)
      };
    });
    return orders;
  } catch (err) {
    throw err;
  }
};
// contains all the code graphQL needs when accessing
// and/or creating objects
export const resolvers = {
  Query: {
    users: () => User.find(),
    orders: () =>
      Order.find()
        .then(orders => {
          return orders.map(order => {
            return {
              ...order._doc,
              _id: order.id,
              creator: user.bind(this, order._doc.creator)
            };
          });
        })
        .catch(err => {
          throw err;
        })
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        // only make new user when that user doesnt exist
        const user = await User.findOne({ email: args.userInput.email });
        if (user) {
          throw new Error("User exists already");
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const input = {
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword
        };
        const newUser = new User(input);
        await newUser.save().then(result => {
          console.log(result);
        });
        return newUser;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createOrder: async (_, args) => {
      // hard coded creator id for now.
      // TODO update for actual creator
      const input = {
        restaurant: args.orderInput.restaurant,
        foodItems: args.orderInput.foodItems,
        price: args.orderInput.price,
        creator: "5db736a0a98dce57d83a992b"
      };
      const newOrder = new Order(input);
      await newOrder.save();

      try {
        // once order is created, find creator and add the order
        // to their history of orders
        const user = await User.findById("5db736a0a98dce57d83a992b");
        if (!user) {
          throw new Error("User not found");
        }
        user.createdOrders.push(newOrder);
        await user.save();

        return newOrder;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
