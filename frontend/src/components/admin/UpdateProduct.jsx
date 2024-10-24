import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct , getProductDetails , clearErrors } from '../../actions/productAction'
import { Button } from '@mui/material'
import MetaData from '../layouts/MetaData'
import { AccountTree, Category, AutoAwesome, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material'
import SideBar from './SideBar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../layouts/Navbar'

const UpdateProduct = () => {
    const dispatch = useDispatch()
    const { loading, error:updateError, isUpdated } = useSelector(state => state.product)
    const { product , error } = useSelector(state => state.productDetails)
    const navigate = useNavigate()
    const {id} = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [bgColor, setBgColor] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([])

    const Categories = ["Spices", "Flour"]

    useEffect(() => {
       
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else if (product) { // Ensure product exists before setting state
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setBgColor(product.bgColor);
            setOldImages(product.images);
        }
    

        if (error) {
            alert(error)
            dispatch(clearErrors())
        }


        if (updateError) {
            alert(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert('Product Updated Successfully')
            navigate('/admin/products')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, error, isUpdated, updateError, product ,id , navigate])

    const updateSubmitProductHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('price', price)
        myForm.set('description', description)
        myForm.set('category', category)
        myForm.set('stock', stock)
        myForm.set('bgColor', bgColor)

        images.forEach((image) => {
            myForm.append('images', image)
        })
        dispatch(updateProduct(id,myForm))
    }

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        setOldImages([])

        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prevState) => [...prevState, reader.result])
                    setImages((prevState) => [...prevState, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <>
            <MetaData title="Update  Product" />
            <div className="min-h-screen flex">
                <Navbar/>
                {/* Sidebar */}
                <div className="hidden md:flex w-64  bg-gray-100 border-r">
                    <SideBar />
                </div>

                {/* Product Form */}
                <div className="w-full md:w-3/4 mt-20 p-6 bg-gray-50">
                    <form
                        className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
                        encType="multipart/form-data"
                        onSubmit={updateSubmitProductHandler}
                    >
                        <h1 className="text-2xl font-bold text-gray-800">Update Product</h1>

                        {/* Product Name */}
                        <div className="flex items-center space-x-3">
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Product Price */}
                        <div className="flex items-center space-x-3">
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Product Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex items-center space-x-3">
                            <Description />
                            <textarea
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                                rows="4"
                            ></textarea>
                        </div>

                        {/* Category Selection */}
                        <div className="flex items-center space-x-3">
                            <AccountTree />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            >
                                <option value="">Choose Category</option>
                                {Categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center space-x-3">
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Background Color */}
                        <div className="flex items-center space-x-3">
                            <AutoAwesome />
                            <input
                                type="text"
                                value={bgColor}
                                placeholder="Background Color"
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Image Previews */}

                        <div className="flex space-x-3">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" className="w-16 h-16 object-cover rounded-md" />
                            ))}
                        </div>


                        <div className="flex space-x-3">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" className="w-16 h-16 object-cover rounded-md" />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full py-2"
                            disabled={loading}
                        >
                            Update Product
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
