import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Props
type Props = {
  children: any;
  className: string;
  el: string;
  container?: { [index: string]: any };
  portal?: boolean;
};

const defaultProps = {
  className: "portal-root",
  el: "div",
  container: {},
  portal: true,
};

const Portal = ({ children, className, el, container, portal }: Props) => {
  const [portalRoot] = useState(() => {
    const portalRoot = document.createElement(el);
    portalRoot.classList.add(className);
    return portalRoot;
  });

  useEffect(() => {
    if (!container?.current) {
      document.body.appendChild(portalRoot);

      return () => {
        document.body.removeChild(portalRoot);
      };
    }
  }, [portalRoot, container]);

  if (!portal) return children;

  if (container?.current)
    return ReactDOM.createPortal(children, container?.current);
  else return ReactDOM.createPortal(children, portalRoot);
};

Portal.defaultProps = defaultProps;

export default Portal;
