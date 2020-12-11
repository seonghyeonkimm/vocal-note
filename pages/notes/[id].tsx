import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Divider, Layout, message, PageHeader, Typography } from 'antd';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LyricChar from "../../components/LyricChar";
import SpaceChar from "../../components/SpaceChar";
import useFirebase from "../../hooks/useFirestore";
import PageLoading from "../../components/PageLoading";
import { DeleteOutlined } from "@ant-design/icons";
import RecordButton from "../../components/RecordButton";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";
import RecordHistory from "../../components/RecordHistory";
import useRecordHistory from "../../hooks/useRecordHistory";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";

export default function DetailPage() {
  const db = useFirebase();
  const storage = useFirebaseStorage();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { lyrics: [] }
  });
  const recordHistoryData = useRecordHistory();

  const handleBackClick = () => router.push('/');
  const onSubmit = async (data) => {
    const id = router.query.id as string;

    setActionLoading(true);
    await db.collection('notes')
      .doc(id)
      .set(data, { merge: true })
    setActionLoading(false);
    message.success('저장되었습니다');
  }

  const onDelete = async () => {
    const id = router.query.id as string;
    setActionLoading(true);
    await db.collection('notes')
      .doc(id)
      .delete();
    setActionLoading(false);

    message.success('해당 노트를 삭제했습니다');
    router.push('/');
  }

  const onAudioSave = async (blob: string) => {
    const blobObj = await fetch(blob).then(r => r.blob());
    const id = router.query.id as string;
    const filename = `${id}/${new Date().toISOString()}.wav`;
    const ref = storage.child(filename);
    await ref.put(blobObj)
    await recordHistoryData.reload();
    message.success('녹음 기록을 저장했습니다');
  }

  const onAudioDelete = async (fullpath: string) => {
    const ref = storage.child(fullpath);
    await ref.delete();
    await recordHistoryData.reload();
    message.success('해당 녹음 기록을 삭제했습니다');
  }

  useEffect(() => {
    const id = router.query.id as string;
    if (!id) return;

    db.collection('notes')
      .doc(id)
      .get()
      .then(doc => {
        const json = { id: doc.id, ...doc.data() } as any;
        setData(json);
        setValue('lyrics', json.lyrics);
        setLoading(false);
      });
  }, [router.query])

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{data?.title} | Vocal Note</title>
      </Head>
      <PageLoading open={loading} />
      <div className="container">
        <Layout>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Layout.Content>
              <PageHeader
                ghost={false}
                title={data?.title}
                onBack={!loading ? handleBackClick : null}
                extra={[
                  <div key={0} className="loading-hidden">
                    <Button
                      danger
                      onClick={onDelete}
                      loading={actionLoading}
                      icon={<DeleteOutlined />}
                    >
                      삭제
                    </Button>
                  </div>
                ]}
              >
                {(data?.lyrics || []).map((charObj, index) => {
                  return (
                    <span key={index.toString()}>
                      <input name={`lyrics[${index}].type`} className="hidden" ref={register} />
                      <input name={`lyrics[${index}].text`} className="hidden" ref={register} />
                      {(() => {
                        switch (charObj.type) {
                          case 'text':
                            return (
                              <LyricChar
                                ref={register}
                                text={charObj.text}
                                name={`lyrics[${index}].accent`}
                              />
                            );
                          case 'space':
                            return (
                              <SpaceChar ref={register} name={`lyrics[${index}].pause`} />
                            );
                          case 'enter':
                            return (
                              <SpaceChar ref={register} name={`lyrics[${index}].pause`} enter />
                            );
                          case 'linebreak':
                            return <br />;
                          default:
                            return null;
                        }
                      })()}
                    </span>
                  )
                })}
                <div className="loading-hidden">
                  <Divider />
                  <ErrorBoundary
                    FallbackComponent={() => <Typography.Paragraph>이 브라우저는 녹음 기능을 제공하지 않습니다. 크롬을 사용해주세요</Typography.Paragraph>}
                  >
                    <RecordButton onSave={onAudioSave} />
                  </ErrorBoundary>
                  <Divider />
                  <RecordHistory {...recordHistoryData} onItemDelete={onAudioDelete} />
                </div>
              </PageHeader>
            </Layout.Content>
            <div className="button-container loading-hidden">
              <Button htmlType="submit" type="primary" block loading={actionLoading}>저장</Button>
            </div>
          </form>
        </Layout>
      </div>
      <style jsx>
        {`
          .hidden {
            display: none;
          }

          .loading-hidden {
            display: ${loading ? 'none' : 'inherit'};
          }

          .container {
            padding-bottom: 40px;
          }

          .button-container {
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;

            padding: 8px;
          }
        `}
      </style>
    </div>
  )
}
