import classNames from "classnames";

export const modifyAndMix = (
  modifiers: string[] | undefined,
  mixes: string[] | undefined,
  block: string
) => {
  if (!mixes && !modifiers) return "";

  const _modifiers: any = {};
  const _mixes: any = {};

  if (modifiers)
    modifiers.forEach((mod) => (_modifiers[`${block}--${mod}`] = mod));
  if (mixes) mixes.forEach((mix) => (_mixes[`${mix}__${block}`] = mix));

  const modifiersAndMixes = classNames({
    ..._modifiers,
    ..._mixes,
  });

  return modifiersAndMixes;
};
