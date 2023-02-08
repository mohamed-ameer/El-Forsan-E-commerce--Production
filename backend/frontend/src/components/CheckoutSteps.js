import React from 'react'
import { useTranslation } from "react-i18next";
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    const [t,i18n]=useTranslation();
    return (
        <Nav className='justify-content-center mb-4' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link><span><i className="fa-solid fa-circle-check"></i></span> {i18n.language == 'ar'?'تسجيل الدخول':'Login'}</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled><span><i className="fa-regular fa-circle-check"></i></span>  {i18n.language == 'ar'?'تسجيل الدخول':'Login'}</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link><span><i className="fa-solid fa-circle-check"></i></span> {i18n.language == 'ar'?'بيانات الشحن':'Shipping'}</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled><span><i className="fa-regular fa-circle-check"></i></span>  {i18n.language == 'ar'?'بيانات الشحن':'Shipping'}</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link><span><i className="fa-solid fa-circle-check"></i></span> {i18n.language == 'ar'?'طريقه الدفع':'Payment'}</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled><span><i className="fa-regular fa-circle-check"></i></span>  {i18n.language == 'ar'?'طريقه الدفع':'Payment'}</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link><span><i className="fa-solid fa-circle-check"></i></span> {i18n.language == 'ar'?'اتمام الطلب':'Place Order'}</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled><span><i className="fa-regular fa-circle-check"></i></span>  {i18n.language == 'ar'?'اتمام الطلب':'Place Order'}</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
