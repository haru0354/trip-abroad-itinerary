import React from "react";

type SplitTextLinesProps = {
  text: string;
};

const SplitTextLines: React.FC<SplitTextLinesProps> = ({ text }) => {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

export default SplitTextLines;