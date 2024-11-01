import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './api';
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";



export default function All() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [isLoading, setIsLoading] = useState(false);
    const [certs, setCerts] = useState([]);
    const [filteredCerts, setFilteredCerts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const userId: any = searchParams.get('userId');
        getAllCertificates()
    }, [])



    const getAllCertificates = async () => {
        setIsLoading(true);
        try {
            const response = await API.get(`certificate/get/all/user?userId=${searchParams.get('userId')}`);
            setCerts(response.data.data);
            setFilteredCerts(response.data.data);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
        }

    }
    const onSearch = (e: any) => {
        setSearch(e.target.value);
        const tempArray = certs.filter((el: any) => el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredCerts(tempArray)
    }

    return (
        <>
            <Loader show={isLoading}></Loader>
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
                    Certificates of {searchParams.get('name')?.split('+')[0]}
                </h1>
                <div className="flex flex-col md:flex-row gap-10 justify-center mt-8">
                    <div className="flex">
                        <input value={search} onChange={(e) => onSearch(e)} type="text" placeholder="Search certificate name"
                            className="w-full md:w-96 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
                        />
                    </div>
                </div>
                {filteredCerts.map((data: any, index: number) =>
                    <div key={index} className="relative rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg text-left">
                        <div className="bg-white p-7 rounded-md">
                            <h1 className="font-bold text-xl mb-2">{data.name}</h1>
                            <p className="text-lg">{data.description}</p>
                            <div className="mt-3">
                                <p className="font-semibold">{'Category :  ' + data.category}</p>
                                <p className="font-semibold">{'Awarded at :  ' + format(new Date(data.dateAwarded), "yyyy/MM/dd")}</p>
                            </div>
                            <div className="mt-4">
                                <a className="ml-auto text-base font-medium text-blue-500" target="_blank" href={data.fileUrl}>View File</a>
                            </div>
                        </div>
                    </div>
                )
                }

            </div>
            <ToastContainer />
        </>
    );
}
