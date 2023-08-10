import '@/styles/globals.css'
import store, { persistor } from "@/Redux/store";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import "../styles/globals.css"
export default function App({ Component, pageProps }) {
  return<>
    <Provider store={store}>   
  <PersistGate loading={null} persistor={persistor}>
  <Component {...pageProps} />
  </PersistGate>
  
  </Provider>   
  </>
}
