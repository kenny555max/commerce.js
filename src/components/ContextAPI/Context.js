import { createContext, useState } from 'react';
import commerce from '../../lib/commerce';

const initialState = {};

const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const addToCart = async (productId, quantity) => {
        try {
            const { cart } = await commerce.cart.add(productId, quantity);

            setCarts(cart);
        } catch (error) {
            console.log(error);
        }
    }

    const generateToken = async (cartId) => {
        try {
            const token = await commerce.checkout.generateToken(cartId, { type: 'cart' });

            setCheckoutToken(token);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await commerce.products.list();

            setProducts(data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCart = async () => {
        try {
            const cart = await commerce.cart.retrieve();

            setCarts(cart);
        } catch (error) {
            console.log(error);
        }
    }

    const decrementCartItem = async (cartId, quantity) => {
        try {
            const { cart } = await commerce.cart.update(cartId, { quantity });

            setCarts(cart);
        } catch (err) {
            console.log(err);
        }
    }

    const incrementCartItem = async (cartId, quantity) => {
        try {
            const { cart } = await commerce.cart.update(cartId, { quantity });

            setCarts(cart);
        } catch (err) {
            console.log(err);
        }
    }

    const removeCartItem = async (cartId) => {
        try {
            const { cart } = await commerce.cart.remove(cartId);

            setCarts(cart);
        } catch (err) {
            console.log(err);
        }
    }

    const emptyCart = async () => {
        try {
            await commerce.cart.empty();

            setCarts([]);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <GlobalContext.Provider value={{
            addToCart,
            setProducts,
            products,
            carts,
            activeStep,
            setCarts,
            fetchProducts,
            fetchCart,
            decrementCartItem,
            incrementCartItem,
            removeCartItem,
            emptyCart,
            generateToken,
            checkoutToken,
            commerce,
            setActiveStep,
            order,
            setOrder,
            setErrorMessage,
            errorMessage
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalContext;