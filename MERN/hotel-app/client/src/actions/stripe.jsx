import axios from "axios";

export const createConnectAccount = async (token) => {
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
