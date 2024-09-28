import './index.css';
import {FloatButton} from "antd";

const Footer = () => {
    return (
        <div className="">
            <div className="footer">
                <div className="logo">
                    <i className="fas fa-bolt"></i>
                    <a href="#">BookStore</a>
                </div>
                <ul className="socials">
                    <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest-p"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
                </ul>
                <div className="copyright">Copyright &copy; 2024 : Tấn Khang</div>
                <FloatButton.BackTop>
                    <div className="goTop"><i className="fas fa-arrow-circle-up"></i></div>
                </FloatButton.BackTop>
            </div>
        </div>
    );
}

export default Footer;
