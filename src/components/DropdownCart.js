import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addToCart, substractToCart, checkoutCart } from './../redux/actions/cart';
import { useDispatch } from "react-redux";
import './DropdownCart.css';

export default function DropdownCart(props) {
    const dispatch = useDispatch();
    const { cart } = props.cartData;
    const arrMono = []
    const getQty = (arr, id) => {
        arrMono.push(id)
        return arr.filter(x => x.id === id).length;
    }

    const addItem = (id) => {
        dispatch(addToCart(id))
    }

    const substractItem = (id) => {
        dispatch(substractToCart(id))
    }

    const checkoutToCart = () => {
        console.log("A pagar")
        dispatch(checkoutCart())
    }

    return (
        <>
            {console.log("cart", cart)}
            {cart.cart_items !== undefined ? <>
                <div className="totalCart">Total: <span>{cart.total}</span></div>
                <hr className="separadorCartDrop" />
                {cart.cart_items.map((el, index) => (
                    arrMono.includes(el.id) ? null :
                        <div className="menuItemCart" key={index}>
                            <div className="rowCartProduct">
                                <div className="colCartProduct1">
                                    <div className="addCart" onClick={() => addItem(el.id)}><AddIcon /></div>
                                    <div className="subsCart" onClick={() => substractItem(el.id)}><RemoveIcon /></div>
                                </div>
                                <div className="colCartProduct2">
                                    <div className="titleCartProduct">{el.name}</div>
                                    <div className="rowDetailedCart">
                                        <div className="cartPriceProduct">{el.price}</div>
                                        <div className="quantityPriceProduct">Qty: <span>{getQty(cart.cart_items, el.id)}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
                <hr className="separadorCartDrop" />
                <div
                    onClick={()=>checkoutToCart()}
                    className="buttonCheckoutCart">
                    Finalitzar compra
                        </div>
            </> : null}
        </>
    )
}
