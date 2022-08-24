import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context'

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import Home from './pages/Home';


// esablish link to graphql server
const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

// creates connection to the API endpoint & initiate new cache object
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


// enable entire app to interact with our Apollo client instance
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
              <Route path='/profile'>
                <Route path=':username' element={<Profile />} />
                <Route path='' element={<Profile />} />
              </Route>
              <Route
                path='/thought/:id'
                element={<SingleThought />}
              />
              <Route
                path='*'
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
