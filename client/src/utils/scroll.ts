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

    const y =
      element.getBoundingClientRect().top + window.pageYOffset + _yOffset;

    if (isElementInViewPort(element))
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }
};
