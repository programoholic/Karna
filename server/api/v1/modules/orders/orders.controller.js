import { createOrder } from "./orders.service";

export function create(orderPayload, done) {
  createOrder(orderPayload, (err, result) => {
    if (err) {
      return done(err, null);
    } else {
      return done(null, result);
    }
  });
}
