import logo from '../../assets/logo/medizy.png';

const SignInLogo = ({ compact }) => {
    return (
        <div className="flex items-center space-x-1">
            <img src={logo} alt="Med Advisor" className={compact ? "w-8 h-4" : " h-10"} />

        </div>    
    );
};

export default SignInLogo;