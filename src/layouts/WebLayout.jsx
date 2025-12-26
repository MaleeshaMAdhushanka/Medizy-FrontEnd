
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import ChatWidget from "../chatClient/ChatWideget";

const WebLayout = ({children}) => {

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <NavBar/>
            <main className="flex-1">{children}</main>
            <Footer/>
            <ChatWidget/>

        </div>
    );
};
export default WebLayout;