import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
} from 'react-bootstrap'
import { CKEditor } from 'ckeditor4-react';
import Web3 from 'web3';
import { navLinks } from '../../services/constants';
import TitleConfirmModal from '../../components/TitleConfirmModal';
import {
  pinJSONToIPFS,
} from '../../services/pinata';
import { useWeb3Auth } from "../../services/web3auth";
import "./index.scss";
import { contractAddress } from '../../config/chainConfig';
import contractAbi from '../../config/abi.json';
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const NewBlog = () => {
  const { provider, getAccounts } = useWeb3Auth();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [show, setShow] = useState(false);
  const [wallet, setWallet] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = async () => {
    // close modal
    handleClose();

    const newBlogId = await contract.methods.getCurrentId().call() + 1;

    // publish blog to chain
    const JSONBody = {
      name: `Frontier Dao Blog ${newBlogId}`,
      description: title,
      image: 'https://mirror-media.imgix.net/nft/K9qSJMuXh47G5yr-3druc.jpg?h=null&w=null&auto=compress',
      attributes: [
        {
          trait_type: "title",
          value: title,
        },
      ]
    }

    const { success, pinataUrl } = await pinJSONToIPFS(JSONBody);
    console.log("success: ", success);
    if (success) {
      await contract.methods
        .publishBlog(
          title,
          content,
          pinataUrl,
        )
        .send({
          to: contractAddress,
          from: wallet,
          gasLimit: 2000000,
        });

      window.alert("blog published");
    }
  }

  const handlePublish = async () => {
    if (content == '') {
      window.alert("Blank content!");
      return;
    }
    const title = content.split('\n')[0];
    setTitle(title.replace(/<[^>]+>/g, '').replace('&nbsp;', ' '));
    handleShow();
  }

  useEffect(() => {
    console.log("title: ", title);
  }, [title])

  useEffect(() => {
    (async () => {
      if (provider === null) return;
      const account = await getAccounts();
      setWallet(account[0]);
    })();
  }, [provider]);

  return (
    <div className="new-blog">
      {/* <div className="react-notification-alert-container">   
        </div> */}
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
        <Col md="8" className='new-blog-component'>
          <div className='new-blog-component-header'>
            <h2 className='new-blog-text'>New Blog</h2>
            <div className='buttons'>
              <button
                onClick={() => setIsPreview(!isPreview)}
              >
                {
                  isPreview ? 'Edit' : 'Preview'
                }
              </button>
              <button
                onClick={() => handlePublish()}
              >
                Publish
              </button>
            </div>
          </div>
          <div
            className={isPreview ? 'ckeditor-component-wrapper preview-mode' : 'ckeditor-component-wrapper'}
          >
            <CKEditor
              initData=""
              onInstanceReady={() => {
                console.log("editor is ready");
              }
              }
              onChange={(event) => {
                setContent(event.editor.getData());
              }}

              readOnly={isPreview ? true : false}
            />
          </div >
        </Col>
      </Row>
      <TitleConfirmModal
        show={show}
        handleClose={handleClose}
        title={title}
        handleConfirm={handleConfirm}
        setTitle={setTitle}
      />
    </div>
  )
}

export default NewBlog
