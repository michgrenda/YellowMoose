import React, { HTMLAttributes } from "react";
// Icons
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";

// File interfaces
interface ErrorProps {
  errorMessage: string;
}

// Props and default props
type Props = ErrorProps & HTMLAttributes<HTMLParagraphElement>;

export const Error = ({ errorMessage, ...rest }: Props) => {
  return (
    <p className="error" {...rest}>
      <ErrorOutlineRoundedIcon className="error__icon" fontSize="small" />
      <span className="error__text">{errorMessage}</span>
    </p>
  );
};
