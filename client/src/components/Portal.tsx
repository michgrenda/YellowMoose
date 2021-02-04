import React, { useState, useEffect, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

// File interfaces
interface PortalProps {
  container?: HTMLElement;
  className?: string;
  element?: string;
  portal?: boolean;
}

// Props and default props
type Props = PropsWithChildren<PortalProps>;
const defaultProps = {
  portal: true,
};

export const Portal = ({
  children,
  container,
  className,
  element,
  portal,
}: Props): React.ReactElement | React.ReactPortal => {
  const [portalRoot] = useState(() => {
    const portalRoot = document.createElement(element || "div");
    portalRoot.classList.add(className || "portal-root");
    return portalRoot;
  });

  useEffect(() => {
    document.body.appendChild(portalRoot);

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, [portalRoot]);

  if (!portal) return <>{children}</>;

  return ReactDOM.createPortal(children, container || portalRoot);
};

Portal.defaultProps = defaultProps;
