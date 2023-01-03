import React, { useState, useEffect } from 'react'
import { Row, Col, } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import Web3 from 'web3';
import { navLinks } from '../../services/constants';
import { useWeb3Auth } from "../../services/web3auth";
import "./index.scss";
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const DetailBlog = () => {
  const { id } = useParams();
  const { provider, getAccounts } = useWeb3Auth();
  const [wallet, setWallet] = useState('');
  const [myCurrentBlog, setMyCurrentBlog] = useState({});

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      const account = await getAccounts();
      setWallet(account[0]);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>33333333333333333");
      const myBlogList = await contract.methods.getBlogsByWallet(account[0]).call();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>444444444444444");
      console.log("my blogs: ", myBlogList);
      const myCurrentBlog = {
        title: myBlogList[id].title,
        content: myBlogList[id].content.replace(/(?:\r\n|\r|\n)/g, '\n'),
        dateTime: myBlogList[id].timestamp,
      };
      setMyCurrentBlog(myCurrentBlog);
      console.log("my current blog content: ", myCurrentBlog.content);
    })();
  }, [wallet, provider, id]);

  return (
    <div className="detail-blog">
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
        <Col md="8" className='detail-blog-component'>
          <div className='detail-blog-component-header'>
            <h2 className='detail-blog-text'>{myCurrentBlog.title}</h2>
          </div>
          <div
            className='ckeditor-component-wrapper'
          >
            {
              myCurrentBlog.content &&
              <CKEditor
                initData={myCurrentBlog.content}
                onInstanceReady={() => {
                  console.log("editor is ready");
                }
                }
                readOnly
              />
            }

          </div >
        </Col>
      </Row>
    </div>
  )
}

export default DetailBlog
