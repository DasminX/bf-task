import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../atoms/Icon";
// import useDebounce from "../../hooks/use-debounce";

export type ImgProps = {
  parentRef: RefObject<HTMLElement>;
};

type FieldSize = {
  x: number;
  y: number;
};

/* const calculateFieldSize = (
  e: MouseEvent,
  imgRef: RefObject<HTMLElement>,
  parentRef: RefObject<HTMLElement>
) => {
  console.log(e);
  const parentDimensions = {
    leftEdge: parentRef.current!.offsetLeft,
    rightEdge: parentRef.current!.offsetLeft + parentRef.current!.clientWidth,
    topEdge: parentRef.current!.offsetTop,
    bottomEdge: parentRef.current!.offsetTop + parentRef.current!.clientWidth,
  };

  const imgDimensions = {
    leftEdge: imgRef.current!.offsetLeft,
    rightEdge: imgRef.current!.offsetLeft + imgRef.current!.clientWidth,
    topEdge: imgRef.current!.offsetTop,
    bottomEdge: imgRef.current!.offsetTop + imgRef.current!.clientWidth,
  };

  const dims = {
    x: Math.min(
      imgDimensions.rightEdge,
      Math.max(parentDimensions.leftEdge + 100, e.pageX)
    ),
    y: Math.min(
      imgDimensions.bottomEdge,
      Math.max(parentDimensions.topEdge + 100, e.pageY)
    ),
  };

  return dims;
}; */

const calculateFieldSize = (
  e: MouseEvent,
  imgRef: RefObject<HTMLElement>,
  parentRef: RefObject<HTMLElement>
) => {
  const parentRect = parentRef.current!.getBoundingClientRect();
  const imgRect = imgRef.current!.getBoundingClientRect();

  // Mouse position relative to parent
  const mouseX = e.clientX - parentRect.left;
  const mouseY = e.clientY - parentRect.top;

  // prettier-ignore
  const dims = {
    x: Math.max(100, Math.min(imgRect.width, parentRect.width, mouseX)), // Keep within bounds
    y: Math.max(100, Math.min(imgRect.height, parentRect.height, mouseY)),
  };
  console.log(dims);

  return dims;
};

export const Img: FC<ImgProps> = ({ parentRef }) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fieldSize, setFieldSize] = useState<FieldSize>({ x: 200, y: 200 });

  //   const debouncedFieldSize = useDebounce<FieldSize>(fieldSize, 50);

  const mouseMoveListener = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      setFieldSize(calculateFieldSize(e, imgRef, parentRef));
    },
    [isDragging, parentRef, imgRef]
  );

  function onMouseDown(e: MouseEvent) {
    if (e.target != resizerRef.current) return;
    setIsDragging(true);
  }
  function onMouseUp() {
    setIsDragging(false);
  }

  useEffect(() => {
    const parentElement = parentRef.current;

    parentElement?.addEventListener("mousedown", onMouseDown);
    parentElement?.addEventListener("mouseup", onMouseUp);
    parentElement?.addEventListener("mousemove", mouseMoveListener, {
      passive: true,
    });

    return () => {
      parentElement?.removeEventListener("mousedown", onMouseDown);
      parentElement?.removeEventListener("mouseup", onMouseUp);
      parentElement?.removeEventListener("mousemove", mouseMoveListener);
    };
  }, [isDragging, mouseMoveListener, parentRef]);

  console.log(fieldSize);
  return (
    <div
      ref={imgRef}
      className={`relative w-[${fieldSize.x}px] h-[${fieldSize.y}px] py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center`}
    >
      <div className="absolute top-0 left-0 translate-[-50%] flex justify-center items-center w-10 h-10 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-8 h-8" iconSource="move.svg" />
      </div>
      <div className="absolute top-0 left-full translate-[-50%] flex justify-center items-center w-6 h-6 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-4.5 h-4.5" iconSource="delete.svg" />
      </div>
      <img src="" />
      <div
        ref={resizerRef}
        className="absolute top-full left-full translate-[-50%] w-5 h-5 bg-[var(--primary)] cursor-pointer rounded-full border-4 border-[var(--white)] select-none"
      ></div>
    </div>
  );
};
