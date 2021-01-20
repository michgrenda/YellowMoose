import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
// Utils
import { modifyAndMix } from "../../utils/BEM";
// Types
import { BEM } from "../../types";
import { SvgIcon, SvgIconProps } from "@material-ui/core";

// File types
type SVGIconType = typeof SvgIcon;

// File interfaces
interface ThumbProp {
  src: string;
  alt: string;
  buttons?: {
    attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
    identifier: number;
    icon: {
      component: SVGIconType;
      props?: SvgIconProps;
    };
  }[];
}

// Props and default props
type Props = ThumbProp & HTMLAttributes<HTMLDivElement> & BEM;

export const Thumb = React.forwardRef<HTMLImageElement | null, Props>(
  ({ src, alt, buttons, modifiers, mixes, ...rest }, ref) => {
    // Manage received modifiers and mixes
    const modifiersAndMixes = modifyAndMix(modifiers, mixes, "thumb");

    // Variables
    const buttonsList =
      buttons &&
      buttons.map((button) => {
        const {
          attributes,
          identifier,
          icon: { component: Icon, props: iconProps },
        } = button;

        return (
          <button
            type="button"
            className="thumb__button"
            data-identifier={identifier}
            {...attributes}
          >
            <Icon className="thumb__icon" fontSize="small" {...iconProps} />
          </button>
        );
      });

    return (
      <div className={`thumb ${modifiersAndMixes}`} {...rest}>
        <div className="thumb__buttons-container">{buttonsList}</div>
        <div className="thumb__image-wrapper">
          <img src={src} alt={alt} className="thumb__image" ref={ref} />
        </div>
      </div>
    );
  }
);
