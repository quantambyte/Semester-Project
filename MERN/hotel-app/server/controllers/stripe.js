import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";

// stripe
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // find user from db
  // if user don't have stripe id generate new one
  // create login link based on account id
  // update payment schedule

  // find user
  const user = await User.findById(req.user._id).exec();

  // if user doesn't have stripe id
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });

    user.stripe_account_id = account.id;
    user.save();
  }

  // create login link based on account id
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  // pre fill information
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  console.log(`Account Linked ${accountLink}`);

  // sending response to client side
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  res.send(link);
};
