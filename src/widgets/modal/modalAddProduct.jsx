import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
    Radio,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { AuthContext } from "@/Auth/AuthContext";
function ModalAddProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({
        productID: "",
        productName: "",
        price: "",
        IsActive: 1,
        imageUrl: "",
        description: ""
    });
    const { auth } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: name === 'IsActive' ? parseInt(value) : value,
        });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formDataFile = new FormData();
        formDataFile.append('file', selectedFile);


        axios.post('https://api.shopcuathuan.shop/api/upload/product', formDataFile, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setData((prevData) => ({
                    ...prevData,
                    imageUrl: response.data,
                }));

                axios.post('https://api.shopcuathuan.shop/api/product/add', {
                    ...data,
                    imageUrl: response.data,
                }, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                })
                    .then(response => {

                        window.location.href = "/dashboard/product";
                    })
                    .catch(error => {
                        alert('Error adding product:', response.data);
                    });
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                alert('Error uploading file:', error);
            });
    };
    return (
        <div>
            <button
                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={openModal}
            >
                Add Product
            </button>
            {isModalOpen && (
                <div
                    data-dialog-backdrop="sign-in-dialog"
                    data-dialog-backdrop-close="true"
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeModal}
                >
                    <div
                        data-dialog="sign-in-dialog"
                        className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-4 p-6">
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Thêm Sản Phẩm
                            </h4>
                            <form onSubmit={handleAddProduct}>
                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Mã Sản Phẩm
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" " name="productID" onChange={handleChange}
                                    />
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Mã Sản Phẩm
                                    </label>
                                </div>
                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Tên Sản Phẩm
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" " name="productName" onChange={handleChange}
                                    />
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Tên Sản Phẩm
                                    </label>
                                </div>
                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Giá
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" " name="price" onChange={handleChange}
                                    />
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Giá
                                    </label>
                                </div>

                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Mô Tả
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <textarea
                                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" " name="description" onChange={handleChange}
                                    />

                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Mô Tả
                                    </label>
                                </div>
                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Kích Hoạt
                                </h6>
                                <div className="flex gap-10">
                                    <Radio name="IsActive" label="Kích Hoạt" value="1" defaultChecked onChange={handleChange} />
                                    <Radio name="IsActive" label="Không" value="0" onChange={handleChange} />
                                </div>
                                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                                    Ảnh Chính
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">

                                    <input
                                        className="relative m-0  block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        type="file"
                                        id="formFile"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <input
                                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" " name="imageUrl" type="hidden"
                                />
                                <div className="p-6 pt-3">

                                    <button
                                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit"
                                    >
                                        Add Product
                                    </button>

                                </div>
                            </form>

                        </div>


                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalAddProduct;
