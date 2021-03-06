import css from './Footer.module.css';
import { Container } from '@components/layout';

const Footer = () => {
  return (
    <section className={css.footer}>
      <Container>
        <p className={css.footerCopy}>
          Lynx Storefront {new Date().getFullYear()} &copy;
        </p>
      </Container>
    </section>
  );
};

export default Footer;
