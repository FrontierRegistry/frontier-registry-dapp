import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { AiOutlineRight } from 'react-icons/ai';
import Web3 from 'web3';
import { useWeb3Auth } from "../../services/web3auth";
import { navLinks } from '../../services/constants';
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
import "./index.scss";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const MyBlogs = () => {
  const { provider, getAccounts } = useWeb3Auth();
  const [wallet, setWallet] = useState('');
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      const account = await getAccounts();
      setWallet(account[0]);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333333333333333");
      const myBlogList = await contract.methods.getBlogsByWallet(account[0]).call();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>444444444444444");
      console.log("my blogs: ", myBlogList);
      const myBlogs = myBlogList.map((item, _) => (
        {
          title: item.title,
          content: item.content,
          dateTime: item.timestamp,
        }
      ));
      setMyBlogs(myBlogs);

      console.log("my blogs: ", myBlogList);
    })();
  }, [wallet, provider]);

  return (
    <div className="my-blogs">
      <Row>
        <Col md="4" className='sidebar'>
          <div className='navlinks'>
            {
              navLinks.map((item, index) => (
                <div
                  className='navlink-item'
                  key={index}
                >
                  <a
                    href={item.href}
                  >
                    {item.name}
                  </a>
                </div>
              ))
            }
          </div>
        </Col>
        <Col md="8" className='my-blogs-component'>
          <div className='my-blogs-title'>
            My Blogs
          </div>
          {
            myBlogs.map((item, index) => (
              <div
                className='my-blog-item'
                key={index}
              >
                <div>
                  <div
                    className='my-blog-item-title'>
                    {item.title}
                  </div>

                  <div
                    className='my-blog-item-datetime'>
                    <Moment format="YYYY/MM/DD hh:mm:ss">
                      {new Date(parseInt(item.dateTime + '000'))}
                    </Moment>
                  </div>
                </div>

                <div
                  className='right-icon-wrapper'
                  onClick={() => navigate(`/detail-blog/${index}`)}
                >
                  <AiOutlineRight />
                </div>
              </div>
            ))
          }
        </Col>

      </Row>
    </div>
  )
}

export default MyBlogs
