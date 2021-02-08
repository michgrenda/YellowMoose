import React, { useMemo, useRef, useState, useCallback } from "react";
// Components
import { Listing } from "../components/listing/Listing";
import { Map } from "../components/map/Map";
import { Wave } from "../components/Wave";
import { Button } from "../components/forms/controls/Button";
// Icons
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import { FlyToInterpolator } from "react-map-gl";
// Variables
import { gridBreakpoints } from "../variables";

export const ListingContainer = () => {
  // States
  const [refresher, setRefersher] = useState<boolean>(false);
  // References
  const listingContainerRef = useRef<HTMLDivElement>(null!);

  // Methods
  // -------------------------------------------------------------------
  const toggleMap = useCallback(() => {
    const listingContainer = listingContainerRef.current;
    const isToggled = "listing-container--is-toggled";

    if (listingContainer.classList.contains(isToggled))
      listingContainer.classList.remove(isToggled);
    else {
      listingContainer.classList.add(isToggled);
      setRefersher(true);
    }
  }, []);

  // Handlers
  // -------------------------------------------------------------------
  const handleButtonClick = useCallback(() => toggleMap(), [toggleMap]);

  // Variables
  const ListingToggleMapButton = useMemo(
    () => (
      <Wave
        component={
          <Button
            onClick={handleButtonClick}
            icon={<MapOutlinedIcon />}
            title="Map"
            modifiers={["menu-primary", "border-radius-50", "medium-500"]}
            mixes={["listing"]}
          />
        }
        key="map"
      />
    ),
    [handleButtonClick]
  );

  const MapToggleMapButton = useMemo(
    () => (
      <div
        className="mapboxgl-ctrl mapboxgl-ctrl-group"
        style={{ position: "absolute", top: "10px", left: "10px" }}
        key="listing"
      >
        <div className="d-block d-lg-none">
          <Button
            onClick={handleButtonClick}
            title="Go Back"
            modifiers={["map", "toggle-map"]}
          />
        </div>
      </div>
    ),
    [handleButtonClick]
  );

  return (
    <div className="listing-container" ref={listingContainerRef}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-7 col-xl-6">
            <section className="listing-box">
              <Listing buttons={[ListingToggleMapButton]} />
            </section>
          </div>
          <div className="col-12 col-lg-5 col-xl-6">
            <section className="map-box">
              <Map
                controls={[MapToggleMapButton]}
                refresh={{
                  refresher: refresher,
                  setRefresher: setRefersher,
                }}
                viewportProps={{
                  // Poland's center
                  latitude: 52.1246099075455,
                  longitude: 19.30063630556,
                  zoom: 4.5,
                }}
                // Poland's bounds
                bounds={[
                  [14.1229290098701, 49.0020460154192],
                  [24.1455979034865, 54.8932281999438],
                ]}
                mql={`(min-width: ${gridBreakpoints["lg"]}px)`}
                viewportTransition={{
                  transitionDuration: ("auto" as unknown) as number,
                  transitionEasing: (x: number) =>
                    x === 0
                      ? 0
                      : x === 1
                      ? 1
                      : x < 0.5
                      ? Math.pow(2, 20 * x - 10) / 2
                      : (2 - Math.pow(2, -20 * x + 10)) / 2,
                  transitionInterpolator: new FlyToInterpolator(),
                }}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
