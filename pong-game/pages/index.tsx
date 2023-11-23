import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/main',
      permanent: false,
    },
  }
}

export default function Home() {
  return <div></div>
}
