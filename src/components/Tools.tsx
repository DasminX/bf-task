export const Tools = () => {
  return (
    <div className="w-[759px] h-[948px]">
      {/* Górny pasek */}
      <div className="h-16 w-full flex justify-between items-center">
        {/* Logo i canvasEditor */}
        <div className="h-full w-[299px] flex justify-between items-center">
          <img src="logo.svg" className="w-16 h-16" />
          <p className="text-[32px]/12 font-poppins w-[223px]">CanvasEditor</p>
        </div>
        {/* Reset buton */}
        <div className="w-[90px] h-8 flex justify-between items-center">
          <p className="text-[18px]/[27px] font-poppins text-[#CB0000]">
            Reset
          </p>
          <img
            src="reset.svg"
            className="w-8 h-8" // TODO color #CB0000
          />
        </div>
      </div>

      {/* Divider */}
      {/* Add content */}
    </div>
  );
};
