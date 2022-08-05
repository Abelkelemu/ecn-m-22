import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


// actions

import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions';

//components

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        if(resetPasswordSuccess){
            dispatch(resetUserState())
            history.push({
                pathname: '/login',
                state: 'An email has been sent to your email address!'
            });
        }
    },[resetPasswordSuccess]);

    useEffect(()=> {
        if(Array.isArray(userErr) && userErr.length>0){
            setErrors(userErr );
        }
    },[userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));
    }

    const configAuthWrapper ={
         headline: 'Password Recovery'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
           <div className="formWrap">

                {errors && (
                    <ul>
                        {errors.map((e,index) =>{
                          return(
                            <li key={index}>
                                {e}
                            </li>
                          );
                        })}
                    </ul>
                )}
                
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type= 'email'
                        name='email'
                        value= {email}
                        placeholder="Enter a registered email address"
                        handleChange={e=> setEmail(e.target.value)}
                   />

                    <Button type="submit">
                        Recover Password
                    </Button>

                </form>
                
            </div>
        </AuthWrapper>
    );
    
}
export default EmailPassword;