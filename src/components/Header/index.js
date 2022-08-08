import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';

//actions
import { signOutUserStart } from '../../redux/User/user.actions';
import Logo from './../../assets/logo2.png'

//assets

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Header = () => {

    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart())
    };
    
    return ( 
        <header className='header'>

            <div className="wrap">
                
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="ECN-M-22 Logo"/>
                    </Link>
                </div>

                <div className="navLinks">
                    <ul>
                        <li>
                            <Link to="/"> 
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/yearbook">
                                Yearbook
                            </Link>
                        </li>
                        <li>
                            <Link to="/storypage">
                                Storybook
                            </Link>
                        </li>
                        <li>
                            <Link to="/yellowPages">
                                Yellowpages
                            </Link>
                        </li>
                        {!currentUser && (
                            <li>
                            <Link to="/login">
                                Sign in
                            </Link>
                        </li>
                        )}

                        {currentUser && [
                            <li>
                                <Link to='/studentArea'>
                                     My account
                                </Link>
                            </li>,
                            <li>
                                <span onClick = {()=>signOut()}>
                                    LogOut
                                </span> 
                            </li>
                        ]}
                        
                    </ul>
                </div>  
            </div>            
        </header>
     );
}


// no use
// Header.defaultProps = {
//     currentUser:null
// }
export default Header;