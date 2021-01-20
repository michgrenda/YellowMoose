import React, { HTMLAttributes } from "react";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Label } from "../../../components/form/Label";
import { ExtendedField } from "../../../components/form/controls/ExtendedField";
import { TextArea } from "../../../components/form/controls/TextArea";
// Handlers
import { handleTextAreaChange } from "../../../utils/handlers";
// Types
import { DescriptionDataState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

// Props and default props
type Props = FieldsetProps<DescriptionDataState> &
  HTMLAttributes<HTMLDivElement>;

export const DescriptionData = React.memo(
  ({ data: descriptionData, setData: setDescriptionData, ...rest }: Props) => {
    return (
      <div className="description-data" {...rest}>
        <Fieldset title="opis nieruchomości" modifiers={["description-data"]}>
          <ExtendedField
            mixes={["fieldset"]}
            //   errors={descriptionDataErrors.descriptionIsValid}
          >
            <Label htmlFor="description" label="opis" isRequired />
            <TextArea
              cols={30}
              rows={5}
              id="description"
              name="description"
              value={descriptionData.description}
              onChange={(e) => handleTextAreaChange(e, setDescriptionData)}
              required
              modifiers={["large"]}
            />
          </ExtendedField>
        </Fieldset>
      </div>
    );
  }
);
