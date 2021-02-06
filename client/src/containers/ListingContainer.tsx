import React, { useMemo, useRef, useState, useCallback } from "react";
// Components
import { Listing } from "../components/listing/Listing";
import { Map } from "../components/map/Map";
import { Wave } from "../components/Wave";
import { Button } from "../components/forms/controls/Button";
// Icons
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";

export const ListingContainer = () => {
  // References
  const listingContainerRef = useRef<HTMLDivElement>(null!);
  const [refresher, setRefersher] = useState<boolean>(false);

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
            title="Listing"
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
                refresher={refresher}
                setRefresher={setRefersher}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
