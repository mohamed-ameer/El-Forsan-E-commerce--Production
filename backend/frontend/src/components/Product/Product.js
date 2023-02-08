import React from 'react'
import { Card ,Button} from 'react-bootstrap'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { addToCart} from '../../actions/cartActions'
import { useAlert } from 'react-alert'
import { useDispatch} from 'react-redux'

function Product({ product }) {
    const [t,i18n]=useTranslation();
    const alert = useAlert();
    const dispatch = useDispatch();

    const addToCartHandler = (id,qty) => {
        if (id) {
            dispatch(addToCart(id, qty))
            alert.show(
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                    <symbol id="check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </symbol>
                    </svg>
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="15" height="15" fill="green" role="img" aria-label="Success:"><use href="#check-circle-fill"/></svg>
                        <div>
                        {i18n.language == 'ar'?`تم اضافه ${product.name_ar} إلي عربه الشراء`:`Success: You have added ${product.name} to your shopping cart!`}
                        </div>
                    </div>
                </>
                )
        }
    }
    return (
        <Card className="my-3 rounded shadow product-home-card">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} style={{maxHeight:"300px"}}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <strong>{i18n.language == 'ar' ?product.name_ar:product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="">
                        <Rating value={product.rating} text={`${product.numReviews}`} color={'#4e7726'} />
                    </div>
                </Card.Text>


                <Card.Text as="h5" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                {i18n.language == 'ar' ?`${product.price} جنيه`:`${product.price} EGP`}
                </Card.Text>
                <Button
                    onClick={()=>addToCartHandler(product._id,1)}
                    className='btn btn-custom-color btn-lg w-100'
                    disabled={product.countInStock == 0}
                    type='button'>
                    {i18n.language == 'ar'?'أضف إلي السله':'Add to Cart'}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Product
