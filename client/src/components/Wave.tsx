import React from "react";
import useWave, { IWaveOptions } from "use-wave";

// File interfaces
interface WaveProps {
  component: React.ReactElement;
  waveOptions?: Partial<IWaveOptions>;
}

// Props and default props
type Props = WaveProps;
const defaultProps = {
  waveOptions: {},
};

export const Wave = ({ component, waveOptions }: Props) => {
  const wave = useWave({ ...waveOptions });

  return React.cloneElement(component, {
    ref: wave,
  });
};

Wave.defaultProps = defaultProps;
