import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Web3AuthProvider } from './services/web3auth';
import Layout from './components/Layout';
import Main from './pages/Main'
import NewBlog from './pages/NewBlog';
import MyBlogs from './pages/MyBlogs';
import DetailBlog from './pages/DetailBlog';
import './App.css';

const App = () => {
  const { REACT_APP_CHAIN_NAME, REACT_APP_MAINNET_OR_TESTNET } = process.env;

  return (
    <Router>
      <div className="app">
        <Web3AuthProvider web3AuthNetwork={REACT_APP_MAINNET_OR_TESTNET} chain={REACT_APP_CHAIN_NAME}>
          <Layout>
            <Routes>
              <Route path='/' element={< Main />} />
              <Route path='/new-blog' element={<NewBlog />} />
              <Route path='/my-blogs' element={<MyBlogs />} />
              <Route path='/detail-blog/:id' element={<DetailBlog />} />
            </Routes>
          </Layout>
        </Web3AuthProvider>
      </div>
    </Router>
  );
}

export default App;