const styles: any = {
  footer: {
    width: '100vw',
    textAlign: 'center',
    backgroundColor: 'var(--oworange)',
    color: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Overmatch. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
