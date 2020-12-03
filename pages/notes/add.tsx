import Head from 'next/head'
import { Layout, Row, Col, PageHeader, Input, Button, Tooltip, Typography } from 'antd'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useFirestore from '../../hooks/useFirestore';
import formatLyrics from '../../utils/formatLyrics';

export default function AddPage() {
  const db = useFirestore();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const handleBackClick = () => router.push('/');
  const handleLyricsChange = (e) => setLyrics(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSaveClick = async () => {
    setLoading(true);
    const json = {
      title,
      lyrics: formatLyrics(lyrics),
      createdAt: new Date().toISOString(),
    };
    await db.collection("notes").add(json)
    setLoading(false);
    router.push('/');
  }

  return (
    <div>
      <Head>
        <title>추가하기 | Vocal Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Layout.Content>
          <PageHeader
            ghost={false}
            title="보컬 노트 추가하기"
            onBack={handleBackClick}
            extra={[
              <Tooltip
                key={0}
                placement="left"
                title={lyrics.length === 0 ? '제목과 가사를 입력하셔야 저장이 가능합니다.' : ''}
              >
                <Button
                  type="primary"
                  onClick={handleSaveClick}
                  loading={loading}
                  disabled={lyrics.length === 0 && title.length === 0}
                >
                  저장
                </Button>
              </Tooltip>
            ]}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Title level={5}>제목</Typography.Title>
                <Input placeholder="제목을 입력해주세요" value={title} onChange={handleTitleChange} size="large" />
              </Col>
              <Col span={24}>
                <Typography.Title level={5}>가사</Typography.Title>
                <Input.TextArea
                  rows={20}
                  size="large"
                  value={lyrics}
                  onChange={handleLyricsChange}
                  placeholder="노래의 가사를 입력해주세요"
                />
              </Col>
            </Row>
          </PageHeader>
        </Layout.Content>
      </Layout>
    </div>
  );
}
