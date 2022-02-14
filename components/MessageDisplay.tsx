import React from "react";

type Props = {
  text: string;
};

const MessageDisplay = ({ text }: Props) => {
  if (!text) return <></>;
  return (
    <div className="fixed bottom-10 p-4 flex text-center bg-red-200  rounded-lg">
      <strong>{text}</strong>
    </div>
  );
};

export default MessageDisplay;
