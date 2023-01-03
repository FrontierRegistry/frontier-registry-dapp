import { Col, Row } from "react-bootstrap";
import Image1 from '../../assets/img/article1.jpeg'
import Image2 from '../../assets/img/article2.jpeg'
import Image4 from "../../assets/img/article4.png";
import Image5 from '../../assets/img/article5.png'
import button from '../../assets/img/button.gif';
import "./index.scss";

const Blog = () => {
    const recentBlogs = [
        {
            title: 'Mario Virtual World',
            banner: Image4,
            description: 'Mario first edition collection. The First 10 will be the originals, before moving to the next...',
            status: 'Live',
        },
        {
            title: 'Divide Chain',
            banner: Image2,
            description: 'Experimental web3 platform put in the world to explore new models and concepts for funding...',
            status: 'Live',
        },
        {
            title: 'Mario Virtual World',
            banner: Image5,
            description: 'REW Racing is the latest Play-to-Earn competitive racing metaverse from the REW Motorsport team...',
            status: 'Live',
        }
    ];

    return (
        <Row className="blog-component">
            <section className="new-blog">
                <button className="explainer-video">
                    Explainer Video
                </button>
                <section className="content">
                    #DeSci
                    <br />
                    Decentralized Science
                    <br /><br />
                    Science As A Public Good
                </section>
                <button className="publish">
                    Publish Here
                </button>
            </section>
            <Row className="blogs">
                {
                    recentBlogs.map((blog, key) => (
                        <Col sm={4} key={key} className='blog-wrapper'>
                            <div className="blog">
                                <div className="banner">
                                    <img src={blog.banner} />
                                </div>
                                <div className="title">
                                    {blog.title}
                                </div>
                                <div className="description">
                                    {blog.description.slice(0, 80) + "..."}
                                </div>
                                <button className="status">
                                    {blog.status}
                                </button>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Row>
    );
}

export default Blog;