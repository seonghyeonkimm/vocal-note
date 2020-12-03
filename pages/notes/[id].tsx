import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Layout, message, PageHeader } from 'antd';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LyricChar from "../../components/LyricChar";
import SpaceChar from "../../components/SpaceChar";
import useFirebase from "../../hooks/useFirestore";
import PageLoading from "../../components/PageLoading";
import { DeleteOutlined } from "@ant-design/icons";

export default function DetailPage() {
  const db = useFirebase();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { lyrics: [] }
  });

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
                onBack={handleBackClick}
                title={data?.title}
                {...!loading && {
                  extra: [
                    <Button
                      danger
                      key={0}
                      icon={<DeleteOutlined />}
                      onClick={onDelete}
                      loading={actionLoading}
                    >
                      삭제
                    </Button>
                  ]
                }}
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
              </PageHeader>
            </Layout.Content>
            {!loading && (
              <div className="button-container">
                <Button htmlType="submit" type="primary" block loading={actionLoading}>저장</Button>
              </div>
            )}
          </form>
        </Layout>
      </div>
      <style jsx>
        {`
          .hidden {
            display: none;
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
