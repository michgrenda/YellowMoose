import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

// Interfaces
interface Routes {
  path: string;
  text: string;
  sublist?: {
    title: string;
    options: {
      path: string;
      text: string;
    }[];
  }[];
}

// TEMPORARY
const routes: Routes[] = [
  {
    path: "/buy",
    text: "kup",
    sublist: [
      {
        title: "",
        options: [
          {
            path: "/apartments",
            text: "mieszkanie",
          },
          {
            path: "/houses",
            text: "dom",
          },
          {
            path: "/plots",
            text: "działkę",
          },
          {
            path: "/commercial-buildings",
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
            path: "/for-rent/rooms",
            text: "pokój",
          },
          {
            path: "/for-rent/apartments",
            text: "mieszkanie",
          },
          {
            path: "/for-rent/houses",
            text: "dom",
          },
          {
            path: "/for-rent/plots",
            text: "działkę",
          },
          {
            path: "/for-rent/commercial-buildings",
            text: "nieruchomość komerycyjną",
          },
        ],
      },
      {
        title: "komuś",
        options: [
          {
            path: "/form/rooms",
            text: "pokój",
          },
          {
            path: "/form/apartments",
            text: "mieszkanie",
          },
          {
            path: "/form/houses",
            text: "dom",
          },
          {
            path: "/form/plots",
            text: "działkę",
          },
          {
            path: "/form/commercial-buildings",
            text: "nieruchomość komerycyjną",
          },
        ],
      },
    ],
  },
];

const Navbar: React.FC = () => {
  // States
  // [navbar__sublist-wrapper , navbar__item--is-hovered]
  const [subpanelElements, setSubpanelElements] = useState<
    [HTMLElement, HTMLElement] | null
  >(null);

  // References
  const subpanel = useRef<HTMLDivElement | null>(null);

  // Handlers
  // -------------------------------------------------------------------
  // Open corresponding subpanel
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const pathname: string | null =
      e.currentTarget.dataset.path || e.currentTarget.getAttribute("path");

    if (subpanel && subpanel.current) {
      subpanel.current.classList.add("navbar__subpanel--is-extended");

      const subpanelChildren = Array.from(
        subpanel.current.children
      ) as HTMLElement[];

      const currentSublistWrapper = subpanelChildren.find((sublistWrapper) => {
        const name: string | null =
          sublistWrapper.dataset.name || sublistWrapper.getAttribute("name");

        if (pathname && name) return name === pathname;
        return false;
      });

      const parentElement = e.currentTarget.parentElement;

      if (currentSublistWrapper && parentElement) {
        parentElement.classList.add("navbar__item--is-hovered");

        currentSublistWrapper.style.display = "block";

        setSubpanelElements([currentSublistWrapper, parentElement]);
      }
    }
  };

  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    closeSubpanel(e);
  };

  const handleSubpanelMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    closeSubpanel(e);
  };

  // Methods
  // -------------------------------------------------------------------
  // Close subpanel
  const closeSubpanel = (e: React.MouseEvent<HTMLElement>) => {
    if (subpanel && subpanel.current) {
      if (
        !(
          e.relatedTarget instanceof HTMLElement &&
          subpanel.current.contains(e.relatedTarget)
        )
      ) {
        subpanel.current.classList.remove("navbar__subpanel--is-extended");

        if (subpanelElements) {
          subpanelElements[0].style.display = "none";
          subpanelElements[1].classList.remove("navbar__item--is-hovered");
        }
      }
    }
  };

  const routesList = routes.map(
    (route: Routes): JSX.Element => (
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
    )
  );

  const sublists = routes.map((route: Routes): JSX.Element | undefined => {
    return (
      route.sublist && (
        <div
          className="navbar__sublist-wrapper"
          style={{ display: "none" }}
          key={route.path}
          data-name={route.path}
        >
          <div className="row">
            {route.sublist.map(
              (
                subitem: {
                  title: string;
                  options: {
                    path: string;
                    text: string;
                  }[];
                },
                index
              ): JSX.Element => (
                <div className="col-12 col-sm-6 col-md-3" key={index}>
                  <div className="navbar__sublist">
                    {subitem.title && (
                      <h3 className="navbar__sublist-title">{subitem.title}</h3>
                    )}
                    <ul className="navbar__sublist-options">
                      {subitem.options.map(
                        (option: {
                          path: string;
                          text: string;
                        }): JSX.Element => (
                          <li className="navbar__subitem" key={option.path}>
                            <NavLink
                              className="navbar__link navbar__link--subpanel"
                              to={option.path}
                            >
                              {option.text}
                            </NavLink>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}
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
                </div>
              </div>
              <div className="col-12">
                <div
                  className="navbar__subpanel"
                  ref={subpanel}
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

export default Navbar;
