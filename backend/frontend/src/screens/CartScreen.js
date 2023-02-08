import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next"
import { Link ,useNavigate,useParams,useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
function CartScreen() {
    const {id} = useParams()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [t,i18n]=useTranslation();
    const qty = searchParams.get('qty');
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const currentItem = cartItems.find(x => x.product == id)
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }
  return (
    <Row className='gy-4' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
        <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
            <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                {currentItem && 
                <li className="breadcrumb-item active " aria-current="page">
                <Link to={`/product/${currentItem.product}`}>{i18n.language == 'ar' && currentItem?currentItem.name_ar:currentItem.name}</Link>
                </li>
                }    
            <li className="breadcrumb-item text-center" aria-current="page">/</li>
            <li className="breadcrumb-item active " aria-current="page">{i18n.language == 'ar'?'العربه':'cart'}</li>
        </ol>
        </nav>    
    <Col md={8}>
        {cartItems.length === 0 ? (
            <Message variant='warning'>
                {i18n.language == 'ar'?<><p>عربه الشراء فارغه</p> <Link to='/'>إرجع للصفحه الرئيسيه</Link></>:<><p>your cart is empty</p> <Link to='/'>Go Back</Link></>}
                
            </Message>
        ) : (
                <ListGroup>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row className='align-items-center gy-3'>
                                <Col md={2}>
                                <Link to={`/product/${item.product}`}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Link>    
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{i18n.language == 'ar'?item.name_ar:item.name}</Link>
                                </Col>

                                <Col md={2}>
                                    {i18n.language == 'ar' ?`${item.price} جنيه`:`${item.price} EGP`}
                                </Col>

                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {

                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }

                                    </Form.Control>
                                </Col>

                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
    </Col>

    <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <strong>{i18n.language == 'ar'?'عدد المنتجات :':'Total items :'}</strong> {i18n.language == 'ar'?(cartItems.reduce((acc, item) => acc + item.qty, 0)) + ' منتج':(cartItems.reduce((acc, item) => acc + item.qty, 0)) + ' items'}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>{i18n.language == 'ar'? 'إجمالي التكلفه :' :'Total cost :'}</strong> {i18n.language == 'ar'? cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) + 'جنيه ':cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) + 'EGP '}
                </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-custom-color w-100'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    {i18n.language == 'ar' ? 'تقديم عمليه الشراء' : 'Proceed To Checkout' }
                </Button>
            </ListGroup.Item>


        </Card>
    </Col>
</Row>
  )
}

export default CartScreen
