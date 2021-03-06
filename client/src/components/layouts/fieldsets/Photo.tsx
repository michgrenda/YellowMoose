import React, { HTMLAttributes } from "react";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { FileField } from "../../../components/forms/controls/FileField";
import { Thumb } from "../../forms/Thumb";
// Icons
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import RotateRightRoundedIcon from "@material-ui/icons/RotateRightRounded";
// Types
import { PhotoState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../ts/types";

// Props and default props
type Props = FieldsetProps<PhotoState> & HTMLAttributes<HTMLDivElement>;

export const Photo = React.memo(
  ({ data: photo, setData: setPhoto, ...rest }: Props) => {
    // References
    const numberOfReferences = photo.files.length;
    const imagesRef = Array(numberOfReferences)
      .fill(null)
      .map(() => React.createRef<HTMLImageElement | null>());

    // Methods
    // -------------------------------------------------------------------
    const clearImage = (el: HTMLElement) => {
      const clearIdentifier =
        el.dataset.identifier || el.getAttribute("data-identifier");

      if (clearIdentifier) {
        const identifier = parseInt(clearIdentifier, 10);

        setPhoto((prevState) => ({
          ...prevState,
          files: prevState.files.filter((_, index) => index !== identifier),
        }));
      }
    };

    const rotateImage = (el: HTMLElement) => {
      const imageIdentifier =
        el.dataset.identifier || el.getAttribute("data-identifier");
      if (imageIdentifier) {
        const identifier = parseInt(imageIdentifier, 10);

        const image = imagesRef[identifier].current;

        if (image) {
          const file = photo.files[identifier];

          if (file) {
            const rotationDegrees = 90;
            file.rotation += rotationDegrees;
            const { rotation } = file;

            image.style.transform = `rotateZ(${rotation}deg)`;

            if (rotation === 360) file.rotation = 0;
          }
        }
      }
    };

    // Handlers
    // -------------------------------------------------------------------
    const handleDropzoneDrop = (
      acceptedFiles: File[],
      maxFiles: number | undefined
    ) => {
      let isMaxFilesExceeded = false;

      setPhoto((prevState) => {
        const filesWithPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            rotation: 0,
          })
        );
        const nextState = [...prevState.files, ...filesWithPreview];

        // Return the previous state if the number of files is exceeded
        if (maxFiles) {
          isMaxFilesExceeded = nextState.length > maxFiles;

          if (isMaxFilesExceeded) return prevState;
        }

        return { ...prevState, files: nextState };
      });

      return isMaxFilesExceeded;
    };

    // Variables
    const thumbs = photo.files.map(({ preview, name }, index) => (
      <Thumb
        src={preview}
        alt={name}
        ref={imagesRef[index]}
        buttons={[
          {
            attributes: {
              onClick: (e) => clearImage(e.currentTarget),
            },
            identifier: index,
            icon: {
              component: CloseRoundedIcon,
            },
          },
          {
            attributes: {
              onClick: (e) => rotateImage(e.currentTarget),
            },
            identifier: index,
            icon: {
              component: RotateRightRoundedIcon,
            },
          },
        ]}
      />
    ));

    return (
      <div className="photo" {...rest}>
        <Fieldset
          title="zdjęcia"
          information={[
            "Oferty ze zdjęciami otrzymują średnio 4x więcej zapytań!",
            "Dodaj zdjęcia swojej nieruchomości.",
          ]}
          modifiers={["photo"]}
        >
          <FileField
            setFiles={handleDropzoneDrop}
            label="dodaj zdjęcie"
            acceptedFiles="(*.jpeg, *.jpg, *.png)"
            mixes={["fieldset"]}
            component={
              <AddPhotoAlternateOutlinedIcon
                className="photo__file-input-icon"
                style={{ fontSize: "54px" }}
              />
            }
            maxFiles={15}
            maxSize={1024 * 1024 * 5}
            multiple={true}
            accept="image/jpeg, image/jpg, image/png"
          />
          <div className="photo__thumbs-container">{thumbs}</div>
        </Fieldset>
      </div>
    );
  }
);
