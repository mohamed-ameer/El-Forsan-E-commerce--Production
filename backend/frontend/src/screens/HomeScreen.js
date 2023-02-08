import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import Product from '../components/Product/Product'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import Slider from '../components/Slider/Slider'
import Paginate from '../components/Paginate'
import {useLocation ,Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {listProducts} from '../actions/productActions'
function HomeScreen() {
    const [t,i18n]=useTranslation();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const {error,products,loading,page,pages} = productList

    const location = useLocation()
    let keyword = location.search

    useEffect(()=>{
        dispatch(listProducts(keyword))
    },[dispatch,keyword])

    return (
    <>
        <nav aria-label="breadcrumb" className="mb-4" style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>
            <ol className="breadcrumb" style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    {i18n.language == 'ar'?'الصفحه الرئيسيه':'Home'}</Link></li>
                <li className="breadcrumb-item text-center" aria-current="page">/</li>
                <li className="breadcrumb-item text-center active" aria-current="page">{i18n.language == 'ar'?'تسوق':'shop'}</li>
            </ol>
        </nav> 
        <div className='pb-5 pt-0'>
            <Slider/>
        </div>
        {loading ? <Loader />
            :error ? <Message variant='danger'>{error}</Message>
                :<div>
                <Row style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
                {products.map(product => (
                    <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
        }
    </>
  )
}

export default HomeScreen
