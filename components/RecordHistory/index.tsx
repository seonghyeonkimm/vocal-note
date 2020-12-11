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
      {loading && <div className="spin-container"><Spin /></div>}
      {data.length > 0 ? (
        data.map((item) => <RecordHistoryItem key={item.filename} {...item} onDelete={onItemDelete} />)
      ): (
        <Typography.Paragraph>표시할 녹음 기록이 없습니다</Typography.Paragraph>
      )}
      <style jsx>{`
        .spin-container {
          margin-top: 12px;
          margin-bottom: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  )
};

export default RecordHistory;
