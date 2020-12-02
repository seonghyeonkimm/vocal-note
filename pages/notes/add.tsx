import Head from 'next/head'
import { Layout, Row, Col, PageHeader, Input, Button, Tooltip } from 'antd'
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPage() {
  const router = useRouter();
  const [lyrics, setLyrics] = useState('');
  const handleBackClick = () => router.push('/');
  const handleSaveClick = () => console.log('lyrics saved: ', lyrics)
  const handleLyricsChange = (e) => setLyrics(e.target.value);

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
                title={lyrics.length === 0 ? '가사를 입력하셔야 저장이 가능합니다.' : ''}
              >
                <Button
                  type="primary"
                  onClick={handleSaveClick}
                  disabled={lyrics.length === 0}
                >
                  저장
                </Button>
              </Tooltip>
            ]}
          >
            <Row>
              <Col span={24}>
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
