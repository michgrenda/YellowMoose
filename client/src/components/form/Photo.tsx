import React from "react";
// Components
import FileInput from "../FileInput";
// Icons
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// File interfaces
interface IPhotoProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

// Props and default props
type Props = IPhotoProps;

const Photo: React.FC<Props> = (props) => {
  return (
    <fieldset className="photo">
      <header className="photo__title">
        <h1 className="photo__title-headline">Zdjęcia</h1>
        <p className="photo__title-subline">
          Oferty ze zdjęciami otrzymują średnio 4x więcej zapytań!
        </p>
        <p className="photo__title-subline">
          Dodaj zdjęcia swojej nieruchomości.
        </p>
      </header>
      <FileInput
        setData={props.setData}
        label="dodaj zdjęcie"
        acceptedFiles="(*.jpeg, *.jpg, *.png)"
        mixes={["photo"]}
        component={
          <AddPhotoAlternateIcon
            className="photo__file-input-icon"
            style={{ fontSize: "56px" }}
          />
        }
        maxFiles={3}
        maxSize={1024 * 1024 * 5}
        multiple={true}
        accept="image/jpeg, image/jpg, image/png"
        thumbs
      />
    </fieldset>
  );
};

export default Photo;
