import { CartProvider } from "use-shopping-cart";
// import getStripe from "../lib/stripe/getStripe";

export default function Cart({ children }) {
  return (
    <CartProvider
      mode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency={"cad"}
    >
      {children}
    </CartProvider>
  );
}
