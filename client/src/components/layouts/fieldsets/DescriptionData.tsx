import React, { HTMLAttributes } from "react";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { Label } from "../../../components/forms/Label";
import { ExtendedField } from "../../../components/forms/controls/ExtendedField";
import { TextArea } from "../../../components/forms/controls/TextArea";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

// Props and default props
type Props = HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const DescriptionData = React.memo(
  ({ register, control, errors, watch, ...rest }: Props) => {
    return (
      <div className="description-data" {...rest}>
        <Fieldset title="opis nieruchomości" modifiers={["description-data"]}>
          <ExtendedField
            mixes={["fieldset"]}
            errorMessages={[errors.description?.message]}
          >
            <Label htmlFor="description" label="opis" isRequired />
            <TextArea
              cols={30}
              rows={5}
              id="description"
              name="description"
              register={register}
              required
              modifiers={["large"]}
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
