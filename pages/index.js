import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title >NexxtJS Auth</title>
        <meta name="description" content="NextJS Auth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className='text-4xl'>Home</h1>
        <p><Link href="/signup">Sign Up</Link></p>
        <p><Link href="/signin">Sign In</Link></p>
      </Layout>
    </div>
  )
}
