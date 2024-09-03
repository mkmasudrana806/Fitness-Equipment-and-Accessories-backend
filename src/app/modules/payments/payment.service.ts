import { Payment } from "./payment.model";
import { JwtPayload } from "jsonwebtoken";

// get all payments history
const allPaymentsHistoryFromDB = async () => {
  const result = await Payment.find({});
  return result;
};

// get user payments history
const userPaymentsHistoryFromDB = async (userData: JwtPayload) => {
  const result = await Payment.find({ userId: userData.userId });
  return result;
};

// update payments status
const updatePaymentStatusIntoDB = async (
  id: string,
  payload: { status: string }
) => {
  const result = await Payment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


export const PaymentServices = {
  allPaymentsHistoryFromDB,
  userPaymentsHistoryFromDB,
  updatePaymentStatusIntoDB,
};
