import React from "react";
import styled from "styled-components";

const StrokeTextComponents = styled.span`
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #aaa;
`;

export default function StrokeText({ text }: { text: string }) {
  return (
    <StrokeTextComponents className="text-9xl text-transparent absolute -left-[3rem] -top-16 font-bold t opacity-10">
      {text}
    </StrokeTextComponents>
  );
}
