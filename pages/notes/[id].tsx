import React from "react";
import Head from "next/head";
import { Layout, PageHeader } from 'antd';
import { useRouter } from "next/router";

export default function DetailPage() {
  const router = useRouter();
  const handleBackClick = () => router.push('/');
  // const id = router.query.id;


  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>그때의 나, 그때의 우리 | Vocal Note</title>
      </Head>
      <Layout>
        <Layout.Content>
          <PageHeader
            ghost={false}
            onBack={handleBackClick}
            title="그때의 나, 그때의 우리"
          >
            <div style={{ whiteSpace: 'pre-line' }}>
              {SAMPLE}
            </div>
          </PageHeader>
        </Layout.Content>
      </Layout>
    </div>
  )
}

const SAMPLE = `그때의 나 그때의 우리
참 어리석고 어렸지
그때의 우리 아무것도 아닌 일에
다투던 초라할 무렵에 기억

달 밝은 날에 하늘을 보면
우리 상처들이 떠 있고
밤 또 늦은 밤에 거릴 거닐면
그때의 추억이 선명하게 따라와

네가 그립거나 보고프거나
그런 쉬운 감정이 아니야

난 그때의 우리가 세상에
우리밖에 없었던 그때가 그리울 뿐

그때의 우리 소홀함과 편안함
그 안에서 부숴질 듯 아파했던

달 밝은 날에 하늘을 보면
우리 상처들이 떠 있고
밤 또 늦은 밤에 거릴 거닐면
그때의 추억이 선명하게 따라와

네가 그립거나 보고프거나
그런 쉬운 감정이 아니야

난 그때의 우리가 세상에
우리밖에 없었던 그때가 그리워
다시 그 시간으로 돌아가고픈
가벼운 순간의 감정이 아냐

난 그때의 우리가 너와 내가
이 세상 전부였던 그때가 그리울 뿐

그때의 나 그때의 우리`;
