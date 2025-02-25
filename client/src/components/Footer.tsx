const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Overmatch. All rights reserved.</p>
    </footer>
  );
};

const styles = {
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

export default Footer;
