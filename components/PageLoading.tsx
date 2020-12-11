import { Spin } from "antd";
import * as React from "react";

type Props = { open: boolean };

const PageLoading: React.FC<Props> = ({ open = false }) => {
  if (!open) return null;

  return (
    <>
      <div><Spin size="large" /></div>
      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1201;
        }
      `}</style>
    </>
  );
};

export default PageLoading;
