import { AudioOutlined, DeleteOutlined, PauseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React, { FC, useRef, useState } from 'react';
import { ReactMediaRecorderHookProps, useReactMediaRecorder } from 'react-media-recorder';

type Props = ReactMediaRecorderHookProps & {
  showPreview?: boolean;
  onSave?: (blob: string) => void;
};

const RecordButton: FC<Props> = ({ showPreview = true, onSave, ...props }) => {
  const intervalRef = useRef<any>();
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder(props);

  const onStartClick = () => {
    clearBlobUrl();
    startRecording();
    intervalRef.current = setInterval(() => setRecordedSeconds(prev => prev + 1), 1000);
  }

  const onSaveClick = () => {
    console.log('typeof bloburl: ', typeof mediaBlobUrl);
    onSave(mediaBlobUrl);
  }

  const onStopClick = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRecordedSeconds(0);
    stopRecording();
  }

  return (
    <>
      <div>
        {status !== 'recording' ? (
          <Button.Group style={{ display: 'flex' }}>
            <Button onClick={onStartClick} icon={<AudioOutlined />} style={{ flex: '1 1 auto' }}>
              녹음하기
            </Button>
            {mediaBlobUrl && onSave && <Button icon={<SaveOutlined />} onClick={onSaveClick}>녹음 저장</Button>}
            {mediaBlobUrl && <Button icon={<DeleteOutlined />} onClick={clearBlobUrl}>녹음 삭제</Button>}
          </Button.Group>
        ) : (
        <Button
          block
          onClick={onStopClick}
          icon={<PauseOutlined />}
        >
          {Math.floor(recordedSeconds / 60).toString().padStart(2, '0')}:{(recordedSeconds % 60).toString().padStart(2, '0')}초 녹음완료
        </Button>
        )}
        {showPreview && mediaBlobUrl && (
          <div className="preview-container">
            <Typography.Title level={5}>Recording Preview</Typography.Title>
            <audio src={mediaBlobUrl} controls />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .preview-container {
            margin-top: 12px;
          }

          .preview-container audio {
            width: 100%;
          }
        `}
      </style>
    </>
  )
};

export default RecordButton;