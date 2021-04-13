import { createContext, useState } from 'react';

export const DrawerBarContext = createContext();

const DrawerBarContextProvider = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <DrawerBarContext.Provider value={{ open, setOpen }}>
      {props.children}
    </DrawerBarContext.Provider>
  );
};

export default DrawerBarContextProvider;