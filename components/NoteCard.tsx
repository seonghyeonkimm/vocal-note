import { CardMetaProps } from 'antd/lib/card';
import { FC } from 'react';
import { Card } from 'antd';

type Props = CardMetaProps & {
  onClick: any;
};

const NoteCard: FC<Props> = ({ onClick, ...props }) => {
  return (
    <Card hoverable onClick={onClick}>
      <Card.Meta {...props} />
    </Card>
  )
};

export default NoteCard;
