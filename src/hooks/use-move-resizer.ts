import { MouseEventHandler, RefObject, useRef, useState } from "react";

export type UseMoveHookProps = {
  parentRef: RefObject<HTMLElement>;
  initialPosition: {
    x: number;
    y: number;
  };
  initialSize: {
    width: number;
    height: number;
  };
  minSize: number;
};

export const useMoveResizer = (props: UseMoveHookProps) => {
  const [dimensions, setDimensions] = useState({
    width: props.initialSize.width,
    height: props.initialSize.height,
  });
  const [position, setPosition] = useState({
    x: props.initialPosition.x,
    y: props.initialPosition.y,
  });

  const isResizing = useRef(false);
  const isMoving = useRef(false);

  const resizeStart = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0 });
  const moveStart = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });

  const handleResizeMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!props.parentRef.current) return;

    isResizing.current = true;
    const parentRect = props.parentRef.current.getBoundingClientRect();
    resizeStart.current = {
      mouseX: e.clientX - parentRect.left,
      mouseY: e.clientY - parentRect.top,
      width: dimensions.width,
      height: dimensions.height,
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !props.parentRef.current) return;

    const parentRect = props.parentRef.current.getBoundingClientRect();
    const currentMouseX = e.clientX - parentRect.left;
    const currentMouseY = e.clientY - parentRect.top;

    const deltaX = currentMouseX - resizeStart.current.mouseX;
    const deltaY = currentMouseY - resizeStart.current.mouseY;

    let newWidth = resizeStart.current.width + deltaX;
    let newHeight = resizeStart.current.height + deltaY;

    newWidth = Math.max(props.minSize, newWidth);
    newHeight = Math.max(props.minSize, newHeight);

    newWidth = Math.min(
      newWidth,
      props.parentRef.current.clientWidth - position.x
    );
    newHeight = Math.min(
      newHeight,
      props.parentRef.current.clientHeight - position.y
    );

    setDimensions({ width: newWidth, height: newHeight });
  };

  const handleResizeMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResizeMouseMove);
    document.removeEventListener("mouseup", handleResizeMouseUp);
  };

  const handleMoveMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!props.parentRef.current) return;

    isMoving.current = true;
    const parentRect = props.parentRef.current.getBoundingClientRect();
    moveStart.current = {
      mouseX: e.clientX - parentRect.left,
      mouseY: e.clientY - parentRect.top,
      posX: position.x,
      posY: position.y,
    };
    document.addEventListener("mousemove", handleMoveMouseMove);
    document.addEventListener("mouseup", handleMoveMouseUp);
  };

  const handleMoveMouseMove = (e: MouseEvent) => {
    if (!isMoving.current || !props.parentRef.current) return;

    const parentRect = props.parentRef.current.getBoundingClientRect();
    const currentMouseX = e.clientX - parentRect.left;
    const currentMouseY = e.clientY - parentRect.top;

    const deltaX = currentMouseX - moveStart.current.mouseX;
    const deltaY = currentMouseY - moveStart.current.mouseY;

    let newX = moveStart.current.posX + deltaX;
    let newY = moveStart.current.posY + deltaY;

    newX = Math.max(
      0,
      Math.min(newX, props.parentRef.current.clientWidth - dimensions.width)
    );
    newY = Math.max(
      0,
      Math.min(newY, props.parentRef.current.clientHeight - dimensions.height)
    );

    setPosition({ x: newX, y: newY });
  };

  const handleMoveMouseUp = () => {
    isMoving.current = false;
    document.removeEventListener("mousemove", handleMoveMouseMove);
    document.removeEventListener("mouseup", handleMoveMouseUp);
  };

  return { position, dimensions, handleMoveMouseDown, handleResizeMouseDown };
};
