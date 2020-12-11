import { Spin, Typography } from 'antd';
import { FC } from 'react';
import RecordHistoryItem from './RecordHistoryItem';

type Props = {
  loading: boolean;
  data: { filename: string; url: string; fullPath: string; }[];  
  onItemDelete: (fullPath: string) => void;
};

const RecordHistory: FC<Props> = ({ loading, data, onItemDelete }) => {
  return (
    <div>
      <Typography.Title level={4}>Recording History</Typography.Title>
      {data.length === 0 && loading && <div className="spin-container"><Spin /></div>}
      {data.length > 0 && data.map((item) => (
        <div key={item.filename} className="history-item-container">
          <RecordHistoryItem {...item} onDelete={onItemDelete} />
        </div>
      ))}
      {!loading && data.length === 0 && <Typography.Paragraph>표시할 녹음 기록이 없습니다</Typography.Paragraph>}
      <style jsx>{`
        .spin-container {
          margin-top: 12px;
          margin-bottom: 8px;
          text-align: center;
        }

        .history-item-container {
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
};

export default RecordHistory;
