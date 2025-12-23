import logo from '../../assets/logo/medizy.png';

const SignInLogo = ({ compact }) => {
    return (
        <div className="flex items-center space-x-1">
            <img src={logo} alt="Med Advisor" className={compact ? "w-35 h-15" : " h-18"} />

        </div>    
    );
};

export default SignInLogo;