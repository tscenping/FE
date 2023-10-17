interface TitleData {
  title: string
  subTitle: string
}

function PageTitle(props: TitleData): JSX.Element {
  return (
    <>
      <h1>{props.title}</h1>
      <h3>{props.subTitle}</h3>
    </>
  )
}

export default PageTitle
