import logo from '../../img/Logo.png'

export default function Logo({ scrolled }) {
    return (
        <div className="logo">
            <img
                src={logo}
                alt="Logo"
                className={`w-16 mx-5 transition-all duration-300 ${
                    scrolled ? 'filter invert' : ''
                }`}
            />
        </div>
    );
}
