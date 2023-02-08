import React, { useState, useEffect } from 'react'
import { Link ,useNavigate,useParams} from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { useAlert } from 'react-alert'
import { Row, Col, Image, ListGroup, Button, Card, Form,} from 'react-bootstrap'
import Rating from '../components/Rating/Rating'
import { Rating as ReactRating } from 'react-simple-star-rating'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { addToCart} from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const navigate = useNavigate();
  const { id } = useParams();
  const [t,i18n]=useTranslation();
  const alert = useAlert();
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
      loading: loadingProductReview,
      error: errorProductReview,
      success: successProductReview,
  } = productReviewCreate
  useEffect(()=>{
    if (successProductReview) {
        setRating(0)
        setComment('')
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  },[dispatch,id,successProductReview])

    const addToCartHandler = () => {
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

    const handleRating = (rate) => {
        setRating(rate)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, {
            rating,
            comment
        }
        ))
    }
  return (
    <>
        { loading ?
            <Loader />
            : error 
                ? <Message variant='danger'>{error}</Message>
                :
                <div style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}> 
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                        <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                        <li className="breadcrumb-item text-center" aria-current="page">/</li>
                        <li className="breadcrumb-item active " aria-current="page">{i18n.language == 'ar'?product.name_ar:product.name}</li>
                    </ol>
                </nav> 
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid style={{maxHeight:"550px"}}/>
                    </Col>

                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{i18n.language == 'ar'?product.name_ar:product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item style={{direction:'ltr'}}>
                                <Rating value={product.rating} text={`${product.numReviews}`} color={'#4e7726'}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <strong>{i18n.language == 'ar'?'السعر :':'Price :'}</strong> {i18n.language == 'ar' ?`${product.price} جنيه`:`${product.price} EGP`}
                            </ListGroup.Item>
                            {i18n.language == 'ar' &&
                            <ListGroup.Item className={product.countInStock > 0 ? 'text-white bg-success' : 'text-white bg-danger'}>
                                <strong>الحاله :</strong> {product.countInStock > 0 ? 'متوفر' : 'غير متوفر حاليا'}
                            </ListGroup.Item>
                                }
                            {i18n.language == 'en' &&
                            <ListGroup.Item className={product.countInStock > 0 ? 'text-white bg-success' : 'text-white bg-danger'}>
                                <strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </ListGroup.Item>
                                }
                            <ListGroup.Item>
                                <strong>{i18n.language == 'ar'?'المكونات :':'Ingredient'}</strong> {i18n.language == 'ar'?product.description_ar:product.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>{i18n.language == 'ar'?'الوزن :':'Weight :'}</strong> {product.weight} {i18n.language == 'ar'?'كجم':'kg'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>{i18n.language == 'ar'?'الوزن الصافي :':'Package Weight :'}</strong> {product.package_weight} {i18n.language == 'ar'?'جم':'g'}
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col><strong>{i18n.language == 'ar'?'الكميه :':'Quantity:'}</strong></Col>
                                        <Col className='my-1'>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {

                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className='btn btn-custom-color btn-lg w-100'
                                        disabled={product.countInStock == 0}
                                        type='button'>
                                        {i18n.language == 'ar'?'أضف إلي السله':'Add to Cart'}
                                    </Button>
                                </ListGroup.Item>  

                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <div className="alert alert-dark mt-2" role="alert">
                            <h2>{i18n.language == 'ar'?'المراجعات':'Reviews'} ({product.reviews.length})</h2>
                        </div>
                        {product.reviews.length === 0 && <Message variant='warning'>{i18n.language == 'ar'?'لا توجد مراجعه':'No Reviews'}</Message>}

                        <ListGroup>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <div className='d-flex align-items-center'>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#4e7726' />
                                    </div>
                                    <span>{review.createdAt.substring(0, 10)}</span>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item>
                                <h4 className="alert alert-dark mt-2" role="alert">{i18n.language == 'ar'?'أضف مراجعه':'Write a review'}</h4>

                                {loadingProductReview && <Loader />}
                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <div className='d-flex align-items-center'>
                                                <Form.Label className='mb-0'>{i18n.language == 'ar'?'تقييمك :':'Rating :'}</Form.Label>
                                                <ReactRating onClick={handleRating} size={25} fillColor="#4e7726" rtl={i18n.language == 'ar'?true:false}></ReactRating>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId='comment'>
                                            <Form.Label>{i18n.language == 'ar'?'مراجعتك :':'Review :'}</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='5'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            className='btn btn-custom-color w-100 mt-3'
                                        >
                                            {i18n.language == 'ar'?'إرسال':'Submit'}
                                        </Button>

                                    </Form>
                                ) : (
                                    <>
                                        {i18n.language == 'ar'?
                                            <Message variant='warning'>ارجوك قم <Link to='/login'>بتسجيل الدخول </Link>اولا لكتابه مراجعتك </Message>
                                            :
                                            <Message variant='warning'>Please <Link to='/login'>login</Link> to write a review</Message>
                                        }
                                    </>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                </div>
        }
    </>
  )
}

export default ProductScreen
