import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {CLIENT_ID, CALLBACK_URL, STATE } from '../secret/constants';


const Login = () => {
    return (
        <div style={{width: "100%", height: "100vh", backgroundColor: "silver"}}>
            <a href={`https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${CALLBACK_URL}&client_id=${CLIENT_ID}&state=${STATE}`}>Constructed Login to EVE Online</a>
        </div>
    );
};
/*
const blankFields = {UserName: '', Password: ''};

const Login = () => {
    const [entries, setEntries] = useState(blankFields);

    const updateEntries = e => {
        setEntries({...entries, [e.target.name]: e.target.value});
    };

    const submitLogin = e => {
        e.preventDefault();

        axiosWithAuth()
            .post('account/logon?ReturnUrl=%2Fv2%2Foauth%2Fauthorize%3Fclient_id%3DwwwEveOnline%26response_type%3Dcode%26scope%3DeveClientLogin%2520recruit.signup.v1%2520cisservice.userProfileBasic.v1%2520cisservice.customerRead.v1%26redirect_uri%3Dhttps%253A%252F%252Fwww.eveonline.com%252Fcallback%26state%3D16286338992210.05041945639595258%26code_challenge_method%3DS256%26code_challenge%3DuXP9_pUZuFgwUjf9NraW_uH9-Al1cTO4NMzHybLpYeY', entries)
            .then(esiPost => {
                console.log('Data posted to EVE is:', esiPost.data);
                console.log('ESI Data Payload is:', esiPost.data.payload);
                localStorage.setItem('token', esiPost.data.payload);
            })
            .catch(loginError => {
                console.log('Error with login to EVE Online!');
            })
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <form onSubmit={submitLogin}>
                <div style={{width: '300px', display: 'flex', justifyContent: 'space-between'}}>
                    <div><label>Username:</label></div>
                    <div><input type='text' name='UserName' value={entries.UserName} onChange={updateEntries} /></div>
                </div>
                <div style={{width: '300px', display: 'flex', justifyContent: 'space-between'}}>
                    <div><label>Password:</label></div>
                    <div><input type='password' name='Password' value={entries.Password} onChange={updateEntries} /></div>
                </div>
                <div>
                    <button>Login to EVE!</button>
                </div>
                <div style={{height: '300px'}}></div>
                <div>
                    <a href="https://login.eveonline.com/">Eve Login Link</a>
                </div>
            </form>
            <div>
                <h1>Output Results of Login Test</h1>
            </div>
        </div>
    );
};
*/

export default Login;