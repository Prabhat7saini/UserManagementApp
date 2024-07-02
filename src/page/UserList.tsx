import React, { useContext } from "react";
import { userContext } from "../context/UserContext";
import { Container, Grid, Typography } from "@mui/material";
import UserListed from "../components/UserListed"; 
import { User } from "../utils/UserInterface"; 

const UserList = () => {
  const { Users ,isLoading} = useContext(userContext);

  if (Users.length <= 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "60vh" }}>
          <Typography variant="h6" color="textSecondary">
            No data found
          </Typography>
        </Grid>
      </Container>
    );
  }
  if (isLoading) {
    console.log("loading....")
    return (<div>Loading.........</div>)
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {Users.map((user: User,index:number) => (
          <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
            <UserListed {...user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
