import { PacmanLoader } from "react-spinners";

const Loading = () => {
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };

    const linkStyle = {
        color: "#",
        cursor: "pointer",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold"
    };

    return (
        <div style={style}>
            <PacmanLoader color="#000000"/>
            <a href="/auth" style={linkStyle}>
                Login nào!
            </a>
        </div>

    );
}

export default Loading;
