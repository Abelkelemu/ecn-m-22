import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';

//actions
import { signOutUserStart } from '../../redux/User/user.actions';
import Logo from './../../assets/logo2.png'

//assets

import userImg from './../../assets/user.png'

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Header = () => {

    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);
    const [clicked, setClicked] = useState(false); 


    const signOut = () => {
        dispatch(signOutUserStart())
    };

    const handleClick = () => {
        setClicked(!clicked)
    } 
    
    return ( 
        <header className='header'>

            <div className="wrap">
                

                {clicked && ( <div className="modalOverlay" onClick={() => {handleClick()}} />)}
                <div className="menu-icon" onClick={()=>{handleClick()}}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>


                <ul className = {clicked ? 'nav-menu active' : 'nav-menu'}>
                    

                    {!currentUser && (
                            <li >
                            <Link to="/login" onClick={()=>handleClick()}>
                             <span> <img src={userImg}/> </span> 
                             <span>  Sign In  </span>  
                            </Link>
                           </li>
                    )}

                    {currentUser && (
                            <li>
                           
                                <span  className='topLoggedIn'> <img src={userImg}/> </span>
                                <span className='topLoggedIn'> Hello, </span> 
                                <span  className='topLoggedIn'> {currentUser.firstName && currentUser.firstName.charAt(0).toUpperCase()+currentUser.firstName.slice(1)} </span> 
                             
                           </li>
                    )} 
                    
                    
                    <li>
                        <Link to="/" onClick={()=>handleClick()}>
                            HOME
                        </Link>
                    </li>

                    <li>
                        <Link to="/yearbook" onClick={()=>handleClick()}>
                            YEARBOOK
                        </Link>
                    </li>

                    <li>
                        <Link to="/storypage" onClick={()=>handleClick()}>
                            STORYBOOK
                        </Link>
                    </li>

                    <li>
                        <Link to="/yellowPages" onClick={()=>handleClick()}>
                            YELLOWPAGES
                        </Link>
                    </li>

                    {currentUser && 
                            <li>
                                <Link to='/studentArea' onClick={()=>handleClick()}>
                                   MY ACCOUNT
                                </Link>
                            </li>
                    }

                    {currentUser && 
                            <li>
                                <span onClick = {()=>{signOut(); handleClick()}}>LOGOUT</span>
                            </li>
                    }

                    

                </ul>
            
                
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="ECN-M-22 Logo"/>
                    </Link>
                </div>

                <div className="mobileNavLinks">
                    <ul>
                        {!currentUser && (
                            <li>
                            <Link to="/login">
                                Sign in
                            </Link>
                        </li>
                        )}
                        

                        {currentUser && 
                            <li>
                                <Link to='/studentArea'>
                                     My account
                                </Link>
                            </li>}
                        {currentUser && 
                            <li>
                            <span onClick = {()=>signOut()}>
                                LogOut
                            </span> 
                        </li>}
                            
                        
                    </ul>
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

                        {currentUser && 
                            <li>
                                <Link to='/studentArea'>
                                     My account
                                </Link>
                            </li>}
                        {currentUser && 
                            <li>
                            <span onClick = {()=>signOut()}>
                                LogOut
                            </span> 
                        </li>}
                        
                    </ul>
                </div> 

                <div className="mediumNavLinks">
                    <ul>
                        <li>
                            <Link to="/"> 
                                Home
                            </Link>
                        </li>
                        {!currentUser && (
                            <li>
                            <Link to="/login">
                                Sign in
                            </Link>
                        </li>
                        )}

                        {currentUser && 
                            <li>
                                <Link to='/studentArea'>
                                     My account
                                </Link>
                            </li>}
                        {currentUser && 
                            <li>
                            <span onClick = {()=>signOut()}>
                                LogOut
                            </span> 
                        </li>}
                        
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