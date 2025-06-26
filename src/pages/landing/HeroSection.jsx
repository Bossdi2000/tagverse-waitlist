"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Typography, TextField, Button, Card, CardContent, Link, Modal, IconButton, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

// Import Inter and Playfair Display fonts via Google Fonts
const addGoogleFonts = () => {
  const link = document.createElement("link")
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
  link.rel = "stylesheet"
  document.head.appendChild(link)
}
addGoogleFonts()

// Global style for smooth scrolling
const GlobalStyle = styled("div")({
  html: {
    scrollBehavior: "smooth",
  },
})

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
  backgroundImage: "url(/COM.jpeg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.85))",
    zIndex: 1,
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
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "all 0.8s ease-in-out",
  transitionDelay: `${delay}ms`,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#000000",
    color: "#f2f2f2",
    height: "56px",
    borderRadius: "12px",
    padding: theme.spacing(1),
    "& fieldset": { borderColor: "#00ff88", borderWidth: "2px" },
    "&:hover fieldset": { borderColor: "#00cc6a" },
    "&.Mui-focused fieldset": {
      borderColor: "#00ff88",
      boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      "& .MuiInputBase-input": { color: "#f2f2f2" },
      "& fieldset": { borderColor: "rgba(0, 255, 136, 0.3)" },
    },
  },
  "& .MuiInputBase-input": {
    color: "#f2f2f2",
    padding: theme.spacing(1.5),
    "&::placeholder": { color: "#00ff88", opacity: 1 },
  },
  [theme.breakpoints.down("sm")]: {
    height: "48px",
    "& .MuiOutlinedInput-root": { height: "48px", width: "100%" },
  },
}))

const StyledButton = styled(Button)(({ loading, submitted, theme }) => ({
  height: "56px",
  padding: "0 24px",
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  textTransform: "none",
  borderRadius: "12px",
  transition: "all 0.2s ease-in-out",
  transform: "scale(1)",
  minWidth: "120px",
  backgroundColor: submitted ? "#10b981" : loading ? "#6b7280" : "#00FFB2",
  color: submitted ? "#f2f2f2" : loading ? "#f2f2f2" : "#000000",
  border: "none",
  fontWeight: 600,
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)",
    backgroundColor: submitted ? "#10b981" : loading ? "#6b7280" : "#00e3a2",
    color: submitted ? "#f2f2f2" : loading ? "#f2f2f2" : "#000000",
    border: "none",
  },
  "&:active": { transform: "scale(0.95)" },
  "&:disabled": {
    backgroundColor: "#6b7280",
    color: "#f2f2f2",
    border: "none",
  },
  [theme.breakpoints.down("sm")]: {
    height: "48px",
    padding: "0 20px",
    fontSize: "0.875rem",
    width: "100%",
  },
}))

const FollowButton = styled(Button)(({ theme, completed }) => ({
  height: "48px",
  padding: "0 24px",
  fontWeight: 500,
  fontSize: "0.9rem",
  textTransform: "none",
  borderRadius: "12px",
  backgroundColor: "#000000",
  color: "#f2f2f2",
  border: `2px solid ${completed ? "#10b981" : "#00ff88"}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    color: "#f2f2f2",
    borderColor: "#00e3a2",
    transform: "scale(1.02)",
    boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "32px",
    padding: "0 10px",
    fontSize: "0.7rem",
    minWidth: "80px",
  },
}))

const BackerLogo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1), // Space between logo and text
  transition: "transform 0.3s ease",
  "&:hover": { transform: "scale(1.1)" },
  "& img": {
    width: 36,
    height: 36,
    objectFit: "contain",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  "& .MuiTypography-root": {
    color: "#f2f2f2",
    fontWeight: "bold",
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
  },
  [theme.breakpoints.down("sm")]: {
    "& img": {
      width: 30,
      height: 30,
    },
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
    },
  },
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 10px rgba(34, 197, 94, 0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  height: "100%",
  marginBottom: theme.spacing(3),
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 15px rgba(34, 197, 94, 0.5)",
    borderColor: "#00ff88",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: "10px",
  },
}))

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))",
  backdropFilter: "blur(15px)",
  borderRadius: "20px",
  padding: theme.spacing(5),
  maxWidth: "600px",
  width: "90%",
  color: "#f2f2f2",
  boxShadow: "0 15px 50px rgba(0,0,0,0.6), 0 0 20px rgba(34, 197, 94, 0.3)",
  border: "2px solid rgba(34, 197, 94, 0.4)",
  animation: "modalFadeIn 0.3s ease-out",
  "@keyframes modalFadeIn": {
    "0%": { opacity: 0, transform: "translate(-50%, -60%) scale(0.95)" },
    "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    maxWidth: "85%",
    borderRadius: "16px",
  },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: "#f2f2f2",
  "&:hover": {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
  },
}))

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  maxWidth: "500px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    maxWidth: "280px",
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
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    maxWidth: "90%",
    gap: theme.spacing(3),
  },
}))

const FeatureCardWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down("sm")]: { minWidth: "100%" },
}))

const SocialButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    flexWrap: "nowrap",
    overflowX: "auto",
    paddingBottom: theme.spacing(1),
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
  const [typedIntroText, setTypedIntroText] = useState("")
  const [openModal, setOpenModal] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Typing animation for "Join the Waitlist"
  useEffect(() => {
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
        }, 2000)
        return
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1))
        index--
      } else if (isDeleting && index === 0) {
        isDeleting = false
        isPaused = true
        setTimeout(() => {
          typeWriterEffect()
        }, 500)
        return
      }

      setTimeout(typeWriterEffect, isDeleting ? 100 : 150)
    }

    const startTyping = setTimeout(typeWriterEffect, 500)

    return () => clearTimeout(startTyping)
  }, [])

  // Typing animation for Hero Introduction
  useEffect(() => {
    const fullIntroText =
      "Own Your Voice. Build Your Identity. TAG is the first platform pioneering Identity Finance (IDFI). By holding a TAG NFT, your digital identity becomes your greatest asset. Engage. Speak. Earn. Redeem. No tokens. No speculation. Just influence with impact."
    let index = 0
    let isDeleting = false
    let isPaused = false

    const typeIntroEffect = () => {
      if (isPaused) {
        isPaused = false
        return
      }

      if (!isDeleting && index <= fullIntroText.length) {
        setTypedIntroText(fullIntroText.slice(0, index))
        index++
      } else if (!isDeleting && index > fullIntroText.length) {
        isPaused = true
        setTimeout(() => {
          isDeleting = true
          typeIntroEffect()
        }, 3000)
        return
      } else if (isDeleting && index > 0) {
        setTypedIntroText(fullIntroText.slice(0, index - 1))
        index--
      } else if (isDeleting && index === 0) {
        isDeleting = false
        isPaused = true
        setTimeout(() => {
          typeIntroEffect()
        }, 500)
        return
      }

      setTimeout(typeIntroEffect, isDeleting ? 50 : 100)
    }

    const startIntroTyping = setTimeout(typeIntroEffect, 1000)

    return () => clearTimeout(startIntroTyping)
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

  const handleOpenModal = (feature) => setOpenModal(feature)
  const handleCloseModal = () => setOpenModal(null)

  const socialLinks = {
    twitter: "https://twitter.com/tagverse_",
    telegram: "https://t.me/tagverse09",
    discord: "https://discord.gg/TWRsD3tR",
  }

  const backers = [
    { name: "Maximals", image: "/Max.jpeg", isText: false },
  ]

  const features = [
    {
      icon: "🌐",
      title: "IDFI Expansion",
      description: "Position TAG as portable digital identity infra.",
      popup: "TAG is building the foundation for Identity Finance (IDFI): a new economy where reputation, activity, and influence matter more than capital. TAG NFTs become your portable, verifiable identity across ecosystems.",
    },
    {
      icon: "🧠",
      title: "AI-enhanced Identity Scoring",
      description: "Identity Verification Engine (off-chain logic)",
      popup: "Our off-chain AI engine verifies authenticity, consistency, and influence from user voice activity. This ensures fair, bot-resistant point scoring.",
    },
    {
      icon: "📜",
      title: "Build Identity, NFT Issuance",
      description: "Smart contracts for ERC-721 & ERC-1155",
      popup: "TAG uses ERC-721 & ERC-1155 contracts to issue dynamic NFTs tied to reputation. These act as evolving digital identity passports across dApps and DAOs.",
    },
  ]

  return (
    <>
      <GlobalStyle />
      <StyledHeroBox ref={sectionRef}>
        <FloatingOrb size={300} top="5%" right="5%" />
        <FloatingOrb size={200} bottom="10%" left="5%" delay={5} />
        <GridOverlay />

        <ContentContainer>
          <Box textAlign="center">
            <AnimatedBox visible={isVisible} delay={200}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "36px", sm: "48px", md: "60px", lg: "72px", xl: "80px" },
                  fontWeight: 700,
                  color: "#f2f2f2",
                  mb: { xs: 2, sm: 3 },
                  lineHeight: 1.6,
                  letterSpacing: "-0.02em",
                  px: { xs: 1, sm: 2 },
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Join the <GradientText variant="inherit">{typedText.slice(9) || ""}</GradientText>
                {typedText.length < 9 && typedText}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "4px",
                    height: "1.2em",
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

            {/* Hero Introduction with Typing Animation */}
            <AnimatedBox visible={isVisible} delay={400}>
              <Box sx={{ maxWidth: "600px", mx: "auto", mb: 4, px: { xs: 1, sm: 2 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "24px", sm: "28px", md: "32px" },
                    fontWeight: 700,
                    color: "#f2f2f2",
                    mb: 2,
                    lineHeight: 1.6,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {typedIntroText.includes("Own Your Voice.") ? "Own Your Voice. Build Your Identity." : ""}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    color: "#f2f2f2",
                    mb: 2,
                    lineHeight: 1.6,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {typedIntroText.includes("TAG is the first platform") ? typedIntroText.slice(typedIntroText.indexOf("TAG is the first platform")) : ""}
                </Typography>
              </Box>
            </AnimatedBox>

            <AnimatedBox visible={isVisible} delay={600}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  color: "#f2f2f2",
                  mb: 2,
                  lineHeight: 1.6,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
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

            <AnimatedBox visible={isVisible} delay={800}>
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
                        <span style={{ color: "#000000" }}>Joining...</span>
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

            <AnimatedBox visible={isVisible} delay={1000}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "24px", sm: "28px", md: "32px" },
                  color: "#f2f2f2",
                  mb: 3,
                  mt: { xs: 2, sm: 3 },
                  lineHeight: 1.6,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Why TagVerse?
              </Typography>
              <FeaturesContainer>
                {features.map((feature, index) => (
                  <FeatureCardWrapper key={index}>
                    <AnimatedBox visible={isVisible} delay={1200 + index * 200}>
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "14px", color: "#f2f2f2", fontFamily: "'Inter', sans-serif" }}>
                            {feature.popup}
                          </Typography>
                        }
                        placement="top"
                        arrow
                        sx={{ [theme => theme.breakpoints.down("sm")]: { pointerEvents: "none" } }}
                      >
                        <FeatureCard onClick={() => handleOpenModal(feature)}>
                          <CardContent sx={{ p: theme => theme.spacing(2.5) }}>
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
                                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                                color: "#f2f2f2",
                                fontWeight: 600,
                                mb: 1,
                                lineHeight: 1.6,
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "16px",
                                color: "#f2f2f2",
                                lineHeight: 1.6,
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {feature.description}
                            </Typography>
                          </CardContent>
                        </FeatureCard>
                      </Tooltip>
                      <Modal
                        open={openModal === feature}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                      >
                        <ModalContent>
                          <CloseButton onClick={handleCloseModal}>
                            <CloseIcon />
                          </CloseButton>
                          <Typography
                            id="modal-title"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "28px", sm: "32px" },
                              fontWeight: 700,
                              mb: 3,
                              fontFamily: "'Playfair Display', serif",
                              color: "#00ff88",
                              textAlign: "center",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            id="modal-description"
                            sx={{
                              fontSize: { xs: "16px", sm: "18px" },
                              lineHeight: 1.7,
                              fontFamily: "'Inter', sans-serif",
                              color: "#f2f2f2",
                              textAlign: "center",
                            }}
                          >
                            {feature.popup}
                          </Typography>
                        </ModalContent>
                      </Modal>
                    </AnimatedBox>
                  </FeatureCardWrapper>
                ))}
              </FeaturesContainer>
            </AnimatedBox>

            <AnimatedBox visible={isVisible} delay={1600}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  color: "#f2f2f2",
                  mb: 2,
                  lineHeight: 1.6,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Trusted By:
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 1.5, sm: 2 }}
                flexWrap="wrap"
                sx={{
                  mb: { xs: theme => theme.spacing(6), sm: theme => theme.spacing(8) },
                  px: { xs: theme => theme.spacing(2), sm: 0 },
                }}
              >
                {backers.map((backer, index) => (
                  <AnimatedBox key={index} visible={isVisible} delay={1000 + index * 100}>
                    <BackerLogo>
                      {backer.image && <img src={backer.image} alt={backer.name} />}
                      <Typography>{backer.name}</Typography>
                    </BackerLogo>
                  </AnimatedBox>
                ))}
              </Box>
            </AnimatedBox>
          </Box>
        </ContentContainer>
      </StyledHeroBox>
    </>
  )
}

export default HeroSection