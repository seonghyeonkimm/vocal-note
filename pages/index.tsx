import { PlusOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, PageHeader, Spin } from 'antd'
import Link from 'next/link';
import Head from 'next/head'
import NoteCard from '../components/NoteCard';
import { useRouter } from 'next/router';
import useFirebase from '../hooks/useFirestore';
import { useEffect, useState } from 'react';

export default function Home() {
  const db = useFirebase();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const createCardClick = (id: number) => () => router.push(`/notes/${id}`);

  useEffect(() => {
    db.collection("notes")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        })
        setNotes(data);
        setLoading(false);
      });
  }, []);

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
            {loading && (
              <div className="loading-container">
                <Spin />
              </div>
            )}
            <Row gutter={[16, 16]}>
              {notes.map(({ id, title, createdAt }) => {
                return (
                  <Col span={6} xs={24} md={12} lg={6} key={id}>
                    <NoteCard
                      key={id}
                      title={title}
                      description={createdAt}
                      onClick={createCardClick(id)}
                    />
                  </Col>
                )
              })}
            </Row>
          </PageHeader>
        </Layout.Content>
      </Layout>
      <style jsx>{`
        .loading-container {
          padding: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
