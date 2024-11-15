import logo from '../../img/Logo.png'

export default function Logo() {
    return (
        <>
            <div className="flex logo">
                <a href="/" className="flex items-center left-0">
                    <img src={logo} className="w-16 mx-5 invert" alt="PhilantroHub Logo" />
                </a>
            </div>
        </>
    );
}