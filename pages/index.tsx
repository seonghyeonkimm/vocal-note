import styles from '../styles/Home.module.css';

import { Card, Layout, Typography, Row, Col } from 'antd'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>보컬 노트</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.layout}>
        <Layout.Content>
          <Typography.Title level={3}>보컬 노트 리스트</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={6} xs={24} md={12} lg={6}>
              <Card hoverable>
                <Card.Meta title="그때의 나 그때의 우리" description="2020.12.01" />
              </Card>
            </Col>
            {/* <Col span={6}>
              <Card hoverable>
                <Card.Meta title="언제쯤이면" description="2020.12.01" />
              </Card>
            </Col> */}
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  );
}
