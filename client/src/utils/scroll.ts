export const isElementInViewPort = (element: Element) => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const scrollToElement = (querySelector: string, yOffset: number) => {
  const element = document.querySelector(querySelector);

  if (element) {
    const _yOffset = yOffset;

    const rect = element.getBoundingClientRect();
    let y = rect.top + window.pageYOffset + _yOffset;

    if (isElementInViewPort(element))
      y =
        rect.bottom +
        window.pageYOffset -
        (window.innerHeight || document.documentElement.clientHeight) -
        _yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
