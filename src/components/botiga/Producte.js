import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import { addToCart } from '../../redux/actions/cart';
import ImageCarousel from './ImageCarousel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './Producte.css';

export default function ProducteDialog(props) {
    const { onClose, selectedValue, open, dataRow } = props;
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:640px)');


    const [activeSize, setActiveSize] = useState("S")

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleAddClick = () => {
        dispatch(addToCart(dataRow.id))
        handleClose();
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            {!isMobile && (<>
                <Card className="cardProducteGeneral">
                    <div className="insideFrameModal">
                        <ClearIcon className="crossCloseProducteModal" onClick={handleClose} />
                        <br />
                        <div className="row topProductBlock">
                            <div className="column_productTitle1">
                                <div className="productTitleModal" id="simple-dialog-title">
                                    {dataRow.name}
                                </div>
                            </div>
                            <div className="column_productTitle2">
                                <div className="cardPriceProducteBigBox">
                                    {dataRow.price}€
                            </div>
                            </div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="productImageBox">
                        <div className="columnProductImage1">
                            <CardMedia
                                component="img"
                                alt={dataRow.name}
                                className="imageProductModal"
                                image={dataRow.images === undefined ? null : dataRow.images[0]}
                                title={dataRow.name}
                            />
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="sizeProductDetailed row">
                        <div className="column">
                            <span className="mainProducteWordBoxCard">
                                DESCRIPCIÓ &nbsp;
                            </span>
                            <div className="sizesBox">
                                {["S", "M", "L", "XL"].map((el) => (
                                    <div className={activeSize === el ? "sizeProductBox-active" : "sizeProductBox"} key={el} onClick={() => setActiveSize(el)}>
                                        {el}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="column">
                            <CardActions>
                                <button size="small" className="buttonCartProductBoxCard" color="inherit" onClick={() => { handleAddClick(dataRow.id) }}>
                                    <ShoppingCartIcon className="buttonCartProductIconBoxCard" /><span className="buttonTextProductBoxCard">AFEGIR A CISTELLA</span>
                                </button>
                            </CardActions>
                        </div>
                        <hr className="solid" />
                    </div>
                </Card>
            </>)}
            {isMobile && (
                <Card className="cardProducteGeneralMbl">
                    <ClearIcon className="close-modal" onClick={handleClose} />
                    <div className="frame-margin-modal">
                        <hr className="thin" />
                        <div className="title-modal">
                            {dataRow.name}
                        </div>
                        <hr className="thin" />
                        <div className="img-modal">
                            <ImageCarousel imgList={dataRow.images}/>
                        </div>
                        <hr className="thin" />
                        <div className="description-modal">
                            <span className="description-modal-title">
                                DESCRIPCIÓ
                            </span>
                            <p className="description-modal-content">
                                {dataRow.description}
                            </p>
                        </div>
                        <hr className="thin" />
                        <div className="sizes-modal">
                            <span className="sizes-modal-title">
                                <PeopleAltIcon /> TALLES DISPONIBLES / &nbsp;
                            </span>
                            {["S", "M", "L", "XL"].map((el) => (
                                <div className={activeSize === el?"sizes-modal-button-active":"sizes-modal-button"} key={el} onClick={() => setActiveSize(el)}>
                                    {el}
                                </div>
                            ))}
                        </div>
                        <div className="submit-button-modal">
                            <button size="small" className="submit-button-modal-button" color="inherit" onClick={() => { handleAddClick(dataRow.id) }}>
                                <ShoppingCartIcon className="submit-button-modal-icon-cart" /><span className="submit-button-modal-button-text">AFEGIR A CISTELLA - {dataRow.price}€</span>
                            </button>
                        </div>
                    </div>
                </Card>
            )}
        </Dialog>
    );
}