import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  zIndex: 1100,
});

const StyledToolbar = styled(Toolbar)({
  minHeight: '64px',
});

const Navbar = () => {
  return (
    <StyledAppBar>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <StyledToolbar sx={{ justifyContent: 'space-between', px: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/Wait-list.jpeg"
              alt="TagVerse Logo"
              sx={{
                height: '40px',
                borderRadius: '8px',
                mr: 2,
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              Tag
              <span style={{ color: '#00ff88' }}>Verse</span> {/* Updated to match HeroSection */}
            </Typography>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;