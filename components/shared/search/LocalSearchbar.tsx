"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface Props {
  route: string;
  position: string;
  imgSrc: string;
  placeholder: string;
  extraClasses?: string;
}

const LocalSearchbar = ({
  route,
  position,
  imgSrc,
  placeholder,
  extraClasses,
}: Props) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${extraClasses}`}
    >
      {position === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {position === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
