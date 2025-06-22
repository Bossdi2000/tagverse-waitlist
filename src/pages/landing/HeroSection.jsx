"use client"

import { useState, useEffect } from "react"
import { Box, Typography, TextField, Button, Card, CardContent, Link } from "@mui/material"
import { styled } from "@mui/material/styles"

// Styled components
const StyledHeroBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(8, 0),
  margin: 0,
  height: "auto",
  background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url(/BAG1.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.25,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1,
    animation: "backgroundPan 20s ease-in-out infinite",
    "@keyframes backgroundPan": {
      "0%": { transform: "scale(1) translate(0, 0)" },
      "50%": { transform: "scale(1.1) translate(-5%, -5%)" },
      "100%": { transform: "scale(1) translate(0, 0)" },
    },
  },
  [theme.breakpoints.down("md")]: { padding: theme.spacing(6, 0) },
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(4, 0) },
}))

const FloatingOrb = styled(Box)(({ theme, size = 300, top, right, bottom, left, delay = 0 }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  opacity: 0.05,
  background: "radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)",
  animation: `float 15s ease-in-out infinite ${delay}s`,
  top,
  right,
  bottom,
  left,
  zIndex: 2,
  "@keyframes float": {
    "0%, 100%": { transform: "scale(1) rotate(0deg)" },
    "50%": { transform: "scale(1.2) rotate(180deg)" },
  },
  [theme.breakpoints.down("md")]: { width: size * 0.7, height: size * 0.7 },
  [theme.breakpoints.down("sm")]: { width: size * 0.5, height: size * 0.5 },
}))

const GridOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  opacity: 0.03,
  backgroundImage: `
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
  zIndex: 2,
  animation: "gridPulse 10s ease-in-out infinite",
  "@keyframes gridPulse": {
    "0%, 100%": { opacity: 0.03 },
    "50%": { opacity: 0.05 },
  },
})

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: theme.spacing(12, 4, 0, 4),
  position: "relative",
  zIndex: 10,
  [theme.breakpoints.down("lg")]: { maxWidth: "1000px", padding: theme.spacing(10, 3, 0, 3) },
  [theme.breakpoints.down("md")]: { maxWidth: "700px", padding: theme.spacing(8, 2, 0, 2) },
  [theme.breakpoints.down("sm")]: { maxWidth: "90%", padding: theme.spacing(6, 1, 0, 1) },
}))

const GradientText = styled(Typography)({
  background: "linear-gradient(45deg, #00ff88, #00cc6a)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline",
})

const AnimatedBox = styled(Box)(({ delay = 0, visible }) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: "all 0.8s ease-out",
  transitionDelay: `${delay}ms`,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#000000",
    color: "#ffffff",
    height: "56px",
    borderRadius: "8px",
    "& fieldset": { borderColor: "#00ff88", borderWidth: "2px" },
    "&:hover fieldset": { borderColor: "#00cc6a" },
    "&.Mui-focused fieldset": {
      borderColor: "#00ff88",
      boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.2)",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      "& .MuiInputBase-input": { color: "rgba(255, 255, 255, 0.5)" },
      "& fieldset": { borderColor: "rgba(0, 255, 136, 0.3)" },
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
    "&::placeholder": { color: "#00ff88", opacity: 1 },
  },
  [theme.breakpoints.down("sm")]: {
    height: "48px",
    "& .MuiOutlinedInput-root": { height: "48px" },
  },
}))

const StyledButton = styled(Button)(({ loading, submitted, theme }) => ({
  height: "56px",
  padding: "0 24px",
  fontWeight: 600,
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  textTransform: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  transform: "scale(1)",
  minWidth: "120px",
  backgroundColor: submitted ? "#10b981" : loading ? "#6b7280" : "#00ff88",
  color: submitted ? "#ffffff" : loading ? "#d1d5db" : "#000000",
  border: "none",
  textShadow: submitted ? "none" : loading ? "none" : "0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 0, 0, 0.4)",
  fontWeight: submitted ? 600 : loading ? 600 : 700,
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: submitted ? "none" : "0 8px 25px rgba(34, 197, 94, 0.4)",
    backgroundColor: submitted ? "#10b981" : loading ? "#6b7280" : "#00cc6a",
    color: submitted ? "#ffffff" : loading ? "#d1d5db" : "#000000",
    border: "none",
    textShadow: submitted ? "none" : loading ? "none" : "0 0 15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 0, 0, 0.5)",
  },
  "&:active": { transform: "scale(0.95)" },
  "&:disabled": {
    backgroundColor: "#6b7280",
    color: "#d1d5db",
    border: "none",
    textShadow: "none",
  },
  [theme.breakpoints.down("sm")]: {
    height: "48px",
    padding: "0 20px",
    fontSize: "0.875rem",
    minWidth: "100px",
  },
}))

const FollowButton = styled(Button)(({ theme, completed }) => ({
  height: "48px",
  padding: "0 24px",
  fontWeight: 500,
  fontSize: "0.9rem",
  textTransform: "none",
  borderRadius: "8px",
  backgroundColor: "#000000",
  color: "#00ff88",
  border: `2px solid ${completed ? "#10b981" : "#00ff88"}`,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    color: "#00ff88",
    borderColor: "#00cc6a",
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "36px",
    padding: "0 12px",
    fontSize: "0.75rem",
    minWidth: "100px",
    maxWidth: "none",
    flex: 1,
  },
}))

const BackerLogo = styled(Box)(({ bgcolor, istext, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: istext ? "auto" : 36,
  height: istext ? "auto" : 36,
  backgroundColor: istext ? "transparent" : bgcolor,
  borderRadius: istext ? 0 : "6px",
  color: "white",
  fontWeight: "bold",
  fontSize: istext ? "1rem" : "14px",
  padding: istext ? "8px 12px" : 0,
  boxShadow: istext ? "none" : "0 4px 12px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s ease",
  "&:hover": { transform: "scale(1.1)" },
  [theme.breakpoints.down("sm")]: {
    width: istext ? "auto" : 30,
    height: istext ? "auto" : 30,
    fontSize: istext ? "0.875rem" : "12px",
  },
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(55, 65, 81, 0.3)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 1)",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  height: "100%",
  "&:hover": {
    borderColor: "#00ff88",
    transform: "translateY(-4px)",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: "10px",
  },
}))

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  maxWidth: "500px", // Reduced from 600px
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    maxWidth: "280px", // Reduced from 300px for smaller email input
    marginBottom: theme.spacing(4),
  },
}))

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  maxWidth: "1400px",
  margin: "0 auto",
  padding: theme.spacing(0, 1),
  [theme.breakpoints.down("lg")]: {
    maxWidth: "1000px",
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "700px",
    gap: theme.spacing(1.5),
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    maxWidth: "90%",
    gap: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
}))

const FeatureCardWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: { minWidth: "100%" },
}))

// New styled component for social buttons container
const SocialButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1), // Reduced gap on mobile for better fit
    flexWrap: "nowrap", // Ensure buttons stay on one line
    overflowX: "auto", // Allow horizontal scroll if needed
    paddingBottom: theme.spacing(1), // Add some padding for scroll bar
  },
}))

const HeroSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [followTwitter, setFollowTwitter] = useState(false)
  const [followTelegram, setFollowTelegram] = useState(false)
  const [followDiscord, setFollowDiscord] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const fullText = "Join the Waitlist"
    let index = 0
    let isDeleting = false
    let isPaused = false

    const typeWriterEffect = () => {
      if (isPaused) {
        isPaused = false
        return
      }

      if (!isDeleting && index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else if (!isDeleting && index > fullText.length) {
        isPaused = true
        setTimeout(() => {
          isDeleting = true
          typeWriterEffect()
        }, 2000) // Pause for 2 seconds before deleting
        return
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1))
        index--
      } else if (isDeleting && index === 0) {
        isDeleting = false
        isPaused = true
        setTimeout(() => {
          typeWriterEffect()
        }, 500) // Pause for 0.5 seconds before typing again
        return
      }

      setTimeout(typeWriterEffect, isDeleting ? 100 : 150)
    }

    const startTyping = setTimeout(typeWriterEffect, 500)

    return () => clearTimeout(startTyping)
  }, [])

  const allTasksCompleted = followTwitter && followTelegram && followDiscord

  const handleFollowClick = (platform) => {
    if (platform === "twitter") setFollowTwitter(true)
    if (platform === "telegram") setFollowTelegram(true)
    if (platform === "discord") setFollowDiscord(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && allTasksCompleted) {
      setIsLoading(true)
      setTimeout(() => {
        setIsSubmitted(true)
        setIsLoading(false)
        setEmail("")
        setTimeout(() => setIsSubmitted(false), 3000)
      }, 1000)
    }
  }

  const socialLinks = {
    twitter: "https://twitter.com/tagverse_",
    telegram: "https://t.me/tagverse09",
    discord: "https://discord.gg/TWRsD3tR",
  }

  const backers = [
    { name: "M", bg: "#ffeb3b" },
    { name: "Maximal", bg: "transparent", isText: true },
  ]

  const features = [
    {
      icon: "🌐",
      title: "IDFI Expansion",
      description: "Position TAG as portable digital identity infra.",
    },
    {
      icon: "🧠",
      title: "AI-enhanced Identity Scoring",
      description: "Identity Verification Engine (off-chain logic)",
    },
    {
      icon: "📜",
      title: "Build Identity, NFT Issuance",
      description: "Smart contracts for ERC-721 & ERC-1155",
    },
  ]

  return (
    <StyledHeroBox>
      <FloatingOrb size={300} top="5%" right="5%" />
      <FloatingOrb size={200} bottom="10%" left="5%" delay={5} />
      <GridOverlay />

      <ContentContainer>
        <Box textAlign="center">
          <AnimatedBox visible={isVisible} delay={200}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem", lg: "4.5rem", xl: "5rem" },
                fontWeight: 700,
                color: "white",
                mb: { xs: 2, sm: 3 },
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                px: { xs: 1, sm: 2 },
              }}
            >
              Join the <GradientText variant="inherit">{typedText.slice(9) || ""}</GradientText>
              {typedText.length < 9 && typedText}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "3px",
                  height: "1em",
                  backgroundColor: "#00ff88",
                  animation: "blink 1s infinite",
                  "@keyframes blink": {
                    "0%, 50%": { opacity: 1 },
                    "51%, 100%": { opacity: 0 },
                  },
                }}
              />
            </Typography>
          </AnimatedBox>

          <AnimatedBox visible={isVisible} delay={400}>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(209, 213, 219, 0.9)",
                mb: { xs: 3, sm: 4 },
                maxWidth: { xs: "90%", sm: "800px" },
                mx: "auto",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                fontWeight: 400,
                lineHeight: 1.4,
                px: { xs: 1, sm: 2 },
              }}
            >
              Get exclusive updates and early access to the TagVerse beta.
            </Typography>
          </AnimatedBox>

          <AnimatedBox visible={isVisible} delay={500}>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(209, 213, 219, 1)",
                mb: 2,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontWeight: 500,
              }}
            >
              Follow us to join the waitlist:
            </Typography>
            <SocialButtonsContainer>
              <FollowButton
                component={Link}
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener"
                completed={followTwitter}
                onClick={() => handleFollowClick("twitter")}
              >
                {followTwitter ? "✓ Twitter" : "Twitter"}
              </FollowButton>
              <FollowButton
                component={Link}
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener"
                completed={followTelegram}
                onClick={() => handleFollowClick("telegram")}
              >
                {followTelegram ? "✓ Telegram" : "Telegram"}
              </FollowButton>
              <FollowButton
                component={Link}
                href={socialLinks.discord}
                target="_blank"
                rel="noopener"
                completed={followDiscord}
                onClick={() => handleFollowClick("discord")}
              >
                {followDiscord ? "✓ Discord" : "Discord"}
              </FollowButton>
            </SocialButtonsContainer>
          </AnimatedBox>

          <AnimatedBox visible={isVisible} delay={600}>
            <Box component="form" onSubmit={handleSubmit}>
              <FormContainer>
                <StyledTextField
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  variant="outlined"
                  disabled={!allTasksCompleted}
                />
                <StyledButton
                  type="submit"
                  disabled={isLoading || isSubmitted || !allTasksCompleted}
                  loading={isLoading}
                  submitted={isSubmitted}
                  variant="contained"
                >
                  {isLoading ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(156, 163, 175, 1)",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          "@keyframes spin": {
                            "0%": { transform: "rotate(0deg)" },
                            "100%": { transform: "rotate(360deg)" },
                          },
                        }}
                      />
                      <span style={{ color: "#000000", textShadow: "0 0 10px rgba(0, 0, 0, 0.8)" }}>Joining...</span>
                    </Box>
                  ) : isSubmitted ? (
                    "✓ Joined!"
                  ) : (
                    "Join Waitlist"
                  )}
                </StyledButton>
              </FormContainer>
            </Box>
          </AnimatedBox>

          <AnimatedBox visible={isVisible} delay={1200}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                mb: 3,
                mt: { xs: 2, sm: 3 },
                fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" },
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Why TagVerse?
            </Typography>
            <FeaturesContainer>
              {features.map((feature, index) => (
                <FeatureCardWrapper key={index}>
                  <AnimatedBox visible={isVisible} delay={1400 + index * 200}>
                    <FeatureCard>
                      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                        <Typography
                          variant="h3"
                          sx={{
                            mb: 2,
                            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                            color: "#00ff88",
                          }}
                        >
                          {feature.icon}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            mb: 1,
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(156, 213, 219, 1)",
                            lineHeight: 1.6,
                            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.9rem" },
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </AnimatedBox>
                </FeatureCardWrapper>
              ))}
            </FeaturesContainer>
          </AnimatedBox>

          <AnimatedBox visible={isVisible} delay={1600}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(156, 213, 219, 0.8)",
                mb: 2,
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                fontWeight: 500,
                fontFamily: "'Maximal', 'Montserrat', sans-serif",
              }}
            >
              Backed by
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1.5, sm: 2 }}
              flexWrap="wrap"
              mb={{ xs: 6, sm: 8 }}
              px={{ xs: 2, sm: 0 }}
            >
              {backers.map((backer, index) => (
                <AnimatedBox key={index} visible={isVisible} delay={1000 + index * 100}>
                  <BackerLogo bgcolor={backer.bg} istext={backer.isText}>
                    {backer.name}
                  </BackerLogo>
                </AnimatedBox>
              ))}
            </Box>
          </AnimatedBox>
        </Box>
      </ContentContainer>
    </StyledHeroBox>
  )
}

export default HeroSection