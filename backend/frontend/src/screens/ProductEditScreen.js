import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [name_ar, setName_ar] = useState('')
    const [price, setPrice] = useState(0)
    const [price_ar, setPrice_ar] = useState(0)
    const [weight, setWeight] = useState(0)
    const [package_weight, setPackage_Weight] = useState(1)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [description_ar, setDescription_ar] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }else if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setName_ar(product.name_ar)
                setPrice(product.price)
                setPrice_ar(product.price_ar)
                setWeight(product.weight)
                setPackage_Weight(product.package_weight)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setDescription_ar(product.description_ar)

            }
        }



    }, [dispatch, product, id, navigate, successUpdate,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            name_ar,
            price,
            weight,
            package_weight,
            price_ar,
            image,
            category,
            countInStock,
            description,
            description_ar,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb"  style={{backgroundColor:'#ddd',padding:'10px 15px',marginBottom:'0px',borderRadius:'40px'}}>
                    <li className="breadcrumb-item "><Link to='/'><span><i className="fa-solid fa-house-chimney"></i></span>    Home</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item "><Link to='/admin/productlist'>Products List</Link></li>
                    <li className="breadcrumb-item text-center" aria-current="page">/</li>
                    <li className="breadcrumb-item active"><Link>{product.name}</Link></li>                                      
                </ol>
            </nav>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='name_ar'>
                                <Form.Label>Name in Arabic</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name_ar}
                                    required
                                    onChange={(e) => setName_ar(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price_ar'>
                                <Form.Label>Price in Arabic</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price_ar}
                                    required
                                    onChange={(e) => setPrice_ar(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='weight'>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter Weight'
                                    value={weight}
                                    required
                                    onChange={(e) => setWeight(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='package_weight'>
                                <Form.Label>Package_Weight</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter package_weight'
                                    value={package_weight}
                                    required
                                    onChange={(e) => setPackage_Weight(parseInt(e.target.value))}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    id='image-file'
                                    type='file'
                                    placeholder='Choose image'
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {uploading && <Loader />}

                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    required
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={category}
                                    required
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    <option value='1'>مخللات</option>
                                    <option value='2'>...</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Ingredient</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description_ar'>
                                <Form.Label>Ingredient in Arabic</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description_ar}
                                    required
                                    onChange={(e) => setDescription_ar(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' className='w-100 mt-3 btn-custom-color'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>
    )
}

export default ProductEditScreen