import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Frontpage from './components/frontpage/Frontpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Ngo from './components/ngo/Ngofp';
import ViewMore from './components/ngo/ViewMore';
import Profile from './components/Profile/Profile';
<<<<<<< HEAD
import NGOadd from './components/header/NGOadd';
=======
import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";
>>>>>>> e716157c5a6bd64907d86e65807fa373ac255dee

function App() {

  const [payment, setPayment] = useState(null);

  const handleCompletePayment = (paymentData) => {
    setPayment(paymentData);
  };

  return (
    <Router>
      <Routes>
        //frontpage and header
        <Route
          path="/" element={<>
<<<<<<< HEAD
          <Header />
          <Frontpage />
          </>}/>
          //login
=======
            <Header />
            <Frontpage />
          </>} />
>>>>>>> e716157c5a6bd64907d86e65807fa373ac255dee
        <Route path="/login" element={<Login />} />
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/view-more/:name" element={<ViewMore />} />
<<<<<<< HEAD
        <Route path="/ngoadd" element={<NGOadd />} />
=======
>>>>>>> e716157c5a6bd64907d86e65807fa373ac255dee
      </Routes>
    </Router>
  );
}

export default App;

/*
Payment Gateway frontend code

<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                {!payment ? (
                  <PaymentForm onComplete={handleCompletePayment} />
                ) : (
                  <PaymentStatus payment={payment} />
                )}
</div>

*/