/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../App.scss';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { doc, where, query, addDoc, setDoc, getDoc, getDocs, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';
import { storage } from '../Firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import axios from 'axios';
import {UserContext} from '../contexts/UserContext';

export default function Email(){

    // User authentication
    const {currentUser, login, logout } = useContext(UserContext);
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
    });

    // POST email to express server
    const sendGridEmail = async (e) => {
        e.preventDefault();

        if( !formData.email || !formData.subject || !formData.email ) {
            setError(true);
            return;
        }
        try{
            await fetch("http://localhost:5000/email", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    email: formData.email, 
                    subject: formData.subject, 
                    message: `${formData.email} sending email`
                })
            });
            console.log("formData =>" , formData);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div 
            className="messages row text-left align-items-center p-lg-5 p-4" 
            style={{margin: "25px auto"}}
        >

            <div className="create text-left">        
                <form id='form'>
                    <h3 className="mx-1">Send Email</h3>
                    <input 
                        value={formData.email} 
                        onChange={ (event) => { 
                            setFormData({...formData, email: event.target.value}) 
                        }}    
                        type="textarea" placeholder="Type mail"
                    />
                    <input 
                        value={formData.subject} 
                        onChange={ (event) => { 
                            setFormData({...formData, subject: event.target.value}) 
                        }}    
                        type="textarea" placeholder="Type subject here"
                    />
                    <input 
                        value={formData.message} 
                        onChange={ (event) => { 
                            setFormData({...formData, message: event.target.value}) 
                        }}    
                        type="textarea" placeholder="Type message here"
                    />
                    <input 
                        onClick={sendGridEmail}
                        className="submit-btn" type="submit" value="Send"
                    /><br></br>
                        { error ? <p className="text-danger mx-2"> Please enter a message</p> : '' }
                </form>
            </div>
        </div>
    )
}



