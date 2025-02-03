import { MouseEventHandler, RefObject, useCallback, useMemo, useRef, useState } from "react";

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

type MousePositionCoords = {
  mouseX: number;
  mouseY: number;
};

export const useMoveResizer = (props: UseMoveHookProps) => {
  const [dimensions, setDimensions] = useState<UseMoveHookProps["initialSize"]>({
    width: props.initialSize.width,
    height: props.initialSize.height,
  });
  const [position, setPosition] = useState<UseMoveHookProps["initialPosition"]>({
    x: props.initialPosition.x,
    y: props.initialPosition.y,
  });

  const isResizing = useRef<boolean>(false);
  const isMoving = useRef<boolean>(false);

  const resizeStart = useRef<MousePositionCoords & UseMoveHookProps["initialSize"]>({
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0,
  });
  const moveStart = useRef<MousePositionCoords & UseMoveHookProps["initialPosition"]>({
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
  });

  const handleResizeMouseMove = useCallback(
    (e: MouseEvent) => {
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

      newWidth = Math.min(newWidth, props.parentRef.current.clientWidth - position.x);
      newHeight = Math.min(newHeight, props.parentRef.current.clientHeight - position.y);

      setDimensions({ width: newWidth, height: newHeight });
    },
    [props, position],
  );

  const handleResizeMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResizeMouseMove);
    document.removeEventListener("mouseup", handleResizeMouseUp);
  }, [handleResizeMouseMove]);

  const handleResizeMouseDown = useCallback<MouseEventHandler>(
    (e) => {
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
    },
    [props, dimensions.width, dimensions.height, handleResizeMouseMove, handleResizeMouseUp],
  );

  const handleMoveMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMoving.current || !props.parentRef.current) return;

      const parentRect = props.parentRef.current.getBoundingClientRect();
      const currentMouseX = e.clientX - parentRect.left;
      const currentMouseY = e.clientY - parentRect.top;

      const deltaX = currentMouseX - moveStart.current.mouseX;
      const deltaY = currentMouseY - moveStart.current.mouseY;

      let newX = moveStart.current.x + deltaX;
      let newY = moveStart.current.y + deltaY;

      newX = Math.max(0, Math.min(newX, props.parentRef.current.clientWidth - dimensions.width));
      newY = Math.max(0, Math.min(newY, props.parentRef.current.clientHeight - dimensions.height));

      setPosition({ x: newX, y: newY });
    },
    [props, dimensions.width, dimensions.height],
  );

  const handleMoveMouseUp = useCallback(() => {
    isMoving.current = false;
    document.removeEventListener("mousemove", handleMoveMouseMove);
    document.removeEventListener("mouseup", handleMoveMouseUp);
  }, [handleMoveMouseMove]);

  const handleMoveMouseDown = useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!props.parentRef.current) return;

      isMoving.current = true;
      const parentRect = props.parentRef.current.getBoundingClientRect();
      moveStart.current = {
        mouseX: e.clientX - parentRect.left,
        mouseY: e.clientY - parentRect.top,
        x: position.x,
        y: position.y,
      };

      document.addEventListener("mousemove", handleMoveMouseMove);
      document.addEventListener("mouseup", handleMoveMouseUp);
    },
    [props, position.x, position.y, handleMoveMouseMove, handleMoveMouseUp],
  );

  return useMemo(
    () => ({
      position,
      dimensions,
      handleMoveMouseDown,
      handleResizeMouseDown,
    }),
    [position, dimensions, handleMoveMouseDown, handleResizeMouseDown],
  );
};
