import React, { useState, useEffect } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
    const [t,i18n]=useTranslation();
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [email, setEmail] = useState(shippingAddress.email)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country,phone,email }))
        navigate('/payment')
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
                <CheckoutSteps step1 step2 />
                <div className="alert alert-dark" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                <h1>{i18n.language == 'ar'?'بيانات الشحن':'SHIPPING'}</h1>
                </div>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='address' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'العنوان':'Address'}</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder={i18n.language == 'ar'?'ادخل العنوان':'Enter address'}
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'المدينه':'City'}</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder={i18n.language == 'ar'?'ادخل اسم المدينه':'Enter city'}
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalCode' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'الرقم البريدي':'Postal Code'}</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder={i18n.language == 'ar'?'ادخل الرمز البريدي لمدينتك':'Enter postal code'}
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'البلد':'Country'}</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder={i18n.language == 'ar'?'ادخل اسم البلد':'Enter country'}
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phone' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'رقم الهاتف':'Phone Number'}</Form.Label>
                        <Form.Control
                            required
                            type='tel'
                            placeholder={i18n.language == 'ar'?'ادخل رقم الهاتف':'Enter phone number'}
                            value={phone ? phone : ''}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                        <Form.Label>{i18n.language == 'ar'?'البريد الالكتروني':'Email'}</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder={i18n.language == 'ar'?'ادخل البريد الالكتروني':'Enter email'}
                            value={email ? email : ''}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' className='btn-custom-color w-100 mt-3'>
                    {i18n.language == 'ar'?'التالي':'Continue'}
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen
