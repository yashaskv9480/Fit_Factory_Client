import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import {
  MdSentimentSatisfiedAlt,
  MdSentimentDissatisfied,
  MdSentimentVeryDissatisfied,
  MdSentimentNeutral,
  MdSentimentVerySatisfied,
  MdStarRate,
  MdOutlineSentimentVeryDissatisfied,
  MdSend,
  MdOutlineFilterAlt,
} from "react-icons/md";
import Box from "@mui/material/Box";
import {
  Button,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "./Review.css";
import CommentCard from "../Card/Comment Card/CommentCard";
import { customerReview } from "../../Assets/Images/Image";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import { useAuth } from "../../Auth/useAuth/useAuth";

const labels = {
  0: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  0.5: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  1: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  1.5: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  2: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  2.5: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  3: <MdSentimentNeutral style={{ color: "gold" }} />,
  3.5: <MdSentimentNeutral style={{ color: "gold" }} />,
  4: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  4.5: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  5: <MdSentimentVerySatisfied style={{ color: "green" }} />,
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const ProductReview = ({ gym_id, token }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState("");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setloading] = useState(true);

  const { isauthenticated } = useAuth();

  const fetchReviews = async () => {
    const fetchReviewsResponse = await Fit_Factory_api.get(
      `/user/fetchreview/${gym_id}`
    );
    if (fetchReviewsResponse.status == 200) {
      setloading(false);
      setReviews(fetchReviewsResponse.data);
    } else {
      setloading(false);
      toast.error("Couldnt retrieve the reviews! Please contact admin!", {
        theme: "colored",
        autoClose: 600,
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!comment && !value) {
      toast.error("Please Fill the all Fields", {
        theme: "colored",
        autoClose: 500,
      });
    } else if (comment.length <= 4) {
      toast.error("Please add more than 4 characters", {
        theme: "colored",
        autoClose: 500,
      });
    } else if (value <= 0) {
      toast.error("Please add rating", { theme: "colored", autoClose: 500 });
    } else if (comment.length >= 4 && value > 0) {
      try {
        const addReviewResponse = await Fit_Factory_api.post(
          `/user/addreview`,
          { review: comment, rating: value, gym_id },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (addReviewResponse.status == 200) {
          setloading(false);
          toast.success("Review added succesfully", {
            theme: "colored",
            autoClose: 500,
          });
          fetchReviews();
          setComment("");
          setValue(null);
        }
      } catch (error) {
        setloading(false);
        toast.error("Couldnt Add the review! Please contact admin!", {
          theme: "colored",
          autoClose: 600,
        });
      }
    }
  };
  return (
    <>
      <div className="form-container">
        {loading ? (
          <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rectangular" height={200} width="200px" />
            <Skeleton variant="text" height={400} width={700} />
          </section>
        ) : (
          <>
            {reviews.length >= 1 ? (
              <Box className="review-box">
                {reviews.map((review) => (
                  <CommentCard key={review._id} reviews={review} />
                ))}
              </Box>
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                No reviews have been submitted for this product yet. Be the
                first to add a review!
              </Typography>
            )}
            {isauthenticated && (
              <form onSubmit={handleSubmitReview} className="form">
                <Box
                  sx={{
                    width: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    id="rating"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <MdStarRate
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                  />
                  {value !== null && (
                    <Box className="expression-icon" sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <TextField
                  id="filled-textarea"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  label="Add Review"
                  placeholder="What did you like or dislike?"
                  multiline
                  className="comment"
                  variant="outlined"
                />

                <Tooltip title="Send Review">
                  <Button
                    className="form-btn"
                    variant="contained"
                    type="submit"
                    endIcon={<MdSend />}
                  >
                    Send
                  </Button>
                </Tooltip>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductReview;
