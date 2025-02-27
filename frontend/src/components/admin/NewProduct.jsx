import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, clearErrors } from '../../actions/productAction'
import { Button } from '@mui/material'
import MetaData from '../layouts/MetaData'
import { AccountTree, Category, AutoAwesome, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material'
import SideBar from './SideBar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstant'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'

const NewProduct = () => {
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.newProduct)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [bgColor, setBgColor] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const Categories = ["Sci Fiction", "Fiction","Fantasy","Mystery","Thriller","Romance","Horror","Biography","Travel","History","Science","Art","Comics","Religion","Others"]

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert('Product Created Successfully')
            navigate('/admin/dashboard')
            dispatch({ type: NEW_PRODUCT_RESET })
        }
    }, [dispatch, error , success])

    const createSubmitProductHandler = (e) => {
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
        dispatch(createProduct(myForm))
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])

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
            <MetaData title="Create Product" />
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
                        onSubmit={createSubmitProductHandler}
                    >
                        <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>

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
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Background Color */}
                        <div className="flex items-center space-x-3">
                            <AutoAwesome />
                            <input
                                type="text"
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
                                onChange={createProductImagesChange}
                                multiple
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Image Previews */}
                        <div className="flex space-x-3">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Avatar Preview" className="w-16 h-16 object-cover rounded-md" />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full py-2"
                            disabled={loading}
                        >
                            Create Product
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct
