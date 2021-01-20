import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// File interfaces
interface PortalProps {
  children: any;
  className: string;
  el: string;
  portal?: boolean;
}

// Props and default props
type Props = PortalProps;
const defaultProps = {
  className: "portal-root",
  el: "div",
  portal: true,
};

export const Portal = ({ children, className, el, portal }: Props) => {
  const [portalRoot] = useState(() => {
    const portalRoot = document.createElement(el);
    portalRoot.classList.add(className);
    return portalRoot;
  });

  useEffect(() => {
    document.body.appendChild(portalRoot);

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, [portalRoot]);

  if (!portal) return children;

  return ReactDOM.createPortal(children, portalRoot);
};

Portal.defaultProps = defaultProps;
