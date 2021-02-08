import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMapGL, {
  ViewportProps,
  MapRef,
  NavigationControl,
  AttributionControl,
} from "react-map-gl";
// Variables
import { MAPBOX_ACCESS_TOKEN } from "../../variables";
// Types
import {
  LngLatBounds,
  CameraForBoundsOptions,
  CameraForBoundsResult,
  LngLatBoundsLike,
} from "mapbox-gl";

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
type BoundsType =
  | [[number, number], [number, number]]
  | [number, number, number, number];

// File interfaces
interface MapProps {
  viewportProps?: Omit<
    ViewportProps,
    | "transitionDuration"
    | "transitionEasing"
    | "transitionInterpolator"
    | "transitionInterruption"
  >;
  viewportTransition?: Pick<
    ViewportProps,
    | "transitionDuration"
    | "transitionEasing"
    | "transitionInterpolator"
    | "transitionInterruption"
  >;
  bounds?: BoundsType;
  mql?: string;
  controls?: React.ReactElement[];
  refresh?: {
    refresher: boolean;
    setRefresher: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

// Props and default props
type Props = MapProps;

export const Map = React.memo(
  ({
    viewportProps = {},
    viewportTransition = {},
    bounds,
    mql,
    controls,
    refresh,
  }: Props) => {
    // States
    const [viewport, setViewport] = useState<ViewportProps>({
      ...viewportProps,
    });
    const [loaded, setLoaded] = useState<boolean>(false);
    // References
    const mapRef = useRef<MapRef>(null!);

    // Methods
    // -------------------------------------------------------------------
    // Convert bounds to appropriate shape
    const convertBounds = useCallback(
      (bounds: LngLatBounds) => [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()],
      ],
      []
    );

    const calcualteBounds = useCallback(
      (map: any, bounds: BoundsType, error: number = 0.5) => {
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
      [convertBounds]
    );

    const fitBounds = useCallback(
      (
        map: any,
        bounds: LngLatBoundsLike,
        cameraForBoundsOptions: CameraForBoundsOptions = {}
      ) => {
        const _cameraForBoundsOptions: CameraForBoundsOptions = {
          padding: 20,
          ...cameraForBoundsOptions,
        };

        // Get appropriate values
        const {
          center: { lat: latitude, lng: longitude },
          zoom,
          bearing,
        }: CameraForBoundsResult = map.cameraForBounds(
          bounds,
          _cameraForBoundsOptions
        );

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
      [viewportTransition]
    );

    // Fit a map to a bounding box
    useEffect(() => {
      if (refresh) {
        const { refresher, setRefresher } = refresh;

        if (refresher) {
          const map = mapRef.current.getMap();

          if (setRefresher) setRefresher(false);
          if (bounds) if (calcualteBounds(map, bounds)) fitBounds(map, bounds);
        }
      }
    }, [refresh, bounds, fitBounds, calcualteBounds]);

    // Fit a map to a bounding box
    useEffect(() => {
      if (loaded) {
        const map = mapRef.current.getMap();

        setLoaded(false);
        if (!mql || matchMedia(mql).matches) if (bounds) fitBounds(map, bounds);
      }
    }, [loaded, bounds, fitBounds, mql]);

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
