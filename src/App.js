import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

//customer
import Homepage from './component/homepage.js';
import ProductDetails from './component/productdetails';
import ProductBuyForm from './component/productbuyform';
import Invoice from './component/invoice';
import Payment from './component/payment';
import Cart from './component/cart';
import CartPayment from './component/cartpayment';
import CartInvoicePrint from './component/cartprintinvoice';
import InvoicePrint from './component/invoiceprint';
import ProductGetByCatagory from './component/productgetcatagory';
import SearchOrder from './component/searchorderstate';
import FailPayment from './component/payment_ssl/payment_fail';
//staff 
import StaffRegister from './component/staff_register';
import StaffLogin from './component/stafflogin';
import StaffProfile from './component/staffprofile/staffprofile';
import ProfitMargin from './component/staffprofile/profitmarfin';
import CostsEntry from './component/staffprofile/costsentry';
import CheckOrder from './component/staffprofile/checkorder';

//product
import ProductsList from './component/staffprofile/productslist';
import ProductsInsert from './component/staffprofile/productsinsert';
import ProductsUpdate from './component/staffprofile/productupdate';
import CatagoryInsert from './component/staffprofile/createcatagory';

//actions ceo
import HireDeliveryMan from './component/staffprofile/hiredeliveryman';
import StaffDetails from './component/staffprofile/staffdetails';
import AddNewDeliveryMan from './component/staffprofile/addnewdeliveryman';
import DeliveryList from './component/staffprofile/delivarymanlist';
import DeliveryReports from './component/staffprofile/deliveryreports';

//path for delivary man
import DeliveryManLogin from './component/deliveryman/deliverymanlogin';
import DeliveryProfile from './component/deliveryman/deliverymanprofile';
import Order from './component/deliveryman/order';
import SubmitForm from './component/deliveryman/submitform';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/productdetails/:cat/:id" element={<ProductDetails />} />
      <Route path="/productbuyform/:id" element={<ProductBuyForm />} />
      <Route path="/invoice/:id" element={<Invoice />} />
      <Route path="/printinvoice/:orderid" element={<InvoicePrint />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cartpayment/:id" element={<CartPayment />} />
      <Route path="/cartinvoice/:id" element={<CartInvoicePrint />} />
      <Route path="/search/:id" element={<ProductGetByCatagory />} />
      <Route path='/searchorder' element={<SearchOrder/>}/>
      <Route path='/fail-payment/' element={<FailPayment/>}/>
      {/* <Route path="/payment/:id" element={<Payment />} /> */}

      <Route path="/001.002.003/staffregister" element={<StaffRegister />} />
      <Route path="/001.002.003/stafflogin" element={<StaffLogin />} />
      <Route path="/001.002.003/"  >
        <Route index path="staffprofile/:id" element={<StaffProfile/>}/>
        <Route path="productlist/:id" element={<ProductsList/>}/>
        <Route path="profitmargin/:id" element={<ProfitMargin/>}/>
        <Route path="entrycost/:id" element={<CostsEntry/>}/>
        <Route path="productlist/:id/productinsert" element={<ProductsInsert/>}/>
        <Route path="productlist/:id/catagoryinsert" element={<CatagoryInsert/>}/>
        <Route path="productlist/:id/productupdate/:id" element={<ProductsUpdate/>}/>
        <Route path="checkorder/:id" element={<CheckOrder/>}/>
        <Route path="staffdetails" element={<StaffDetails/>}/>
        <Route path="hiredelivary/:id" element={<HireDeliveryMan/>}/>
        <Route path="deliverylist/:id" element={<DeliveryList/>}/>
        <Route path="deliverylist/addnew" element={<AddNewDeliveryMan/>}/>
        <Route path='deliverylist/deliveryreports' element={<DeliveryReports/>}/>
      </Route>

      <Route path='/shophome-deliver-system/'>
         <Route path='login' element={<DeliveryManLogin/>}/>
         <Route index path="profile/:id" element={<DeliveryProfile/>}/>
         <Route path="orders/:id" element={<Order/>}/>
         <Route path='searchorder/:id' element={<SubmitForm/>}/>
      </Route>
    </Routes>


  );
}
export default App;
