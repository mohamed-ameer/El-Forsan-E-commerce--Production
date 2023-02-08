import React, { useState, useEffect } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const [t,i18n]=useTranslation();
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <>
            <nav aria-label="breadcrumb" className="mb-4" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                    <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item " aria-current="page"><Link to='/cart'>{i18n.language == 'ar'?'العربه':'cart'}</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item active" aria-current="page">{i18n.language == 'ar' ? 'تقديم عمليه الشراء' : 'Proceed To Checkout' }</li>
                </ol>
            </nav> 
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />

                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>{i18n.language == 'ar'?'اختر طريقه الدفع':'Select Method'}</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                        </Col>
                    </Form.Group>

                    <Button type='submit' className='btn-custom-color w-100 mt-3'>
                    {i18n.language == 'ar'?'التالي':'Continue'}
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen
