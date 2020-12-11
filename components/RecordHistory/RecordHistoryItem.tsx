import { DeleteOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { FC, useState } from 'react';

type Props = {
  url: string;
  fullPath: string;
  filename: string;
  onDelete?: (fullPath: string) => void;
};

const RecordHistoryItem: FC<Props> = ({ url, fullPath, filename, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const onDeleteClick = async () => {
    if (!onDelete) return;
    setLoading(true);
    await onDelete(fullPath);
  }

  return (
    <div>
      <div className="title-container">
        <Typography.Title level={5} style={{ marginBottom: 0 }}>{filename}</Typography.Title>
        {onDelete && (
          <Button danger icon={<DeleteOutlined />} type="link" onClick={onDeleteClick} loading={loading} />
        )}
      </div>
      <audio controls src={url} />
      <style jsx>{`
        .title-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        audio {
          width: 100%;
        }
      `}</style>
    </div>
  )
};

export default RecordHistoryItem;
