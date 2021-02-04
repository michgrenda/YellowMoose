import React, { useState, memo } from "react";
import ReactMapGL, {
  ViewportProps,
  NavigationControl,
  AttributionControl,
} from "react-map-gl";

import { MAPBOX_ACCESS_TOKEN } from "../../variables";

// Styles
const navigationControlStyle = {
  right: 10,
  top: 10,
};

const attributionControlStyle = {
  right: 0,
  bottom: 0,
};

// File interfaces
interface MapProps {
  region?: string;
  language?: string;
  country?: string;
}

// Props and default props
type Props = MapProps;

const defaultProps = {
  region: "PL",
  language: "pl",
  country: "Poland",
};

const Map = (props: Props) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 52.1246099075455,
    longitude: 19.30063630556,
    zoom: 5.2,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport: ViewportProps) =>
        setViewport(nextViewport)
      }
      attributionControl={false}
      className="map"
    >
      <NavigationControl
        showCompass={false}
        style={navigationControlStyle}
        className="map__navigation-control"
      />
      <AttributionControl
        compact={false}
        style={attributionControlStyle}
        className="map__attribution-control"
      />
    </ReactMapGL>
  );
};

Map.defaultProps = defaultProps;

export default memo(Map);
