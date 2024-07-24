export default function calculateOpacityByProgress({
  countOfElements,
  progress,
  currentElementIdx,
}: {
  countOfElements: number;
  currentElementIdx: number;
  progress: number;
}) {
  const percentPerElement = 100 / countOfElements;
  const countOfVisibleElements = progress / percentPerElement;

  if (currentElementIdx === Math.floor(countOfVisibleElements)) {
    return +`0.${`${countOfVisibleElements}`.slice(2)}`;
  }
  if (currentElementIdx < countOfVisibleElements) {
    return 1;
  }
  return 0;
}
