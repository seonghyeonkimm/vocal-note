import { Typography } from 'antd';
import { FC } from 'react';

type Props = {
  filename: string;
  url: string;
};

const RecordHistoryItem: FC<Props> = ({ filename, url }) => {
  return (
    <div>
      <Typography.Title level={5}>{filename}</Typography.Title>
      <audio controls src={url} />
      <style jsx>{`
        audio {
          width: 100%;
        }
      `}</style>
    </div>
  )
};

export default RecordHistoryItem;
