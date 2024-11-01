import axios from 'axios';

export default axios.create({
    baseURL: `https://certihub.uksouth.cloudapp.azure.com/`,
    headers: { 'userId': localStorage.getItem('userId') }
});