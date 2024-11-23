import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Frontpage from './components/frontpage/Frontpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Ngo from './components/ngo/Ngofp';
import ViewMore from './components/ngo/ViewMore';
import Profile from './components/Profile/Profile';
import NGOadd from './components/header/NGOadd';
import ViewUserNGO from './components/ngo/viewNGO';
// import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";

function App() {

  const [payment, setPayment] = useState(null);

  const handleCompletePayment = (paymentData) => {
    setPayment(paymentData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/" element={<>
            <Header />
            <Frontpage />
          </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/view-more/:name" element={<ViewMore />} />
        <Route path="/userviewngo" element={<ViewUserNGO />} />
        {/* <Route path="/payment" element={<PaymentForm />} /> */}
        <Route path="/paymentstatus" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}

export default App;