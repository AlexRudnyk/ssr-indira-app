import s from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer>
      <section className={s.section}>
        <div className={s.container}>
          <h3 className={s.brandTitle}>Every day has it &#39;s own miracle</h3>
        </div>
      </section>
    </footer>
  )
}

export default Footer
