import Logo from "../Logo"
import Navigation from "../Navigation"

import s from "./Header.module.scss"

const Header = () => {
  return (
    <header>
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.headerWrapper}>
            <Logo />
            <Navigation />
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
