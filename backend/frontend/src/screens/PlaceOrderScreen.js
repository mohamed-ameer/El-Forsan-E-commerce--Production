import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {
    const [t,i18n]=useTranslation();
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }else if (success) {
                navigate(`/order/${order._id}`)
                dispatch({ type: ORDER_CREATE_RESET })
            }
    }, [success, navigate,userInfo])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-4" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                    <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item " aria-current="page"><Link to='/cart'>{i18n.language == 'ar'?'العربه':'cart'}</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item active" aria-current="page">{i18n.language == 'ar' ? 'تقديم عمليه الشراء' : 'Proceed To Checkout' }</li>
                </ol>
            </nav> 
            <CheckoutSteps step1 step2 step3 step4 />
            <Row style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                <Col md={8}>
                    <ListGroup >
                        <ListGroup.Item>
                            <h2>{i18n.language == 'ar'?'بيانات الشحن':'Shipping'}</h2>

                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>{i18n.language == 'ar'?'عنوان التسليم : ':'address :'}</strong></Col>
                                    <Col> {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>{i18n.language == 'ar'?'الايميل : ':'email :'}</strong></Col>
                                    <Col>{cart.shippingAddress.email}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>{i18n.language == 'ar'?'رقم الهاتف : ':'Phone no :'}</strong></Col>
                                    <Col>{cart.shippingAddress.phone}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{i18n.language == 'ar'?'طريقه الدفع ':'Payment Method '}</h2>
                            <p>
                                <strong>{i18n.language == 'ar'?'عن طريق : ':'Method :'}</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{i18n.language == 'ar'?'المنتجات المطلوبه : ':'Order Items :'}</h2>
                            {cart.cartItems.length === 0 ? <Message variant='warning'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup >
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row className='align-items-center'>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col md={2}>
                                                        <Link to={`/product/${item.product}`}>{i18n.language == 'ar'?item.name_ar:item.name}</Link>
                                                    </Col>

                                                    <Col md={8}>
                                                        <div>{i18n.language == 'ar'?'الكميه المطلوبه : ':'Quantity :'} {item.qty}</div>
                                                        <div>{i18n.language == 'ar'?` سعر القطعه : ${item.price} جنيه`:`Price/item : ${item.price} EGP`}</div>
                                                        <div>{i18n.language == 'ar'?` السعر الكلي : ${(item.qty * item.price).toFixed(2)} جنيه`:`total price : ${(item.qty * item.price).toFixed(2)} EGP`}</div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup >
                            <ListGroup.Item>
                            <h2>{i18n.language == 'ar'?'ملخص الطلبيه(الفاتوره)':'Order Summary'}</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'تكلفه المنتجات :':'Items Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${cart.itemsPrice} جنيه`:`${cart.itemsPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'مصاريف الشحن : ':'Shipping Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${cart.shippingPrice} جنيه`:`${cart.shippingPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'الضرايب :':'Tax :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${cart.taxPrice} جنيه`:`${cart.taxPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'التكلفه الكليه :':'Total Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${cart.totalPrice} جنيه`:`${cart.totalPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-custom-color w-100'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    {i18n.language == 'ar'?'ارسل الطلب':'Place Order'}
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
