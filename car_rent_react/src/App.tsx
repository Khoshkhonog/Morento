import Header from "./components/header/header";
import SignIn from './components/auth/signIn';
import Ads from "./components/ads/ads";
import ProductGrid from "./components/catalogue/productGrid";
import CategoryPage from './components/category/category'
import CarDetail from './components/catalogue/carDetail'
import WishList from './components/wishlist/wishlist';
import Registration from './components/auth/registration';
import ModelViewer from './components/model-viewer/ModelViewer';
import UserProfile from './components/auth/user-profile';
import SupportPanel from './components/techsupport/supportPanel';
import Footer from './components/footer/footer';
import SupportWindow from './components/techsupport/SupportWindow'
import Payment from './components/payment/payment';
import AddCarMenu from './components/admin-panel/addCarMenu';
import ChangeCarMenu from './components/admin-panel/changeCarMenu';
import AdminMenu from './components/admin-panel/adminMenu';
import PopOutTest from './components/pop-out/pop-out-test';
import { StateProvider } from './components/context/context'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {

  return (
    <>
      <StateProvider>
        <Router>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={
                <>
                  <Ads />
                  <ProductGrid grindN={4} showMoreBtn={true} />
                </>
              } />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/car/:item" element={<CarDetail />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/user-profile' element={<UserProfile />} />
              <Route path='/support-panel' element={<SupportPanel />} />
              <Route path='/support' element={<SupportWindow />} />
              <Route path='/payment/:item' element={<Payment />} />
              <Route path='/add-car-menu' element={<AddCarMenu />} />
              <Route path='/change-car-menu' element={<ChangeCarMenu />} />
              <Route path='/admin-menu' element={<AdminMenu />} />
              <Route path='*' element={<h1>404</h1>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </StateProvider>
    </>
  );
}

export default App;
