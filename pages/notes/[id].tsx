import React from "react";
import Head from "next/head";
import { Col, Layout, PageHeader, Row } from 'antd';
import { useRouter } from "next/router";

export default function DetailPage() {
  const router = useRouter();
  const handleBackClick = () => router.push('/');
  const id = router.query.id;

  return (
    <div>
      <Head>
        <title>{id} | Vocal Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Layout.Content>
          <PageHeader
            ghost={false}
            title={`${id} 상세페이지`}
            onBack={handleBackClick}
          >
            <Row>
              <Col span={24}>
                {id} - Lyrics 상세페이지
              </Col>
            </Row>
          </PageHeader>
        </Layout.Content>
      </Layout>
    </div>
  )
}