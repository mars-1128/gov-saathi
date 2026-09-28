import React, { createContext, useContext, useState } from 'react';

export const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi (NCT)',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh'
];

interface LocationContextType {
  state: string;
  setState: (state: string) => void;
  district: string;
  setDistrict: (district: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setStateValue] = useState<string>(() => {
    return localStorage.getItem('gov_saathi_state') || 'All India';
  });

  const [district, setDistrictValue] = useState<string>(() => {
    return localStorage.getItem('gov_saathi_district') || '';
  });

  const setState = (newState: string) => {
    localStorage.setItem('gov_saathi_state', newState);
    setStateValue(newState);
  };

  const setDistrict = (newDistrict: string) => {
    localStorage.setItem('gov_saathi_district', newDistrict);
    setDistrictValue(newDistrict);
  };

  return (
    <LocationContext.Provider value={{ state, setState, district, setDistrict }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within LocationProvider');
  return context;
};
