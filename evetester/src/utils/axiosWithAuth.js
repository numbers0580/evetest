import axios from 'axios';
import {CLIENT_ID, SECRET_KEY} from '../secret/constants';

export const axiosWithAuth = () => {
    //const token = localStorage.getItem('token');
    const b64String = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64');

    /*  Notes regarding base 64 encoding and decoding
        Found here: https://stackoverflow.com/questions/44458874/how-to-base64-encode-inputs-in-react/44458974

        alternate option is to install base-64 via npm
        npm install base-64 --save
        also recommends (if using typescript):
        npm i --save-dev @types/base-64

        then we could import and use methods:
        import {decode, encode} from 'base-64';
        let encodedString = encode('Your Decoded String');
        let decodedString = decode('Your Encoded String');
    */

    return axios.create({
        /*
        headers: {Authorization: token},
        baseURL: 'https://login.eveonline.com/'
        */
        headers: `Authorization: Basic ${b64String}`,
        baseURL: 'https://login.eveonline.com/'
    });
};