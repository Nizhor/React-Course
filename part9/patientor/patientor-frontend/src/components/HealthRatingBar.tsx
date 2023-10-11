import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
};

const CustomizedRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  }
});

const RATING_DESCRIPTIONS = [
  "The patient is in excellent condition",
  "The patient has a minor risk of illness",
  "The patient has an elevated risk of illness",
  "The patient has a confirmed diagnosis",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => (
  <div className="rating-bar">
    <CustomizedRating
      readOnly
      value={4 - rating}
      max={4}
      icon={<Favorite fontSize="inherit" />}
    />
    {showText && <p>{RATING_DESCRIPTIONS[rating]}</p>}
  </div>
);

export default HealthRatingBar;
