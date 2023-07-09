/* eslint-disable react/no-unescaped-entities */
import {Link} from "react-router-dom";
import "./NotFound.css";
import notFound from "../../assets/images/error.gif"

const NotFound = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="error-image">
                                <img src={notFound} alt="404"/>
                            </div>
                            <div className="four_zero_four_bg">
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">Looks like you're lost</h3>

                                <p>
                                    The page you are looking for is not available!
                                </p>

                                <Link to="/home" className="link_404">
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
