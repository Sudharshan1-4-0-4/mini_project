import React, { useState, createContext} from 'react';

const cartContext = createContext({
    cartList: [],
    
    nameAdd : () => {},
    addCartItem : () => {},
    deleteCartItem : () => {},
})

export default cartContext;