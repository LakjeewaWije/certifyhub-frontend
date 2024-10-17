import { useEffect, useState } from "react";
import API from './api';
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
  const [certs, setCerts] = useState({} as any)
  useEffect(() => {
    //fetch all certificates per user
    getCertificates()
  }, []);

  const getCertificates = async () => {
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
  }

  const deleteCert = async (certToDelete: any) => {
    try {
      const response = await API.delete(`certificate/${certToDelete.certificateId}/remove`);
      console.log("response ", response);
      toast.success("Delete Successful!")
      getCertificates()
    } catch (error: any) {
      toast.error(error.response.data.error);
    }

  }

  return <div>
    <div id="header" className="flex justify-end gap-2">
      <div>
        <button className="bg-blue-500 text-white rounded-md px-2 py-1">Add New Certificate</button>
      </div>
      <div>
        <button className="bg-slate-800 text-white rounded-md px-2 py-1"
          onClick={() => { localStorage.removeItem('userId'); window.location.reload(); }}>Logout</button>
      </div>
    </div>
    <div id="content">
      {Object.keys(certs).map((key: any) =>
        <div key={key} className="pb-4">
          {/* <h1>{key}</h1> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
            {key}
          </h1>
          {certs[key].map((certData: any, index: number) =>
            <div key={index}>
              {/* <h2>{certData.name}</h2>
              <p>{certData.description}</p>
              <a href={certData.fileUrl}>View File</a> */}
              <div className="mx-auto mt-11 w-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{certData.name}</h2>
                  <p className="mb-2 text-base dark:text-gray-300 text-gray-700 text-left">{certData.description}</p>
                  <p className="mb-2 text-base dark:text-gray-300 text-gray-700 text-left font-semibold">{'Awarded At : ' + '12/12/1212'}</p>
                  <div className="flex items-center justify-between">
                    <button className="ml-auto text-base font-medium text-red-500"
                      onClick={() => { deleteCert(certData) }}
                    >Delete</button>

                    <a className="ml-auto text-base font-medium text-blue-500" href={certData.fileUrl}>Edit</a>

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