import { Box } from "@mui/material"
import Navbar from "./Navbar"
import HeroSection from "./HeroSection"

const LandingPage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden", margin: 0, padding: 0 }}>
      <Navbar />
      <HeroSection />
      {/* Additional sections can be added here and will be scrollable */}
     
    </Box>
  )
}

export default LandingPage
