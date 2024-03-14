
export const Header = () => {
  return (
    <header
      style={{
        width: '100%',
        position: 'absolute',
        top: '0px',
        paddingTop: '20px',
        paddingBottom: '20px',
        backgroundColor: '#2b2c68',
      }}
    >
      <img
        src='/logo.png'
        style={{ width: '240px', height: '54px', marginLeft: '10px'}}
      ></img>
    </header>
  );
}