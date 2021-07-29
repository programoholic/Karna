const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../../../../appconfig");
const { connectionString } = config;
import { Order } from "../../../../core/schema/orderSchema";
import { Student } from "../../../../core/schema/studentSchema";

import { ORDER_STATUS } from "../../../../core/common/constants";
let db = null;

export function createOrder(orderDetails, done) {
  mongoose.connect(
    connectionString.contact +
      "" +
      connectionString.port +
      "/" +
      connectionString.keyspace
  );
  db = mongoose.connection;
  db.on("error", () => {
    console.error.bind(console, "connection error:");
    return done(err, null);
  });
  db.once("open", async () => {
    try {
      const studentObj = await Student.findOne({ rollId: orderDetails.rollId });
        const student = studentObj.toJSON();
        console.log('order student : ', student);
        console.log('order student school : ', student.school);

      let order = new Order({
        rollId: orderDetails.rollId,
        className: student.className,
        status: ORDER_STATUS.CREATED,
        school: {
          registrationNumber: student.school.registrationNumber,
          name: student.school.name,
        },
        items: [...orderDetails.items],
        shippingAddress: { ...student.school.address },
        createdAt: new Date(),
        updatedAt: null,
      });
      const result = await order.save();
      releaseDB();
      return done(null, result);
    } catch (error) {
      releaseDB();
      console.log('code', error);
      if (error.code == "11000") {
        return done('One of the item already ordered!',null)
      }
      return done('Internal Server Error!', null);
    }
  });
}

function releaseDB() {
  db.close((err, succcess) => {
    if (err) console.log("failed to close");
    else console.log("closed successfully");
  });
}
