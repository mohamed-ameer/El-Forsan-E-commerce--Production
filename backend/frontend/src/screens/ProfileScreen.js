import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'


function ProfileScreen() {
    const [t,i18n]=useTranslation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch,navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
    return (
        <>
    {userInfo &&
        <Row className='gy-4' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
            <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>  
                <li className="breadcrumb-item text-center" aria-current="page">/</li>
                <li className="breadcrumb-item" aria-current="page">{i18n.language == 'ar'?'بيانات المستخدم':'Profile'}</li>
                <li className="breadcrumb-item text-center" aria-current="page">/</li>
                <li className="breadcrumb-item active " aria-current="page">{userInfo.name}</li>
            </ol>
            </nav> 
            <Col md={3}>
                <div className="alert alert-dark" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}><h2>{i18n.language == 'ar'?'بيانات المستخدم':'User Profile'}</h2></div>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' className='btn-custom-color w-100 mt-3'>
                        Update
                </Button>

                </Form>
            </Col>

            <Col md={9}>
            <div className="alert alert-dark" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}><h2>{i18n.language == 'ar'?'طلباتي':'My Orders'}</h2></div>
            {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm' style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
                                <thead>
                                    <tr>
                                        <th>{i18n.language == 'ar'?'كود الطلب':'Order ID'}</th>
                                        <th>{i18n.language == 'ar'?'تاريخ الطلب':'Date'}</th>
                                        <th>{i18n.language == 'ar'?'المبلغ الكلي':'Total Price'}</th>
                                        <th>{i18n.language == 'ar'?'تم دفع ثمنه؟':'Paid?'}</th>
                                        <th>{i18n.language == 'ar'?'تم التوصيل؟':'Delivered'}</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{i18n.language == 'ar'?`${order.totalPrice} جنيه`:`${order.totalPrice} EGP`}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-custom-color btn-sm'>{i18n.language == 'ar'?'تفاصيل الطلب':'Order Details'}</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}

            </Col>
        </Row>
    }
    </>
    )
}

export default ProfileScreen