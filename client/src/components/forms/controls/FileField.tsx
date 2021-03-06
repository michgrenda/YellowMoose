import React, { useState } from "react";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import classNames from "classnames";
// Components
import { Error } from "../Error";
// Utils
import { modifyAndMix } from "../../../utils/BEM";
// Types
import { BEM } from "../../../ts/types";

// File interfaces
interface FileFieldProps {
  setFiles: (acceptedFiles: File[], maxFiles: number | undefined) => boolean;
  label: string;
  acceptedFiles?: string;
  component?: React.ReactElement;
}

// Props and default propss
type Props = FileFieldProps & DropzoneProps & BEM;

export const FileField = ({
  setFiles,
  label,
  acceptedFiles,
  component,
  modifiers,
  mixes,
  ...rest
}: Props) => {
  // States
  const [errors, setErrors] = useState<{ errorCode: string }[]>([]);

  // Manage received modifiers and mixes
  const modifiersAndMixes = modifyAndMix(modifiers, mixes, "file-field");

  // Methods
  // -------------------------------------------------------------------
  const orderErrors = (fileRejections: FileRejection[]) => {
    const errorCodes: { errorCode: string }[] = [];

    // Get all errors
    fileRejections.forEach((fileRejection) =>
      fileRejection.errors.forEach(({ code }) =>
        errorCodes.push({ errorCode: code })
      )
    );

    // Get all unique errors
    return errorCodes.filter(
      (uniqueError, index, array) =>
        array.findIndex(
          (error) => error.errorCode === uniqueError.errorCode
        ) === index
    );
  };

  // Handlers
  // -------------------------------------------------------------------
  const handleDropzoneDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles, rest.maxFiles);
  };

  const handleDropzoneDropRejected = (fileRejections: FileRejection[]) => {
    const orderedErrors = orderErrors(fileRejections);
    setErrors(orderedErrors);
  };

  // Variables
  const translatedErrors = errors.map(({ errorCode }) => {
    switch (errorCode) {
      case "too-many-files":
        return `za dużo plików (maksymalnie ${rest.maxFiles})`;
      case "file-invalid-type":
        return "nieprawidłowy typ pliku";
      case "file-too-large":
        return "za duży plik";
      case "file-too-small":
        return "za mały plik";
      default:
        return "nieokreślony błąd";
    }
  });

  const errorsList = translatedErrors.map((error) => (
    <Error errorMessage={error} key={error} />
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
          <div className="file-field-wrapper">
            <div
              {...getRootProps({
                className: classNames(
                  "file-field",
                  rest.disabled && "file-field--is-disabled",
                  isDragActive && "file-field--is-drag-active",
                  isDragAccept && "file-field--is-drag-accept",
                  isDragReject && "file-field--is-drag-reject",
                  modifiersAndMixes
                ),
              })}
            >
              {component}
              <input {...getInputProps()} />
              <p className="file-field__label">{label}</p>
              {acceptedFiles && (
                <em className="file-field__accepted-files">{acceptedFiles}</em>
              )}
            </div>
            <div className="file-field__errors-container">{errorsList}</div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
