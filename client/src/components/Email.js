/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../App.scss';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { doc, where, query, addDoc, setDoc, getDoc, getDocs, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';
import { storage } from '../Firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import {UserContext} from '../contexts/UserContext';

export default function Messages(){

    // User authentication
    const {currentUser, login, logout } = useContext(UserContext);
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        message: '',
        imageURL: ''
    });

    // const fileRef = useRef(null);
    const [file, setFile] = useState("");
    const [imageURL, setImageUrl] = useState(null);

    useEffect(() => {
    },[]);

    const createMessage = async (e) => {

        e.preventDefault();
        console.log("createMessage");
 
        // Add new message to database
        let docRef;
        try{
            docRef = await addDoc( collection(db, 'messages'), {});
            console.log('id => '+ docRef.id);
        }catch(error){
            console.log(error);
        }
        try{
            await setDoc( doc(db, 'messages', docRef.id.toString()), {
                id: docRef.id,
                email: currentUser.email,
                first: currentUser.first,
                last: currentUser.last,
                message: formData.message,
                userImg: currentUser.imgURL,
                userID: currentUser.id,
                imageURL: imageURL,
                likes: 0
            })

        }catch(error){
            console.log(error);
        }
    };  

    // Delete message by message ID
    const deleteMessage = async (id) => {
        console.log('deleteDoc(id) => ' + id);

        try{
            await deleteDoc( doc(db, 'messages', id) );
        }catch(error){
            console.log(error);
        }
    };

    // Edit message by message ID
    const editMessage = async (id) => {
        
        let data = await doc( db, 'messages', id );
        const docSnap = await getDoc(data);

        try{
            await setDoc( doc(db, 'messages', id ), {
                id: docSnap.data().id,
                email: docSnap.data().email,
                first: docSnap.data().first,
                last: docSnap.data().last,
                message: formData.message,
                userImg: docSnap.data().userImg,
                userID: docSnap.data().userID,
                imageURL: imageURL, 
                likes: docSnap.data().likes
            })
        }catch(error){
            console.log(error);
        }
    };

    return(
        <div 
            className="messages row text-left align-items-center p-lg-5 p-4 my-2" 
            style={{
                // background:'linear-gradient(#2266ccaa,#000a), url("https://source.unsplash.com/random/?shadows") no-repeat', 
                // background:'linear-gradient(#2266ccaa,#0000), url("./assets/10567.png")', 
                background:'linear-gradient(#2266ccaa,#2266ccaa)', 
                backgroundSize:'cover'
            }}
        >
            <h2 className="mx-2">Email</h2>
       

            <div className="create text-left my-5">        
                <form id='form'>
                    <h3 className="mx-1">Message</h3>
                    <input 
                        value={formData.message} 
                        onChange={ (event) => { 
                            setFormData({...formData, message: event.target.value}) 
                        } }    
                        type="textarea" placeholder="Type your message here"
                    />
                    <input 
                        className="hide"
                        value={imageURL} 
                        onChange={ (event) => { 
                            setFormData({...formData, imageURL: event.target.value}) 
                        } }    
                        type="textarea" placeholder="Image URL"
                    /><br></br>
                    <input 
                        onChange={ (e) => { 
                            setFile( e.target.files[0] );
                        }}    
                        type="file"
                    /><br></br>
                    {file &&
                        <div className="col-lg-12 text-left p-2">
                            <img 
                                onClick={ () => { setFile(null); setImageUrl(null); }}
                                width="50%" src={imageURL} alt=""></img>
                            <br></br>
                            {imageURL}                            
                        </div>
                    }
                    <input 
                        onClick={createMessage}
                        className="submit-btn" type="submit" value="Send"
                    /><br></br>
                        { error ? <p className="text-danger mx-2"> Please enter a message</p> : '' }
                </form>
            </div>
        </div>
    )
}



