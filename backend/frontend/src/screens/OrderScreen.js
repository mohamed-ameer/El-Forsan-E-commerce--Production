import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link ,useNavigate,useParams} from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const {id} = useParams()
    const [t,i18n]=useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay, successDeliver,userInfo])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                    {userInfo && userInfo.isAdmin &&
                        <nav aria-label="breadcrumb" className="mb-4">
                            <ol className="breadcrumb"  style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                                <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    Home</Link></li>
                                <li className="breadcrumb-item text-center" aria-current="page">/</li>
                                <li className="breadcrumb-item "><Link to='/admin/orderlist'>Orders List</Link></li>
                                <li className="breadcrumb-item text-center" aria-current="page">/</li>
                                <li className="breadcrumb-item active"><Link>{order._id}</Link></li>                                      
                            </ol>
                        </nav>
                    }
                    {userInfo && !userInfo.isAdmin &&
                        <nav aria-label="breadcrumb" className="mb-4">
                            <ol className="breadcrumb"  style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                            <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                            <li className="breadcrumb-item text-center" aria-current="page">/</li>  
                            <li className="breadcrumb-item" aria-current="page"><Link to='/profile'>{i18n.language == 'ar'?'بيانات المستخدم':'Profile'}</Link></li>
                            <li className="breadcrumb-item text-center" aria-current="page">/</li>                                   
                            <li className="breadcrumb-item ">{i18n.language == 'ar'?'الطلب بالرمز رقم :':'Order ID:'}{order._id}</li>
                            </ol>
                        </nav>
                    }
                    <h1>{i18n.language == 'ar'?'الطلب بالرمز رقم :':'Order ID:'}{order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h2>{i18n.language == 'ar'?'بيانات الشحن':'Shipping'}</h2>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>{i18n.language == 'ar'?'عنوان التسليم : ':'address :'}</strong></Col>
                                            <Col> {order.shippingAddress.address},  {order.shippingAddress.city}
                                        {'  '}
                                        {order.shippingAddress.postalCode},
                                        {'  '}
                                        {order.shippingAddress.country}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>{i18n.language == 'ar'?'الايميل : ':'Email :'}</strong></Col>
                                            <Col><a href={`mailto:${order.user.email}`} >{order.user.email}</a></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>{i18n.language == 'ar'?'الاسم : ':'Name :'}</strong></Col>
                                            <Col>{order.user.name}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>{i18n.language == 'ar'?'رقم الهاتف : ':'Phone no :'}</strong></Col>
                                            <Col>{order.shippingAddress.phone}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {order.isDelivered ? (
                                        <Message variant='success'>{i18n.language == 'ar'?'تم ايصال الطلب بتاريج':'Delivered on'} {order.deliveredAt}</Message>
                                    ) : (
                                            <Message variant='warning'>{i18n.language == 'ar'?'لم يتم ايصال الطلب بعد':'Not Delivered'}</Message>
                                        )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>{i18n.language == 'ar'?'طريقه الدفع ':'Payment Method '}</h2>
                                    <p>
                                        <strong>{i18n.language == 'ar'?'عن طريق : ':'Method :'}</strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>{i18n.language == 'ar'?'تم الدفع بتاريخ':'Paid on'} {order.paidAt}</Message>
                                    ) : (
                                            <Message variant='warning'>{i18n.language == 'ar'?'الطلب لم يتم دفع ثمنه':'Not Paid'}</Message>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                <h2>{i18n.language == 'ar'?'المنتجات المطلوبه : ':'Order Items :'}</h2>
                                    {order.orderItems.length === 0 ? <Message variant='warning'>
                                        Order is empty
                            </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
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
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                    <h2>{i18n.language == 'ar'?'ملخص الطلبيه(الفاتوره)':'Order Summary'}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'تكلفه المنتجات :':'Items Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${order.itemsPrice} جنيه`:`${order.itemsPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'مصاريف الشحن : ':'Shipping Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${order.shippingPrice} جنيه`:`${order.shippingPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'الضرايب :':'Tax :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${order.taxPrice} جنيه`:`${order.taxPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>{i18n.language == 'ar'?'التكلفه الكليه :':'Total Price :'}</Col>
                                    <Col>{i18n.language == 'ar'?`${order.totalPrice} جنيه`:`${order.totalPrice} EGP`}</Col>
                                </Row>
                            </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn w-100 btn-custom-color'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderScreen
