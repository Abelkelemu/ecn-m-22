import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {

    const config = {
        url:'http://localhost:3000/login'
    };
    return new Promise((resovle, reject) => {
        auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            resovle();
        })
        .catch(()=>{
            const err = ['Email not found, Please try again.'];
            reject(err);
        }); 
    }); 
}