import { createContext, useContext, useState } from "react";

const PackageContext = createContext();

export const PackageProvider = 
({ children}) => {
    const [selectedPackageId, setSelectedPackageId] = useState(null);

    const setPackageId = (packageId) => {
        setSelectedPackageId(packageId);
    };

    return (
        <PackageContext.Provider value={{ selectedPackageId, setPackageId}}>
            {children}
        </PackageContext.Provider>
    )

};

export const usePackage = () => {
    return useContext(PackageContext);
}