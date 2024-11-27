import Shwetank from '../../img/shwetank.png';
import Shubham from '../../img/goyal.png';
import Siddham from '../../img/siddham.png';
import Logo from '../../img/Logo.png';
import TeamPic from '../../img/team.png';

export default function Page4() {
    return (
        <>
            <div className="frontpage_main4 flex flex-col w-auto items-center">
                <div className="frontpage_part4 w-full">
                    <div className="flex text-4xl font-bold justify-center" style={{ marginTop: '1%' }}>
                        <h1>Know Our Team</h1>
                    </div>

                    <div className="pps flex h-full justify-evenly" style={{ backgroundImage: `url{${TeamPic}}` }}>

                        <div className="lg:grid1 lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-4 p1 md:flex md:flex-col" >
                            <div className="shwetank flex flex-col items-center bg-slate-100 rounded-3xl relative group ">
                                <div className="shwetapp bg-cover bg-center w-80 h-80">
                                    <img src={Shwetank} alt="" />
                                </div>

                                <div className="memdesc1 absolute text-3xl text-center w-80 h-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h1>Hey, I am Shwetank Dohroo Working on the Frontend of PhilantroHub</h1>
                                </div>

                                <h1 className="text-2xl" style={{ padding: '1%' }}>Shwetank Dohroo</h1>
                            </div>

                            <div className="" ></div>

                            <div className="Siddham flex flex-col items-center bg-slate-100 rounded-3xl relative group">
                                <div className="siddpp bg-cover bg-center w-80 h-80">
                                    <img src={Siddham} alt="" />
                                </div>
                                <div className="memdesc3 absolute text-3xl text-center w-80 h-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h1>Hey, I am Siddham Jain Working on implementing Chatbot inside our PhilantroHub</h1>
                                </div>
                                <h1 className="text-2xl" style={{ padding: '1%' }}>Siddham Jain</h1>
                            </div>

                            <div className=""></div>

                            <div className="shubham flex flex-col items-center bg-slate-100 rounded-3xl relative group ">
                                <div className="goyalpp bg-cover bg-center w-80 h-80">
                                    <img className="bottom-0" src={Shubham} alt="" />
                                </div>
                                <div className="memdesc2 absolute text-3xl text-center w-80 h-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h1>Hey, I am Shubham Goyal Working on Backend of the PhilantroHub</h1>
                                </div>
                                <h1 className="text-2xl" style={{ padding: '1%' }}>Shubham Goyal</h1>
                            </div>
                        </div>
                    </div>



                    <footer className="rounded-lg shadow dark:bg-gray-100 m-4">
                        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                    <img src={Logo} className="h-20 invert" alt="Flowbite Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">PhilantroHub</span>
                                </a>
                                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                    <li>
                                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">PhilantroHub</a>. All Rights Reserved.</span>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
