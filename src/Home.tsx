import { useEffect, useState } from "react";
import API from './api';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
const Home = () => {
  const [certs, setCerts] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //fetch all certificates per user
    getCertificates()
  }, []);

  const getCertificates = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`certificate/get/all`);
      console.log("response ", response);

      const categorizedCertificates: any = {};

      response.data.data.forEach((cert: any) => {
        if (!categorizedCertificates[cert.category]) {
          categorizedCertificates[cert.category] = [];
        }
        categorizedCertificates[cert.category].push(cert);
      });
      setCerts(categorizedCertificates);
      console.log(categorizedCertificates);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }

  }

  const deleteCert = async (certToDelete: any) => {
    setIsLoading(true);
    try {
      const response = await API.delete(`certificate/${certToDelete.certificateId}/remove`);
      console.log("response ", response);
      toast.success("Delete Successful!");
      getCertificates();
    } catch (error: any) {
      toast.error(error.response.data.error);
      setIsLoading(false);
    }

  }

  return <div>
    <Loader show={isLoading}></Loader>
    <div id="header" className="flex justify-end gap-2">
      <div>
        <NavLink to="/certificate" className="bg-blue-500 text-white rounded-md px-2 py-1 block">Add New Certificate</NavLink>
      </div>
      <div>
        <button className="bg-slate-800 text-white rounded-md px-2 py-1"
          onClick={() => { localStorage.removeItem('userId'); window.location.reload(); }}>Logout</button>
      </div>
    </div>
    <div id="content">
      {Object.keys(certs).length === 0 ?
        <div className="p-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
            No certificates to show 😞, start by adding a new certificate.
          </h1>
        </div>
        :
        Object.keys(certs).map((key: any) =>
          <div key={key} className="pb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
              {key}
            </h1>
            {certs[key].map((certData: any, index: number) =>
              <div key={index}>
                <div className="mx-auto mt-11 w-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="p-4">
                    <h2 className="mb-2 text-xl font-medium dark:text-white text-gray-900 underline">{certData.name}</h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700 text-left">{certData.description}</p>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700 text-left font-semibold">{'Awarded at :  ' + format(new Date(certData.dateAwarded), "yyyy/MM/dd")}</p>
                    <div className="flex items-center justify-between">
                      <button className="ml-auto text-base font-medium text-red-500"
                        onClick={() => { deleteCert(certData) }}
                      >Delete</button>

                      <NavLink to="/certificate" state={certData} className="ml-auto text-base font-medium text-blue-500" >Edit</NavLink>

                      <a className="ml-auto text-base font-medium text-blue-500" target="_blank" href={certData.fileUrl}>View File</a>
                    </div>
                  </div>
                </div>
              </div>
            )

            }

          </div>
        )

      }

    </div>
    <ToastContainer />
  </div>;
};

export default Home;