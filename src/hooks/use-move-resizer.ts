import { MouseEventHandler, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

type MousePosition = {
  mouseX: number;
  mouseY: number;
};

type ElementPosition = {
  x: number;
  y: number;
};

type ElementSize = {
  width: number;
  height: number;
};

export type UseMoveHookProps = {
  parentRef: RefObject<HTMLElement>;
  initialPosition: ElementPosition;
  initialSize: ElementSize;
  minSize: ElementSize | number;
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

  const resizeStart = useRef<MousePosition & ElementSize>({
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0,
  });
  const moveStart = useRef<MousePosition & ElementPosition>({
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

      const minSizeX = typeof props.minSize === "object" ? props.minSize.width : props.minSize;
      const minSizeY = typeof props.minSize === "object" ? props.minSize.height : props.minSize;
      newWidth = Math.max(minSizeX, newWidth);
      newHeight = Math.max(minSizeY, newHeight);

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
    [props, position, handleMoveMouseMove, handleMoveMouseUp],
  );

  // Update on resize
  useEffect(() => {
    const parentEl = props.parentRef.current;
    if (!parentEl) return;

    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0) return;
      const { width: parentWidth, height: parentHeight } = entries[0].contentRect;

      setPosition((prevPosition) => {
        const maxX = Math.max(0, parentWidth - dimensions.width);
        const maxY = Math.max(0, parentHeight - dimensions.height);
        return {
          x: Math.min(prevPosition.x, maxX),
          y: Math.min(prevPosition.y, maxY),
        };
      });
    });

    observer.observe(parentEl);
    return () => observer.disconnect();
  }, [props.parentRef, dimensions.width, dimensions.height]);

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
