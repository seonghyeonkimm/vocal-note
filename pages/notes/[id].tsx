import React from "react";
import Head from "next/head";
import { Button, Layout, PageHeader } from 'antd';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LyricChar from "../../components/LyricChar";
import SpaceChar from "../../components/SpaceChar";

// TODO: 저장 완료했을 때에 message 띄워주기
export default function DetailPage() {
  const router = useRouter();
  // const id = router.query.id;
  const { register, handleSubmit } = useForm({ 
    defaultValues: { lyrics: SAMPLE_RESULT }
  });

  const handleBackClick = () => router.push('/');
  const onSubmit = (data) => console.log('data: ', data)

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>그때의 나, 그때의 우리 | Vocal Note</title>
      </Head>
      <div className="container">
        <Layout>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Layout.Content>
              <PageHeader
                ghost={false}
                onBack={handleBackClick}
                title="그때의 나, 그때의 우리"
              >
                {SAMPLE_RESULT.map((charObj, index) => {
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
            <div className="button-container">
              <Button htmlType="submit" type="primary" block>저장</Button>
            </div>
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

// TODO: 저장할 때 이렇게 바꿔서 저장하기
const SAMPLE_RESULT = SAMPLE.split('').reduce((current, next, index) => {
  if (next === '\n') {
    const lastChar = current[index - 1];
    if (lastChar.text === '\n') {
      current.push({ type: 'linebreak' });
    } else {
      current.push({ type: 'enter', text: next, pause: false });
    }
    return current;
  }

  if (next === ' ') {
    current.push({ type: 'space', text: next, pause: false });
  } else {
    current.push({ type: 'text', text: next, accent: false });
  }

  return current;
}, [])
