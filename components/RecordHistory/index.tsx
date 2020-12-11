import { Spin, Typography } from 'antd';
import { FC } from 'react';
import RecordHistoryItem from './RecordHistoryItem';

type Props = {
  loading: boolean;
  data: { filename: string; url: string }[];  
};

const RecordHistory: FC<Props> = ({ loading, data }) => {
  return (
    <div>
      <Typography.Title level={4}>Recording History</Typography.Title>
      {loading && <div className="spin-container"><Spin /></div>}
      {data.map((item) => <RecordHistoryItem key={item.filename} {...item} />)}
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
