import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// Components
import { Button } from "../forms/controls/Button";
import { Wave } from "../Wave";
// Icons
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import AddLocationOutlinedIcon from "@material-ui/icons/AddLocationOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const routes = [
  {
    path: "/buy",
    text: "kup",
    sublist: [
      {
        title: "",
        options: [
          {
            path: "/buy/flats",
            text: "mieszkanie",
          },
          {
            path: "/buy/houses",
            text: "dom",
          },
          {
            path: "/buy/plots",
            text: "działkę",
          },
          {
            path: "/buy/commercial-buildings",
            text: "nieruchomość komerycyjną",
          },
        ],
      },
    ],
  },
  {
    path: "/rent",
    text: "wynajmij",
    sublist: [
      {
        title: "od kogoś",
        options: [
          {
            path: "/rent/for-rent/rooms",
            text: "pokój",
          },
          {
            path: "/rent/for-rent/flats",
            text: "mieszkanie",
          },
          {
            path: "/rent/for-rent/houses",
            text: "dom",
          },
          {
            path: "/rent/for-rent/plots",
            text: "działkę",
          },
          {
            path: "/rent/for-rent/commercial-buildings",
            text: "nieruchomość komerycyjną",
          },
        ],
      },
      {
        title: "komuś",
        options: [
          {
            path: "/rent/form/rooms",
            text: "pokój",
          },
          {
            path: "/rent/form/flats",
            text: "mieszkanie",
          },
          {
            path: "/rent/form/houses",
            text: "dom",
          },
          {
            path: "/rent/form/plots",
            text: "działkę",
          },
          {
            path: "/rent/form/commercial-buildings",
            text: "nieruchomość komerycyjną",
          },
        ],
      },
    ],
  },
];

const buttons = [
  {
    text: "ulubione",
    type: "secondary-outlined",
    icon: <FavoriteBorderOutlinedIcon fontSize="small" />,
  },
  {
    text: "dodaj ogłoszenie",
    type: "secondary-filled",
    icon: <AddLocationOutlinedIcon fontSize="small" />,
  },
];

export const Navbar = () => {
  // States
  // [navbar__sublist-wrapper , navbar__item--is-hovered]
  const [subpanelElements, setSubpanelElements] = useState<
    [HTMLElement, HTMLElement]
  >(null!);
  // References
  const subpanelRef = useRef<HTMLDivElement>(null!);

  // Methods
  // -------------------------------------------------------------------
  // Close subpanel
  const closeSubpanel = (e: React.MouseEvent<HTMLElement>) => {
    const subpanel = subpanelRef.current;
    if (subpanel) {
      if (
        !(
          e.relatedTarget instanceof HTMLElement &&
          subpanel.contains(e.relatedTarget)
        )
      ) {
        if (subpanelElements) {
          // Remove indicator
          subpanelElements[1].classList.remove("navbar__item--is-hovered");
          // Close subpanel
          subpanel.classList.remove("navbar__subpanel--is-extended");
          subpanelElements[0].style.display = "none";
        }
      }
    }
  };

  const openSubpanel = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const subpanel = subpanelRef.current;

    const pathname = element.dataset.path || element.getAttribute("path");

    if (subpanel) {
      const parentElement = element.parentElement;
      const subpanelChildren = Array.from(subpanel.children) as HTMLElement[];
      const currentSublistWrapper = subpanelChildren.find((sublistWrapper) => {
        const name =
          sublistWrapper.dataset.name || sublistWrapper.getAttribute("name");

        if (pathname && name) return name === pathname;

        return false;
      });

      if (currentSublistWrapper && parentElement) {
        // Add indicator
        parentElement.classList.add("navbar__item--is-hovered");
        // Open subpanel
        subpanel.classList.add("navbar__subpanel--is-extended");
        currentSublistWrapper.style.display = "block";

        setSubpanelElements([currentSublistWrapper, parentElement]);
      }
    }
  };

  // Handlers
  // -------------------------------------------------------------------
  // Open corresponding subpanel
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    openSubpanel(e);
  };

  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    closeSubpanel(e);
  };

  const handleSubpanelMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    closeSubpanel(e);
  };

  // Variables
  const routesList = routes.map((route) => (
    <li
      className="navbar__item"
      key={route.path}
      onMouseLeave={handleLinkMouseLeave}
    >
      <NavLink
        className="navbar__link"
        activeClassName="navbar__link--is-active"
        to={route.path}
        data-path={route.path}
        onMouseEnter={handleLinkMouseEnter}
      >
        {route.text}
      </NavLink>
    </li>
  ));

  const buttonsList = buttons.map((button, index) => (
    <li className="navbar__item" key={index}>
      <Wave
        component={
          <Button
            icon={button.icon}
            text={button.text}
            modifiers={["secondary", "medium-500", button.type]}
            mixes={["navbar"]}
          />
        }
      />
    </li>
  ));

  const sublists = routes.map((route) => {
    return (
      route.sublist && (
        <div
          className="navbar__sublist-wrapper"
          style={{ display: "none" }}
          key={route.path}
          data-name={route.path}
        >
          <div className="row">
            {route.sublist.map((subitem, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <div className="navbar__sublist">
                  {subitem.title && (
                    <h3 className="navbar__sublist-title">{subitem.title}</h3>
                  )}
                  <ul className="navbar__sublist-options">
                    {subitem.options.map((option) => (
                      <li className="navbar__subitem" key={option.path}>
                        <NavLink
                          className="navbar__link navbar__link--subpanel"
                          to={option.path}
                        >
                          {option.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    );
  });

  return (
    <header>
      <nav>
        <div className="container-fluid">
          <div className="navbar">
            <div className="row">
              <div className="col-12">
                <div className="navbar__panel">
                  <ul className="navbar__list">{routesList}</ul>
                  <ul className="navbar__list d-none d-lg-flex">
                    {buttonsList}
                  </ul>
                  <ul className="navbar__list d-flex d-lg-none">
                    <li className="navbar__item">
                      <Wave
                        component={
                          <Button
                            icon={<MenuOutlinedIcon />}
                            title="Menu"
                            modifiers={[
                              "menu-primary",
                              "border-radius-50",
                              "medium-500",
                            ]}
                            mixes={["navbar"]}
                          />
                        }
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="navbar__subpanel"
                  ref={subpanelRef}
                  onMouseLeave={handleSubpanelMouseLeave}
                >
                  {sublists}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
