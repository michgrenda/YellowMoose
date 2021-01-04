import React, { useState, useEffect } from "react";
// Components
import TextArea from "../TextArea";

// File interfaces
interface IDescriptionDataProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

interface IData {
  description: string;
}

// Props and default props
type Props = IDescriptionDataProps;

const DescriptionData: React.FC<Props> = (props) => {
  const { setData } = props;

  // States
  const [descriptionData, setDescriptionData] = useState<IData>({
    description: "",
  });

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...descriptionData }));
  }, [setData, descriptionData]);

  // Handlers
  // -------------------------------------------------------------------
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescriptionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <fieldset className="description-data">
      <header className="description-data__title">
        <h1 className="description-data__title-headline">Opis nieruchomości</h1>
      </header>
      <TextArea
        cols={30}
        rows={5}
        id="description"
        name="description"
        label="opis"
        onChange={handleTextAreaChange}
        required
        modifiers={["large"]}
        mixes={["description-data"]}
      />
    </fieldset>
  );
};

export default DescriptionData;
