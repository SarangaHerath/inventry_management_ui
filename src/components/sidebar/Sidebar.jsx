// import React, { useState, useEffect } from 'react';
// import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList, FaProductHunt, FaShoppingBasket, FaBuilding } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import './sidebar.scss';
// import { Navbar } from '../navbar/Navbar';
// import { RadioButtonUnchecked, RadioRounded } from '@mui/icons-material';

// export const Sidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [expandedMenus, setExpandedMenus] = useState({});

//   const toggle = () => setIsOpen(!isOpen);

//   const toggleSubMenu = (index) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const menuItem = [
//     {
//       path: '/',
//       name: 'Dashboard',
//       icon: <FaTh style={{ color: 'blue'}} />,
     
//     },
//     {
//       path: '/productList',
//       name: 'Product List',
//       icon: <FaShoppingBag style={{ color: 'peru' }} />,
//       submenu: [
//         { path: '/productList', name: 'Product Lists' },
//         { path: '/productList/addnewproduct', name: 'Add New Product'},
//         { path: '/productList/editproduct', name: 'Edit Product'},
//       ],
//     },
//     {
//       path: '/shopsList',
//       name: 'Shops',
//       icon: <FaBuilding style={{ color: '#239B56' }} />,
//     },
//     { path: '/login', name: 'About', icon: <FaUserAlt style={{ color: 'green' }} /> },
//     { path: '/newsale', name: 'New Sale', icon: <FaShoppingBasket style={{ color: 'purple' }} /> },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsOpen(window.innerWidth > 1068); // Adjust the threshold as needed
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div
//         style={{
//           width: isOpen ? '250px' : '60px',
//           borderRight: isOpen ? '1px solid rgb(62, 62, 62)' : 'none',
//           flex: isOpen ? '1' : 'none',
//         }}
//         className="sidebar"
//       >
//         <div className="top_section">
//           <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
//             CBL AGENCY
//           </h1>
//           <div style={{ marginLeft: isOpen ? '0px' : '0px' }} className="bars">
//             <MenuOpenIcon className="MenuOpenIcon" onClick={toggle} />
//           </div>
//         </div>
//         {menuItem.map((item, index) => (
//           <div key={index}>
//             <div
//               className="link"
//               onClick={() => {
//                 toggleSubMenu(index);
//               }}
//             >
//               <div className="icon">{item.icon}</div>
//               <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
//                 {item.name}
//               </div>
//             </div>
//             {item.submenu && expandedMenus[index] && isOpen && (
//               <div className="submenu" style={{marginLeft:'50px',fontSize:'12px'}}>
//                 {item.submenu.map((subItem, subIndex) => (
//                   <NavLink key={subIndex} to={subItem.path} className="link" activeClassName="active" width="10px"fontSize="12px">
//                     <RadioButtonUnchecked className="MenuOpenIcon" onClick={toggle} />
                   
//                     <div className="link_text"style={{fontSize:'12px'}}>{subItem.name}</div>
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="main-wrapper">
//         <Navbar />
//         <main>{children}</main>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { FaTh, FaUserAlt, FaShoppingBag, FaBuilding, FaShoppingBasket, FaFileInvoice, FaMapMarkedAlt, FaDownload, FaSellcast, FaMoneyCheck, FaAccessibleIcon, FaBullseye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import './sidebar.scss';
import { Navbar } from '../navbar/Navbar';
import { RadioButtonUnchecked } from '@mui/icons-material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggle = () => setIsOpen(!isOpen);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };
  
  const toggleSubMenu = (index) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  // const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTh style={{ color: 'blue' }} /> },
    { path: '/productList', name: 'Product', icon: <FaShoppingBag style={{ color: 'peru' }} /> },
    { path: '/shopsList', name: 'Shops', icon: <FaBuilding style={{ color: '#239B56' }} /> },
    { path: '/deliveryRoute', name: 'Delivery Routes', icon: <FaMapMarkedAlt style={{ color: '#239B56' }} /> },
    { path: '/stockOut', name: 'Stock Out', icon: <FaSellcast style={{ color: 'green' }} /> },
    { path: '/newsale', name: 'New Sale', icon: <FaShoppingBasket style={{ color: 'purple' }} /> },
    { path: '/salesInvoice', name: 'Sales Invoice', icon: <FaFileInvoice style={{ color: '#2874A6' }} /> },
    { path: '/salesInvoiceDetails', name: 'Sales Invoice Details', icon: <FaFileInvoice style={{ color: '#2874A6' }} /> },
    { path: '/chequeDetails', name: 'Payment Details', icon: <FaMoneyCheck style={{ color: '#2874A6' }} /> ,
        submenu: [
              { path: '/chequeDetails', name: 'Cheque Lists' },
              { path: '/creaditlist', name: 'Creadit List'},
             
            ],
    },
    { path: '/login', name: 'About', icon: <FaUserAlt style={{ color: 'green' }} /> },
    
   
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1068); // Adjust the threshold as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container">
      <div
        style={{
          width: isOpen ? '250px' : '60px',
          borderRight: isOpen ? '1px solid rgb(62, 62, 62)' : 'none',
          flex: isOpen ? '1' : 'none',
        }}
        className="sidebar"
      >
        <div className="top_section">
          <NavLink to="/" className="logo-link" activeClassName="active">
            <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
              CBL AGENCY
            </h1>
          </NavLink>
          <div style={{ marginLeft: isOpen ? '0px' : '0px' }} className="bars">
            <MenuOpenIcon className="MenuOpenIcon" onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              <div
                className="link"
                onClick={() => {
                  toggleSubMenu(index);
                }}
              >
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </div>
            ) : (
              <NavLink to={item.path} className="link" activeClassName="active">
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </NavLink>
            )}
            {item.submenu && expandedMenus[index] && isOpen && (
              <div className="submenu" style={{ marginLeft: '50px', fontSize: '12px' }}>
                {item.submenu.map((subItem, subIndex) => (
                  <NavLink key={subIndex} to={subItem.path} className="link" activeClassName="active">
                    <FaBullseye className="MenuOpenIcon" onClick={toggle} />
                    <div className="link_text" style={{ fontSize: '12px' }}>
                      {subItem.name}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="main-wrapper">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};