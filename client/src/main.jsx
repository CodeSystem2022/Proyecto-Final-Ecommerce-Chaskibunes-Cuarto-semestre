import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./reducer/store.js";
const stripePromise = loadStripe(
  "pk_test_51Npt3zEFfNI88I7omJZFIFjtpY86dqMfiyb02o5ASzGCzvUZ5fzX5sLiQHBpNrBbEE6Bq9eQQYDC7akaSseG09FX009dqQ5dV4"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Provider>
  </React.StrictMode>
);
