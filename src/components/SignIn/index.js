import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './styles.scss';

//actions

import { emailSignInStart } from '../../redux/User/user.actions';

//components

import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';
import userSagas from '../../redux/User/user.sagas';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    signInErr: user.signInErr
});

const SignIn = props => {
    
    const history = useHistory();
    const {currentUser, signInErr} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);


    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    };

    
    useEffect(()=>{
        if(currentUser){
            resetForm();
            history.push('/');
          
        }
           
    },[currentUser]);

    useEffect(()=> {
        if(Array.isArray(signInErr) && signInErr.length >0){
            setErrors(signInErr);
        }
    },[signInErr])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email,password}))
    }


    const configAuthWrapper = {
        headline: 'LogIn'
    };
    
    return (
        <AuthWrapper {...configAuthWrapper}>
    
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                      
                    <Button>
                        Sign in
                    </Button> 

                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );   
}
 
export default SignIn;