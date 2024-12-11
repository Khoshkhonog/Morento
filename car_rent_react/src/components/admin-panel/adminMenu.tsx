import { useAppContext } from "../context/context";
import { useEffect, useState } from "react";
import AddCarMenu from "./addCarMenu";
import ChangeCarMenu from "./changeCarMenu";
function AdminMenu() {
    const { currentUser } = useAppContext();
    const [showCompanets, setShowCompanets] = useState({
        placeholder: true,
        addCar: false,
        changeCar: false
    });
    const handleShowCompanets = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const value = event.currentTarget.value as keyof typeof showCompanets;
        setShowCompanets((prevState) => ({
            [value]: !prevState[value],
            placeholder: value === 'placeholder' ? !prevState.placeholder : false,
            addCar: value === 'addCar' ? !prevState.addCar : false,
            changeCar: value === 'changeCar' ? !prevState.changeCar : false,
        }));
    }

    return (
        <div className="admin-menu">
            {currentUser?.role_id === 2 && (
                <div className="admin-menu-container">
                    <div className="side-navigation">
                        <button type="button"
                            value={'placeholder'}
                            className={showCompanets.placeholder ? 'admin-menu-button-active' : 'admin-menu-button-unactive'}
                            onClick={(event) => handleShowCompanets(event)}>Menu</button>
                        <button className={showCompanets.addCar ? 'admin-menu-button-active' : 'admin-menu-button-unactive'}
                            value={'addCar'}
                            onClick={(event) => handleShowCompanets(event)}>Add car</button>
                        <button className={showCompanets.changeCar ? 'admin-menu-button-active' : 'admin-menu-button-unactive'}
                            value={'changeCar'}
                            onClick={(event) => handleShowCompanets(event)}>Change car</button>
                    </div>
                    <div>
                        <div style={{ display: showCompanets.placeholder ? 'block' : 'none' }}>
                            <h1>Admin menu</h1>
                        </div>
                        <div style={{ display: showCompanets.addCar ? 'block' : 'none' }}>
                            <AddCarMenu />
                        </div>
                        <div style={{ display: showCompanets.changeCar ? 'block' : 'none' }}>
                            <ChangeCarMenu />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminMenu