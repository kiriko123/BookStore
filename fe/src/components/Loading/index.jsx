import { PacmanLoader, HashLoader} from "react-spinners";

const Loading = () => {
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };

    const linkStyle = {
        color: "#3a6073",
        cursor: "pointer",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "bold"
    };

    return (
        <div style={style}>
            <PacmanLoader color="#3a7bd5"/>
            <a href="/auth" style={linkStyle}>
                Login nào!
            </a>
        </div>

    );
}

export default Loading;
