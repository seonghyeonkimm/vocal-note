import { PlusOutlined } from '@ant-design/icons';
import { Card, Layout, Typography, Row, Col, Button, Space, PageHeader } from 'antd'
import Link from 'next/link';
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>홈 | Vocal Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Layout.Content>
          <PageHeader
            ghost={false}
            title="보컬 노트 리스트"
            extra={[
              <Link href="/add" passHref key={0}>
                <Button icon={<PlusOutlined />} type="primary">추가하기</Button>
              </Link>
            ]}
          >
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
          </PageHeader>
        </Layout.Content>
      </Layout>
    </div>
  );
}
