import { toast, ToastContainer } from "react-toastify";
import API from './api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required(),
    dateAwarded: yup.date().typeError("Invalid date format").required("Certificate Awarded Date is required"),
    uploaded_file: yup.mixed().required("A file is required").test("fileType", "A file is required",
        (value: any) => {
            return value && value.length > 0;
        })
}).required();

type FormData = yup.InferType<typeof schema>;

export default function Certificate() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([] as any);

    useEffect(() => {
        getCategories();
    }, [])

    const onSubmit = async (data: FormData) => {
        console.log(data, (data.uploaded_file as any)[0]);
        setIsLoading(true);
        const formData = new FormData();

        // Append other fields to the form data
        formData.append("category", data.category);
        formData.append("dateAwarded", data.dateAwarded.toISOString());
        formData.append("description", data.description);
        formData.append("name", data.name);
        // Append file to the form data
        formData.append("uploaded_file", (data.uploaded_file as any)[0]);

        try {
            await API.post(`certificate/add`, formData);
            toast.success("Certificate Creation Successful!")
            setIsLoading(false);
            setTimeout(() => {
                navigate("/home");
            }, 1000)
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.error);
        }
    }

    const getCategories = async () => {
        setIsLoading(true);
        try {
            const response = await API.get(`categories/get/all`);
            console.log("response ", response.data.data);
            setCategories(response.data.data);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
        }

    }

    return (<>
        <Loader show={isLoading}></Loader>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Want to add new certificate? Fill And Submit!</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit(onSubmit)} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input {...register("name")} autoComplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Certificate Name" />
                                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Certificate Name</label>
                                    <p className="text-red-500 text-sm">{errors.name?.message}</p>
                                </div>
                                <div className="relative" style={{ marginTop: 30 }}>
                                    <select {...register("category")} autoComplete="off" id="category" name="category" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600">
                                        {categories.map((cat: any) =>
                                            <option key={cat} value={cat}>{cat}</option>
                                        )}
                                    </select>
                                    <label htmlFor="category" className="absolute left-0 -top-3.5 text-gray-600 text-base peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Certificate Category</label>
                                    <p className="text-red-500 text-sm">{errors.category?.message}</p>
                                </div>
                                <div className="relative">
                                    <input {...register("description")} autoComplete="off" id="description" name="description" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Certificate Description" />
                                    <label htmlFor="description" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Certificate Description</label>
                                    <p className="text-red-500 text-sm">{errors.description?.message}</p>
                                </div>
                                <div className="relative" style={{ marginTop: 30 }}>
                                    <input {...register("dateAwarded", {
                                        valueAsDate: true
                                    })} autoComplete="off" id="dateAwarded" name="dateAwarded" type="date" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Certificate Awarded Date" />
                                    <label htmlFor="dateAwarded" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Certificate Awarded Date</label>
                                    <p className="text-red-500 text-sm">{errors.dateAwarded?.message}</p>
                                </div>
                                <div className="relative" style={{ marginTop: 30 }}>
                                    <input {...register("uploaded_file")} accept="application/pdf" autoComplete="off" id="uploaded_file" name="uploaded_file" type="file" className="mt-4 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Certificate File" />
                                    <label htmlFor="uploaded_file" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Certificate File</label>
                                    <p className="text-red-500 text-sm">{errors.uploaded_file?.message}</p>
                                </div>
                                <div className="relative">
                                    <input className="bg-blue-500 text-white rounded-md px-2 py-1" type="submit" value={'Submit'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div><ToastContainer /></>);
}