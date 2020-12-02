import { PlusOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, PageHeader } from 'antd'
import Link from 'next/link';
import Head from 'next/head'
import NoteCard from '../components/NoteCard';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const createCardClick = (id: number) => () => router.push(`/notes/${id}`);

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
              <Link href="/notes/add" passHref key={0}>
                <Button icon={<PlusOutlined />} type="primary">추가하기</Button>
              </Link>
            ]}
          >
            <Row gutter={[16, 16]}>
              <Col span={6} xs={24} md={12} lg={6}>
                <NoteCard
                  title="그때의 나 그때의 우리"
                  description="2020.12.01"
                  onClick={createCardClick(1)}
                />
              </Col>
            </Row>
          </PageHeader>
        </Layout.Content>
      </Layout>
    </div>
  );
}
