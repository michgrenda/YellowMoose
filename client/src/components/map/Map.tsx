import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMapGL, {
  ViewportProps,
  MapRef,
  NavigationControl,
  AttributionControl,
  FlyToInterpolator,
} from "react-map-gl";
// Variables
import { MAPBOX_ACCESS_TOKEN, gridBreakpoints } from "../../variables";
// Types
import { LngLatBounds, CameraForBoundsOptions } from "mapbox-gl";

// Styles
const navigationControlStyle = {
  right: 10,
  top: 10,
};

const attributionControlStyle = {
  right: 0,
  bottom: 0,
};

// File types
type FitBoundsType = Pick<
  ViewportProps,
  | "transitionDuration"
  | "transitionEasing"
  | "transitionInterpolator"
  | "transitionInterruption"
>;

// File interfaces
interface MapProps {
  center?: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  bounds?:
    | [[number, number], [number, number]]
    | [number, number, number, number];
  controls?: React.ReactElement[];
  refresher?: boolean;
  setRefresher?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Props and default props
type Props = MapProps;

export const Map = React.memo(
  ({
    center: { latitude, longitude } = {
      latitude: 52.1246099075455,
      longitude: 19.30063630556,
    },
    zoom = 5,
    bounds = [
      [14.1229290098701, 49.0020460154192],
      [24.1455979034865, 54.8932281999438],
    ],
    controls,
    refresher,
    setRefresher,
  }: Props) => {
    // States
    const [viewport, setViewport] = useState<ViewportProps>({
      latitude,
      longitude,
      zoom,
    });

    const [loaded, setLoaded] = useState<boolean>(false);
    // References
    const mapRef = useRef<MapRef>(null!);

    // Convert bounds to appropriate shape
    const convertBounds = useCallback(
      (bounds: LngLatBounds) => [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()],
      ],
      []
    );

    const calcualteBounds = useCallback(
      (error: number = 0.5) => {
        const map = mapRef.current.getMap();
        // Get current and initial bounds and then flat
        // west, south, east, north
        const currentBounds = convertBounds(map.getBounds()).flat();
        const initialBounds = bounds.flat();

        // Check if difference is siginificant
        return !(
          (Math.abs(currentBounds[0] - initialBounds[0]) < error &&
            Math.abs(currentBounds[2] - initialBounds[2]) < error) ||
          (Math.abs(currentBounds[1] - initialBounds[1]) < error &&
            Math.abs(currentBounds[3] - initialBounds[3]) < error)
        );
      },
      [bounds, convertBounds]
    );

    const fitBounds = useCallback(
      (
        cameraForBoundsOption: CameraForBoundsOptions = {},
        viewportTransition: FitBoundsType = {
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
        }
      ) => {
        const map = mapRef.current.getMap();

        // Get appropriate values
        const {
          center: { lat: latitude, lng: longitude },
          zoom,
          bearing,
        } = map.cameraForBounds(bounds, cameraForBoundsOption);

        // Update viewport state
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
          zoom,
          bearing,
          ...viewportTransition,
        }));
      },
      [bounds]
    );

    // Fit a map to a bounding box
    useEffect(() => {
      if (refresher) {
        if (setRefresher) setRefresher(false);
        if (calcualteBounds()) fitBounds();
      }
    }, [refresher, setRefresher, fitBounds, calcualteBounds]);

    // Fit a map to a bounding box
    useEffect(() => {
      if (loaded) {
        setLoaded(false);
        if (matchMedia(`(min-width: ${gridBreakpoints["lg"]}px)`).matches)
          fitBounds();
      }
    }, [loaded, setLoaded, fitBounds]);

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
        onLoad={() => setLoaded(true)}
        attributionControl={false}
        className="map"
        ref={mapRef}
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
        {controls}
      </ReactMapGL>
    );
  }
);
