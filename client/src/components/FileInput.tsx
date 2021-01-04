import React, { useState, useEffect, useRef } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
// Utils
import { modifyAndMix } from "../utils/BEM";
// Icons
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import RotateRightRoundedIcon from "@material-ui/icons/RotateRightRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
// Types
import { FileType } from "../types";
import { BEMType } from "../types";

// File interfaces
interface IFileInputProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
  label: string;
  acceptedFiles?: string;
  component?: React.ReactNode;
  thumbs?: boolean;
}

// Props and default props
type Props = IFileInputProps & DropzoneProps & BEMType;

const FileInput: React.FC<Props> = ({
  setData,
  label,
  acceptedFiles,
  component,
  thumbs: propsThumbs,
  modifiers: propsModifiers,
  mixes: propsMixes,
  ...rest
}) => {
  // States
  const [files, setFiles] = useState<FileType[]>([]);
  const [errors, setErrors] = useState<{ errorCode: string }[]>([]);
  // References
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, files }));
  }, [setData, files]);

  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(
    propsModifiers,
    propsMixes,
    "file-input"
  );

  // Methods
  // -------------------------------------------------------------------
  const clearFile = (el: HTMLElement) => {
    const clearIndicator = el.dataset.clear || el.getAttribute("data-clear");

    if (clearIndicator) {
      const index = parseInt(clearIndicator, 10);

      const copyOfFiles = [...files];
      copyOfFiles.splice(index, 1);

      setFiles(copyOfFiles);
    }
  };

  const rotateFile = (el: HTMLElement) => {
    const imageIndicator = el.dataset.image || el.getAttribute("data-image");
    if (imageIndicator) {
      const index = parseInt(imageIndicator, 10);

      const image = imagesRef.current[index];

      if (image) {
        const file = files[index];

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
  // Clear or rotate file
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const element = e.currentTarget;
    if (element) {
      const identifier =
        element.dataset.identifier || element.getAttribute("data-identifier");

      switch (identifier) {
        case "clear":
          clearFile(element);
          break;
        case "rotate":
          rotateFile(element);
          break;
        default:
          break;
      }
    }
  };

  const handleDropzoneDrop = (acceptedFiles: File[]) => {
    setFiles((prevState) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          rotation: 0,
        })
      );
      const nextState = [...prevState, ...filesWithPreview];

      if (rest.maxFiles) {
        const maxFilesExceeded = nextState.length > rest.maxFiles;
        if (maxFilesExceeded) {
          setErrors([{ errorCode: "too-many-files" }]);
          return prevState;
        }
      }
      setErrors([]);
      return nextState;
    });
  };

  const handleDropzoneDropRejected = (fileRejections: FileRejection[]) => {
    const errorCodes: { errorCode: string }[] = [];
    fileRejections.forEach((fileRejection) =>
      fileRejection.errors.forEach((e) =>
        errorCodes.push({ errorCode: e.code })
      )
    );

    const uniqueErrorCodes = errorCodes.filter(
      (v, i, a) => a.findIndex((t) => t.errorCode === v.errorCode) === i
    );
    setErrors(uniqueErrorCodes);
  };

  // Variables
  const translatedErrors = errors.map((error) => {
    switch (error.errorCode) {
      case "too-many-files":
        return `zbyt dużo plików (maksymalnie ${rest.maxFiles})`;
      case "file-invalid-type":
        return "nieważny typ pliku";
      case "file-too-large":
        return "za duży plik";
      default:
        return "";
    }
  });

  const thumbs = files.map(({ preview, name }, index) => (
    <div className="file-input__thumb" key={preview}>
      <div className="file-input__thumb-buttons">
        <button
          type="button"
          className="file-input__thumb-button"
          data-clear={index}
          data-identifier="clear"
          onClick={handleButtonClick}
        >
          <CloseRoundedIcon
            className="file-input__thumb-icon"
            fontSize="small"
          />
        </button>
        <button
          type="button"
          className="file-input__thumb-button"
          data-image={index}
          data-identifier="rotate"
          onClick={handleButtonClick}
        >
          <RotateRightRoundedIcon
            className="file-input__thumb-icon"
            fontSize="small"
          />
        </button>
      </div>
      <div className="file-input__thumb-inner">
        <img
          src={preview}
          alt={name}
          className="file-input__image"
          ref={(el) => (imagesRef.current[index] = el)}
        />
      </div>
    </div>
  ));

  return (
    <Dropzone
      onDrop={handleDropzoneDrop}
      onDropRejected={handleDropzoneDropRejected}
      {...rest}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      }) => (
        <section>
          <div className="file-input-wrapper" data-helper="helper">
            <div
              {...getRootProps({
                className: `file-input ${
                  rest.disabled && "file-input--is-disabled"
                } ${isDragActive && "file-input--is-drag-active"} ${
                  isDragAccept && "file-input--is-drag-accept"
                } ${
                  isDragReject && "file-input--is-drag-reject"
                } ${modifiersAndMixes}`,
              })}
            >
              {component}
              <input {...getInputProps()} />
              <p className="file-input__label">{label}</p>
              {acceptedFiles && (
                <em className="file-input__accepted-files">{acceptedFiles}</em>
              )}
            </div>
            <div className="file-input__errors">
              {translatedErrors.map((error) => (
                <p className="file-input__error">
                  <ErrorOutlineRoundedIcon
                    className="file-input__icon file-input__icon--error"
                    fontSize="small"
                  />
                  <span className="file-input__error-text">{error}</span>
                </p>
              ))}
            </div>
          </div>
          {propsThumbs && Boolean(thumbs.length) && (
            <aside className="file-input__thumbs-wrapper">{thumbs}</aside>
          )}
        </section>
      )}
    </Dropzone>
  );
};

export default FileInput;
