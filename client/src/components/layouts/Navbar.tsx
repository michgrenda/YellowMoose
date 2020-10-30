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
  const [sublist, setSublist] = useState<[HTMLElement, HTMLElement] | null>(
    null
  );

  // References
  const subpanel = useRef<HTMLDivElement | null>(null);

  //
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const path: string | null =
      e.currentTarget.dataset.path || e.currentTarget.getAttribute("path");
    const parentElement = e.currentTarget.parentElement;

    if (subpanel && subpanel.current) {
      subpanel.current.classList.add("navbar__subpanel--is-extended");
      const currentSublist: HTMLElement | undefined = (Array.from(
        subpanel.current.children
      ) as HTMLElement[]).find((sublistWrapper: HTMLElement) => {
        const name: string | null =
          sublistWrapper.dataset.name || sublistWrapper.getAttribute("name");

        if (path && name) return name === path;
        return false;
      });

      if (currentSublist && parentElement) {
        parentElement.classList.add("navbar__item--is-hovered");
        currentSublist.style.display = "flex";
        setSublist([currentSublist, parentElement]);
      }
    }
  };

  //
  const handleSubpanelClose = (e: React.MouseEvent<HTMLElement>) => {
    if (subpanel && subpanel.current) {
      if (
        !(e.relatedTarget instanceof HTMLElement) ||
        !subpanel.current.contains(e.relatedTarget)
      ) {
        subpanel.current.classList.remove("navbar__subpanel--is-extended");

        if (sublist) {
          sublist[0].style.display = "none";
          sublist[1].classList.remove("navbar__item--is-hovered");
        }
      }
    }
  };

  const routesList: JSX.Element[] = routes.map(
    (route: Routes): JSX.Element => (
      <li
        className="navbar__item"
        key={route.path}
        onMouseLeave={handleSubpanelClose}
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
        <span className="navbar__indicator"></span>
      </li>
    )
  );

  const sublists: (JSX.Element | undefined)[] = routes.map((route: Routes):
    | JSX.Element
    | undefined => {
    return (
      route.sublist && (
        <div
          className="navbar__sublist-wrapper"
          style={{ display: "none" }}
          key={route.path}
          data-name={route.path}
        >
          {route.sublist.map(
            (
              subitem: {
                title: string;
                options: {
                  path: string;
                  text: string;
                }[];
              },
              index: number
            ): JSX.Element => (
              <div className="navbar__sublist" key={index}>
                {subitem.title && (
                  <h3 className="navbar__sublist-title">{subitem.title}</h3>
                )}
                <ul className="navbar__sublist-options">
                  {subitem.options.map(
                    (option: { path: string; text: string }): JSX.Element => (
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
            )
          )}
        </div>
      )
    );
  });

  return (
    <header>
      <nav>
        <div className="container-fluid">
          <div className="row">
            <div className="navbar col-12">
              <div className="row">
                <div className="navbar__panel col-10">
                  <ul className="navbar__list">{routesList}</ul>
                </div>
                <div
                  className="navbar__subpanel col-12"
                  ref={subpanel}
                  onMouseLeave={handleSubpanelClose}
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
