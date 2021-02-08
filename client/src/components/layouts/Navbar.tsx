import React, { useRef, useState, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import classNames from "classnames";
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
        routes: [
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
        routes: [
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
        routes: [
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
    type: "secondary-outlined",
    icon: <AddLocationOutlinedIcon fontSize="small" />,
  },
];

export const Navbar = () => {
  // States
  const [subpanelPath, setSubpanelPath] = useState<string | null>(null);
  // References
  const subpanelRef = useRef<HTMLDivElement>(null!);

  // Methods
  // -------------------------------------------------------------------
  // Close subpanel
  const closeSubpanel = useCallback(() => {
    const subpanel = subpanelRef.current;

    subpanel.classList.remove("navbar__subpanel--is-extended");
    setSubpanelPath(null);
  }, []);

  // Open subpanel
  const openSubpanel = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const subpanel = subpanelRef.current;
    const pathname = element.dataset.path || element.getAttribute("data-path");

    subpanel.classList.add("navbar__subpanel--is-extended");
    setSubpanelPath(pathname);
  }, []);

  // Handlers
  // -------------------------------------------------------------------
  // Open corresponding subpanel
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLElement>) =>
    openSubpanel(e);

  // Close subpanel
  const handleSubpanelMouseLeave = (e: React.MouseEvent<HTMLElement>) =>
    closeSubpanel();

  // Variables
  const routesList = routes.map(({ path, text }) => (
    <li
      className={classNames(
        "navbar__item",
        path === subpanelPath && "navbar__item--is-hovered"
      )}
      key={path}
    >
      <NavLink
        className="navbar__link"
        activeClassName="navbar__link--is-active"
        to={path}
        data-path={path}
        onMouseEnter={handleLinkMouseEnter}
      >
        {text}
      </NavLink>
    </li>
  ));

  // Close subpanel when the mouse leaves the window
  useEffect(() => {
    document.addEventListener("mouseleave", closeSubpanel);
    return () => document.removeEventListener("mouseleave", closeSubpanel);
  }, [closeSubpanel]);

  const sublists = routes
    .filter(({ sublist }) => sublist)
    .map(({ path, sublist }) => {
      return (
        path === subpanelPath && (
          <div className="navbar__sublist-wrapper" key={path}>
            <div className="row">
              {sublist.map(({ title, routes }, index) => (
                <div className="col-12 col-sm-6 col-md-3" key={index}>
                  <div className="navbar__sublist">
                    {title && (
                      <h3 className="navbar__sublist-title">{title}</h3>
                    )}
                    <ul className="navbar__sublist-options">
                      {routes.map(({ path, text }) => (
                        <li className="navbar__subitem" key={path}>
                          <Link
                            className="navbar__link navbar__link--subpanel"
                            to={path}
                          >
                            {text}
                          </Link>
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

  const buttonsList = buttons.map(({ icon, text, type }, index) => (
    <li className="navbar__item" key={index}>
      <Wave
        component={
          <Button
            icon={icon}
            text={text}
            modifiers={["secondary", "medium-500", type]}
            mixes={["navbar"]}
          />
        }
      />
    </li>
  ));

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
