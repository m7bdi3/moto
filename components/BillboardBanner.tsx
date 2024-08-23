import React from "react";

interface Props {
  data: {
    label: string;
    imageUrl: string;
  };
}

export const BillboardBanner = ({ data }: Props) => {
  return (
    <div className="rounded-md md:h-[600px] h-[400px]">
      <div
        style={{
          backgroundImage: `url(${data.imageUrl})`,
        }}
        className="rounded-md relative w-full h-full overflow-hidden bg-fixed bg-cover bg-center"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};
