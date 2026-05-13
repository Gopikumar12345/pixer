function Footer({ year = new Date().getFullYear() }) {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      <p>© {year} Pixer. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
