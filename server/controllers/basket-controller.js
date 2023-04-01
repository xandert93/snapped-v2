import { Basket, Product } from '../models/index.js';
import { toObjectId } from '../utils/mongoose-utils.js';
import { ForbiddenError, NotFoundError } from '../utils/error-types.js';

export const getUsersBasket = async (req, res) => {
  const userId = toObjectId(req.userId);

  const pipeline = [
    { $match: { userId } },
    { $unset: ['__v'] },
    // `$lookup` and `$addFields` stages are identical to that in `getReqUsersOrders`
    {
      $lookup: {
        from: 'products',
        let: { priceIds: '$lineItems.priceId' },
        pipeline: [
          { $match: { $expr: { $in: ['$priceId', '$$priceIds'] } } },
          { $project: { name: 1, price: 1, imageURL: { $arrayElemAt: ['$imageURLs', 0] } } },
        ],
        as: 'products',
      },
    },
    {
      $addFields: {
        // overwrites previous `products` field, so we don't `$unset` it here
        products: {
          $map: {
            input: { $zip: { inputs: ['$lineItems', '$products'] } },
            in: { $mergeObjects: '$$this' },
          },
        },
      },
    },
    { $unset: ['lineItems'] },
  ];

  const [foundBasket] = await Basket.aggregate(pipeline);

  return res.json({ basket: foundBasket });
};

export const addLineItemToUsersBasket = async (req, res) => {
  const { basket } = req;
  const { priceId } = req.body;
  let { quantity } = req.body;

  const item = basket.lineItems.find((item) => item.priceId === priceId);

  if (item) quantity += item.quantity;

  const foundProduct = await Product.checkStock(priceId, quantity);

  if (item) item.quantity = quantity; // mutates item=Obj in `basket`
  else basket.lineItems.push({ priceId, quantity });

  const updatedBasket = await basket.save();

  // stripped `product` suitable for FE <Basket> display
  const basketProduct = {
    priceId,
    name: foundProduct.name,
    imageURL: foundProduct.imageURLs[0],
    price: foundProduct.price,
    quantity,
  };

  return res.json({ message: 'Added to Basket', basketProduct });
};

export const removeLineItemFromUsersBasket = async (req, res) => {
  const { basket } = req;
  const { priceId } = req.body;

  basket.lineItems = basket.lineItems.filter((item) => item.priceId !== priceId);
  const updatedBasket = await basket.save();

  return res.json({ message: 'Removed from Basket' });
};

export const adjustBasketLineItemQuantity = async (req, res) => {
  const { basket } = req;
  const { priceId, incValue } = req.body;

  const item = basket.lineItems.find((item) => item.priceId === priceId);

  item.quantity += incValue; // mutates item=Obj in `basket`

  // if user is attempting to add more of same item to basket, check stock count before saving mutation
  if (incValue > 0) await Product.checkStock(priceId, item.quantity);

  const updatedBasket = await basket.save();

  return res.sendStatus(204);
};

export const clearUsersBasket = async (req, res) => {
  const { basket } = req;

  basket.lineItems = [];
  const updatedBasket = await basket.save();

  return res.json({ message: 'Basket cleared' });
};
