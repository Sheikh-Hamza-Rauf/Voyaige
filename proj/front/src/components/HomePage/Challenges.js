import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Challenges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart, faAward, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChallengeCard = ({
  title,
  points,
  image,
  detailsLink,
  isLoggedIn,
  onRedirect,
  earned,
  onCheckConsecutiveLogins,
  challengeId,
  onShowLoginModal,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleDetailsClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation if not logged in
      onRedirect(); // Redirect to the login page
    } else {
      if (challengeId === 3) {
        // Call the function to check consecutive logins and show the modal if third challenge is clicked
        onCheckConsecutiveLogins();
        onShowLoginModal(); // Trigger the modal display
      }
    }
  };

  return (
    <div className="challenge-card">
      <div className="image-container">
        <img src={image} alt={title} className="challenge-image" />
        
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>

        <div className="points-section">
          <div className="points-badge">
            <FontAwesomeIcon icon={faAward} className="icons" />
            <span>{points} Points</span>
          </div>
          {earned ? (
            <div className="view-details earned">Earned</div>
          ) : (
            <Link
              to={isLoggedIn ? detailsLink : "#"}
              onClick={handleDetailsClick}
              className="view-details"
            >
              <span>View Details</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Challenges = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [earnedChallenges, setEarnedChallenges] = useState([]); // Tracks earned challenges
  const [consecutiveLogins, setConsecutiveLogins] = useState(0);
  const [loginMessage, setLoginMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check the user's login status when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true); // If the user is logged in, set state to true
    }
    console.log("User status:", isLoggedIn ? "Logged in" : "Not logged in");
  }, [isLoggedIn]);

  // Fetch challenge statuses when the component mounts or a state change triggers it
  useEffect(() => {
    const fetchAllChallengeStatuses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email) {
        try {
          const response = await axios.post(`https://voyaige-production.up.railway.app/api/users/checkAllChallengeStatuses`, {
            email: user.email,
          });

          console.log("All challenge statuses:", response.data.statuses);

          // Update earned challenges based on the response
          const completedChallengeIds = Object.keys(response.data.statuses).filter(
            (challengeId) => response.data.statuses[challengeId] === true
          );
          setEarnedChallenges(completedChallengeIds.map(Number)); // Convert string IDs to numbers
        } catch (error) {
          console.error("Error fetching all challenge statuses:", error);
        }
      }
    };

    if (location.state?.redirectedFromChallengeId) {
      const challengeId = location.state.redirectedFromChallengeId;
      console.log(
        "Back in Challenges page. Redirected from Challenge ID: ${challengeId}"
      );
      fetchAllChallengeStatuses();
    } else {
      // Fetch all statuses when the page loads or other state changes
      fetchAllChallengeStatuses();
    }
  }, [location.state]);

  const checkConsecutiveLogins = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const response = await axios.post(`https://voyaige-production.up.railway.app/api/users/checkConsecutiveLogins`, {
          email: user.email,
        });
  
        const { consecutiveLoginDays, lastLoginDate } = response.data;
        setConsecutiveLogins(consecutiveLoginDays);
        console.log("Consecutive login days:", consecutiveLoginDays);
  
        const currentDate = new Date().toDateString(); // Get current date as a string
        const lastLogin = new Date(lastLoginDate).toDateString(); // Convert last login date to string
  
        if (currentDate !== lastLogin) {
          // If the user has logged in on a new day, call the API to update lastLoginDate
          await axios.post(`https://voyaige-production.up.railway.app/api/users/updateLastLogin`, {
            email: user.email,
            lastLoginDate: new Date(),
          });
          setConsecutiveLogins((prev) => prev + 1); // Increment consecutive logins
          setLoginMessage(
            ("You have logged in for ${consecutiveLoginDays + 1} consecutive days. Keep going!")
          );
        } else {
          // If the login is on the same day, just update the message
          setLoginMessage("You have logged in for ${consecutiveLoginDays} consecutive days. Keep going!");
        }
      } catch (error) {
        console.error("Error checking consecutive login days:", error);
      }
    }
  };
  
  // Function to trigger the modal display
  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  // Run this check when the component mounts if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      checkConsecutiveLogins();
    }
  }, [isLoggedIn]);

  // Redirect to login page if user is not logged in
  const redirectToLogin = () => {
    console.log("Redirecting to login");
    navigate("/login");
  };

  const challenges = [
    {
      id: 1,
      title: "Think Fast, Earn Faster (Play Crosswords for Big Points!)",
      points: 2000,
      image: "https://cdn.vectorstock.com/i/1000x1000/24/42/crossword-icon-vector-9412442.webp",
      detailsLink: "/crossword",
    },
    {
      id: 2,
      title: "Calling all travel lovers! Can you ace our travel trivia? Only one way to find out!",
      points: 5000,
      image: "https://www.signupgenius.com/cms/images/groups/100-Random-Trivia-Questions-1260x630.png",
      detailsLink: "/quiz",
    },
    {
      id: 3,
      title: "10 days, 10 logins – unlock your exclusive reward!",
      points: 3000,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/872/884/large_2x/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png",
      detailsLink: "/",
    },
    {
      id: 4,
      title: "Plan Your Next 5 Adventure and Earn Rewards Along the Way!",
      points: 5000,
      image: "https://www.ytravelblog.com/wp-content/uploads/2018/11/planning-a-trip-tips-and-challenges-2.jpg",
      detailsLink: "/",
    },
  ];

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h2 className="challenges-title">Travel Challenges</h2>
        <p className="challenges-subtitle">
          Complete challenges to earn points and unlock exclusive rewards
        </p>
      </div>

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            isLoggedIn={isLoggedIn}
            onRedirect={redirectToLogin}
            earned={earnedChallenges.includes(challenge.id)}
            onCheckConsecutiveLogins={checkConsecutiveLogins}
            challengeId={challenge.id}
            onShowLoginModal={handleShowLoginModal}
          />
        ))}
      </div>

      {/* Display modal with consecutive login message */}
      {showLoginModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowLoginModal(false)} // Close the modal on overlay click
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <h3>Consecutive Login Info</h3>
      <p>{loginMessage}</p>
    </div>
  </div>
)}

      
    </div>
  );
};

export default Challenges;