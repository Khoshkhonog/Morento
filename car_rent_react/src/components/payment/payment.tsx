import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { Car } from "../types"
import { useAppContext } from "../context/context";




const Payment: React.FC = () => {
    const params = useParams()
    const { getCarById } = useAppContext()
    const itemID: number = (params.item ? JSON.parse(params.item) : []);
    const [item, setItem] = useState<Car>();
    useEffect(() => {
        setItem(getCarById(itemID))
    })
    return <div className="payment">
        <div className="payment-info">
            <div className="billing-info">
                <h2>Billing Info</h2>
                <div className="undertext">Please enter your billing info</div>
                <div className="payment-inputs">
                    <div className="payment-input-container">
                        <input id="name" type="text" placeholder="Name" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="payment-input-container">
                        <input id="phone" type="text" placeholder="Phone Number" />
                        <label htmlFor="phone">Phone</label>
                    </div>
                    <div className="payment-input-container">
                        <input id="address" type="text" placeholder="Address" />
                        <label htmlFor="adress">Adress</label>
                    </div>
                    <div className="payment-input-container">
                        <input id="town" type="text" placeholder="Town / City" />
                        <label htmlFor="town">Town / City</label>
                    </div>
                </div>
            </div>
            <div className="rental-info">
                <h2>Rental Info</h2>
                <div className="rental-inputs">
                    <div className="radio-input-container">
                        <input type="radio" name="pick" id="pick" />
                        <label htmlFor="pick">Pick - Up</label>
                    </div>
                    <div className="payment-inputs">
                        <div className="payment-input-container">
                            <select name="Locations" id="" title="Locations">
                                <option>Select your city</option>
                                <option>City1</option>
                                <option>City2</option>
                            </select>
                        </div>
                        <div className="payment-input-container">
                            <select name="Date" id="" title="Locations">
                                <option>Select your date</option>
                                <option>Date1</option>
                                <option>Date2</option>
                            </select>
                        </div>
                        <div className="payment-input-container">
                            <select name="Time" id="" title="Locations">
                                <option>Select your time</option>
                                <option>Time1</option>
                                <option>Time2</option>
                                <option>Time3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="rental-inputs">
                    <div className="radio-input-container">
                        <input type="radio" name="pick" id="pick" />
                        <label htmlFor="pick">Drop - Off</label>
                    </div>
                    <div className="payment-inputs">
                        <div className="payment-input-container">
                            <select name="Locations" id="" title="Locations">
                                <option>Select your city</option>
                                <option>City1</option>
                                <option>City2</option>
                            </select>
                        </div>
                        <div className="payment-input-container">
                            <select name="Date" id="" title="Locations">
                                <option>Select your date</option>
                                <input type="date" name="Date" id="" title="Date" />
                            </select>
                        </div>
                        <div className="payment-input-container">
                            <select name="Time" id="" title="Locations">
                                <option>Select your time</option>
                                <option>Time1</option>
                                <option>Time2</option>
                                <option>Time3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-methods">
                <h2>Payment Methods</h2>
                <div className="payment-methods-container">
                    <div className="payment-method">
                        <div className="payment-method-input">
                            <input type="radio" name="payment" id="payment" />
                            <label htmlFor="payment">
                                <div>Credit Card</div>
                                <img src="/img/payment/visa.svg" alt="" />
                            </label>
                        </div>
                        <div className="payment-inputs-block">
                            <div className="payment-input-container">
                                <input id="card" type="text" placeholder="Card Number" />
                                <label htmlFor="card">Card Number</label>
                            </div>
                            <div className="payment-input-container">
                                <input id="Expration" type="text" placeholder="DD / MM / YY" />
                                <label htmlFor="card">Expration Date</label>
                            </div>
                            <div className="payment-input-container">
                                <input id="holder" type="text" placeholder="Card Holder" />
                                <label htmlFor="card">Card Holder</label>
                            </div>
                            <div className="payment-input-container">
                                <input id="card" type="text" placeholder="CVC" />
                                <label htmlFor="CVC">CVC</label>
                            </div>
                        </div>
                    </div>
                    <div className="payment-method">
                        <input type="radio" name="payment" id="payment" />
                        <label htmlFor="payment">Paypal</label>
                    </div>
                </div>
            </div>
            <div className="confirmation">
                <div className="confirmation-title">
                    <h2>Confirmation</h2>
                    <div className="undertext">We are getting to the end. Just few clicks and your rental is ready!</div>
                </div>
                <div className="confirmation-checkboxs">
                    <div className="checkbox-container">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox">I agree with sending an Marketing and newsletter emails</label>
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox">I agree with our terms and conditions and privacy policy.</label>
                    </div>
                </div>
                <button className="primary-button">Rent now</button>
            </div>
            <div className="security">
                <img src="/img/payment/ic-security-safety.svg" alt="" />
                <div>All your data are safe</div>
                <div className="undertext">We are using the most advanced security
                    to provide you the best experience ever.</div>
            </div>
        </div>
        <div className="summary">
            <div className="summary-title">
                <h3>Rental Summary</h3>
                <div className="undertext">Prices may change depending on the length of the
                    rental and the price of your rental car.</div>
            </div>
            <div className="payment-item">
                <div className="payment-item-container">
                    <div className="item-img-container">
                        <img src={item?.carImage} alt="" />
                    </div>
                    <div className="item-info">
                        <h2>{item?.carName}</h2>
                    </div>
                </div>
                <hr />
                <div className="item-price-container">
                    <div className="payment-price-container">
                        <div>Subtotal</div>
                        <div className="bold">${item?.carPrice}</div>
                    </div>
                    <div className="payment-price-container">
                        <div>Tax</div>
                        <div className="bold" >$0</div>
                    </div>
                </div>
                <div className="promo-code"></div>
                <div className="total-price">
                    <div className="total-text">
                        <div className="bold">Total Rental Price</div>
                        <div className="undertext">Overall price and includes rental discount</div>
                    </div>
                    <div className="bold">${item?.carPrice}</div>
                </div>
            </div>
        </div>
    </div>
}
export default Payment