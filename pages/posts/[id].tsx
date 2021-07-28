import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData  } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

/*
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
*/

export const getStaticProps: GetStaticProps = async ({params}) => {  
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }: {
  postData: {
    title: string
    date: string
    contentHtml?: string
  }
}) {
  
return (
  	<Layout>
  	  <Head>
        <title>{postData.title}</title>
      </Head>      
      <h1 className={utilStyles.headingXl}>
      		{postData.title}
      </h1>
      <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )  	
}