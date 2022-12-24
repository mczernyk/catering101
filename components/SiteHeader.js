import Link from "next/link"
import AuthBtn from "./AuthBtn"


const SiteHeader = () => {

  return (
    <header className={"site-header"}>
      <div className="wrapper">
        <AuthBtn />

        <figure className="logo">
          <h1>
            <Link href={`/`} passHref={true}>My Permits 📝</Link>
          </h1>
        </figure>
      </div>
    </header>
  )
}

export default SiteHeader
