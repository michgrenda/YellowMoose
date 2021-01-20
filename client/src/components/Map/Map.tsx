import React, { useState, useEffect, useRef, useCallback, memo } from "react";

const GOOGLE_MAP_API_KEY = "AIzaSyDqWZag8X6J1rA1YaVC4bcOrfqPZrk27zc";

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
  // States
  const [googleMap, setGoogleMap] = useState<{
    map: google.maps.Map;
    marker?: google.maps.Marker;
  }>(null!);
  // References
  const googleMapRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!window.google) {
      const googleMapScript = document.createElement("script");
      // Set attributes
      googleMapScript.defer = true;
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places&region=${props.region}&language=${props.language}`;
      document.head.appendChild(googleMapScript);

      googleMapScript.addEventListener("load", handleScriptLoad);

      return () =>
        googleMapScript.removeEventListener("load", handleScriptLoad);
    } else handleScriptLoad();
  }, []);

  const handleScriptLoad = useCallback(() => {
    const map = createGoogleMap();
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: props.country }, (results, status) => {
      if (status !== "OK") {
        console.error("Geocoder failed due to: " + status);
        return;
      }

      map.setZoom(6);
      map.setCenter(results[0].geometry.location);
    });

    // TEMPORARY
    // const marker = createMarker(map);

    setGoogleMap((prevState) => ({ ...prevState, map }));
  }, []);

  useEffect(() => {
    if (googleMap) {
      const map = googleMap.map;
      if (map) createMarker(map);
    }
  }, [googleMap]);

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      disableDefaultUI: true,
    });

  const createMarker = (map: google.maps.Map) =>
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: map,
    });

  return (
    <section className="map-wrapper">
      <div className="map" ref={googleMapRef}></div>
    </section>
  );
};

Map.defaultProps = defaultProps;

export default memo(Map);
