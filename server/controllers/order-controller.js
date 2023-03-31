import { Order } from '../models';

export const getOrders = async (req, res) => {
  //*** obviously add some kind of pagination too - page number or an offset
  const foundOrders = await Order.find();

  return res.json({ orders: foundOrders });
};

export const getReqUsersOrders = async (req, res) => {
  const { customerId } = req;

  const pipeline = [
    {
      $match: { customerId },
    },
    { $unset: ['__v'] },
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
        products: {
          // see here: https://stackoverflow.com/questions/74382671/how-to-add-entity-field-to-joined-documents?noredirect=1#comment131317447_74382671
          $map: {
            input: { $zip: { inputs: ['$lineItems', '$products'] } }, // pairs up [ [ lineItem, product ], ... ]
            in: { $mergeObjects: '$$this' }, // we then map over the input array, performing an Object merge on each of it's elements
            // the Object merge is possible since lineItem=Obj and product=Obj. `lineItem` contains the desired `quantity` that we want to add to `product`
          },
        },
      },
    },
    { $unset: ['lineItems'] },
  ];

  const foundOrders = await Order.aggregate(pipeline);

  return res.json({ orders: foundOrders });
};

export const getOrder = async (req, res) => {
  //*** requesting user should only be able to access their orders. Admin should be able to access any
  const { order } = req;

  return res.json({ order });
};
