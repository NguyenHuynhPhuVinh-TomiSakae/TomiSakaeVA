import Head from 'next/head'
export const Meta = () => {
  const title = 'TomiSakae AI'
  const description = 'Trợ lý ảo AI của TomiSakae!'
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
