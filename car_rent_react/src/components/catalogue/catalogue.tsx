import { useEffect, useState } from "react"
import ProductGrid from "./productGrid";

const Catalogue: React.FC = () => {
    const [switchMirror, setSwitchMirror] = useState<string>('row')

    const handleSwitchMirror = () => {
        console.log(switchMirror)
        setSwitchMirror(switchMirror === 'row' ? 'row-reverse' : 'row')
    }

    const [grindN, setGridN] = useState<number>(4)

    return <div className="catalogue">
        <div className="drop-pick">
            <div className="drop-pick-section">
                <div className="drop-pick-container">
                    <div className="drop">
                        <input type="radio" name="" id="" placeholder="drop" />
                        <div>Pick - Up</div>
                    </div>
                    <div className="selector-container">
                        <div className="selector r-border">
                            <div>Locations</div>
                            <select title="Locations">
                                <option value="">Select your city</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                        <div className="selector r-border">
                            <div>Date</div>
                            <select title="Date">
                                <option value="">Select your date</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                        <div className="selector">
                            <div>Time</div>
                            <select title="time">
                                <option value="">Select your time</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button title="switch" className="switch" onClick={handleSwitchMirror}><img src="./img/catalogue/Swap.svg" alt="" /></button>
                <div className="drop-pick-container">
                    <div className="drop">
                        <input type="radio" name="" id="" placeholder="drop" />
                        <div>Drop - Off</div>
                    </div>
                    <div className="selector-container">
                        <div className="selector r-border">
                            <div>Locations</div>
                            <select title="Locations">
                                <option value="">Select your city</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                        <div className="selector r-border">
                            <div>Date</div>
                            <select title="Date">
                                <option value="">Select your date</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                        <div className="selector">
                            <div>Time</div>
                            <select title="time">
                                <option value="">Select your time</option>
                                <option value="">Location</option>
                                <option value="">Location 1</option>
                                <option value="">Location 2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductGrid grindN={4} showMoreBtn={true} />
    </div>
}
export default Catalogue