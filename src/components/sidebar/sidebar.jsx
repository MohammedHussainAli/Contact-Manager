import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faChartBar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };
  const menuItems = [
    {
      name: "Menu",
      iconName: faBars,
    },
    {
      name: "Contact",
      iconName: faEnvelope,
      path: "/contacts",
    },
    {
      name: "Charts",
      iconName: faChartBar,
      path: "/charts",
    },
    {
      name: "LogOut",
      iconName: faSignOutAlt,
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");
  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  return (
    <div className={`sidebar ${expanded && "expanded"}`}>
      <div className="head_text">Contact Manager</div>
      {menuItems.map((item, index) => {
        let middle = false;
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true;
        }
        return (
          <Link to={item.path}>
            <div
              className={`boxicon-container ${
                expanded && "expanded-boxicon-container"
              }`}
              onMouseEnter={() => {
                if (middle) {
                  setHovered(index);
                }
              }}
              onMouseLeave={() => {
                if (middle) {
                  setHovered(null);
                }
              }}
              onClick={() => {
                if (middle) {
                  setActive(index);
                }
                if (index === 0) {
                  setExpanded(!expanded);
                }
              }}
              key={index}
            >
              <FontAwesomeIcon
                className={`${middle && "boxicon"} ${
                  !middle && "first-and-last-trash-fix"
                } ${active === index && "active"}`}
                size="2x"
                icon={item.iconName}
                color={
                  hovered === index || active === index ? "white" : item.color
                }
                //   rotate={item.rotate}
              />
              <p
                className={`description ${expanded && "show-description"} ${
                  active === index && "active-description"
                }`}
              >
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
    // <div class="sidebar-container">
    //   <div class="sidebar-logo">
    //     Contact Manager
    //     {/* <NavLink exact to="/" class="menu-item" activeClassName="active">
    //       Contact Manager
    //     </NavLink> */}
    //     <button class="mobile-menu-toggle" onTouchEnd={toggleMobileMenu}>
    //       <span class="menu-icon">&#9776;</span>
    //     </button>
    //   </div>
    //   <nav class={`sidebar-menu ${isMobileMenuOpen ? "open" : ""}`}>
    //     <ul>
    //       <li>
    //         <NavLink to="/contacts" class="menu-item" activeClassName="active">
    //           Contacts
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/charts" class="menu-item" activeClassName="active">
    //           Charts
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
}
