import LogoComponent from '../logo-component/logo-component';

function FooterComponent(): JSX.Element {
  return (
    <footer className="page-footer">
      <LogoComponent classAttribute={'logo__link--light'} />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
