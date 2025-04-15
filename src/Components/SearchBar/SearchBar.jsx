import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { getAllProducts } from "../../Constants/Constant";
const SearchBar = ({ gyms }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { location } = useParams();

  console.log(gyms);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const newFilteredData = gyms.filter(
      (item) =>
        item.gym_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.address.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredData(newFilteredData);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 5,
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search Gyms"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: { xs: 350, sm: 500, md: 800 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AiOutlineSearch />
            </InputAdornment>
          ),
        }}
      />
      {searchTerm.length > 0 && (
        <Box
          sx={{
            width: { xs: 350, sm: 500, md: 800 },
            overflowY: "scroll",
            height: "200px",
          }}
        >
          <Stack spacing={0}>
            {filteredData.length === 0 ? (
              <Typography variant="h6" textAlign="center" margin="25px 0">
                Gym Not Found
              </Typography>
            ) : (
              filteredData.map((gym) => (
                <Link
                  to={`/gyms/${location}/${gym.gym_id}`}
                  key={gym.gym_id}
                  sx={{ marginBottom: 2 }}
                >
                  <Item
                    sx={{
                      borderRadius: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                      {gym.gym_name.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        textAlign: "left",
                        wordBreak: "break-word",
                        paddingRight: 10,
                        margin: "10px 0",
                      }}
                    >
                      {gym.address}
                    </Typography>

                    <img
                      src={gym.gym_image}
                      alt={gym.gym_name}
                      style={{ width: 75, height: 100 }}
                    />
                  </Item>
                </Link>
              ))
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default SearchBar;
