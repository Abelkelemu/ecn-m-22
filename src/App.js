import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Switch, Route} from 'react-router-dom';
import './default.scss';

//actions
import { checkUserSession } from './redux/User/user.actions';

//higher order components
import WithAuth from './hoc/withAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Student from './pages/Student';
import StoryPage from './pages/StoryPage';
import YellowPages from './pages/YellowPages';
import Yearbook from './pages/Yearbook';



const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserSession());

  },[])

    return (
      <div className="App">
          <Switch>

            <Route exact path="/" render={() => (
               <HomepageLayout>
                 <Homepage/>
               </HomepageLayout>
            )}/>
  
            <Route  path="/login" render={() => (
               <MainLayout>
                 <Login/>
               </MainLayout>
            )}/>

            <Route path="/recovery" render = {() => (
              <MainLayout>
                <Recovery/>
              </MainLayout>
            )}/>
            
  
            <Route path="/studentArea" render = {() => (
              <WithAuth>
               <MainLayout>
                 <Student/>
               </MainLayout>
              </WithAuth>
            )} />

            <Route path="/storypage" render = {() => (
                <MainLayout>
                <StoryPage/>
               </MainLayout>
            )} />  

            <Route path="/yellowpages" render = {() => (
                <MainLayout>
                <YellowPages/>
               </MainLayout>
            )} />  
            
            
            <Route path="/yearbook" render = {() => (
                <MainLayout>
                <Yearbook/>
               </MainLayout>
            )} />

          </Switch>
      </div>
    );
    
}

export default App;
