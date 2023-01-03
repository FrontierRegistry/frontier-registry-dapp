import { Col, Row } from "react-bootstrap";
import logo from '../../../../assets/img/logo.jpg';
import "./index.scss";

const FooterMiddle = () => {

    return (
        <Row className="footerMiddle-component">
            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="logo-component item">
                <img src={logo} />
                <div>
                    should read FrontierRegistry
                </div>
                <p>
                    On-Chain Scientific Publishing
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="marketplace item">
                <p className="title">
                    Marketplace
                </p>
                <p>
                    IP /Science/ Engineering minted as NFTs
                </p>
                <p>
                    New Research Published
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="my-account item">
                <p className="title">
                    My Account
                </p>
                <p>
                    profile
                </p>
                <p>
                    Favourite
                </p>
                <p>My collection</p>
                <p>Settings</p>

                <p className="title" style={{ marginTop: '20px' }}>
                    Stats
                </p>
                <p>
                    Rankings
                </p>
                <p>
                    Activities
                </p>
            </Col>

            <Col xl={3} lg={4} md={6} sm={6} xs={6} className="resources item">
                <p className="title">
                    Resources
                </p>
                <p>
                    Help center
                </p>
                <p>
                    Platform status
                </p>
                <p>
                    Partners
                </p>

                <p className="title" style={{ marginTop: '20px' }}>
                    FrontierDAO
                </p>
                <p>
                    About FrontierRegistry
                </p>
            </Col>
        </Row>
    );
}

export default FooterMiddle;