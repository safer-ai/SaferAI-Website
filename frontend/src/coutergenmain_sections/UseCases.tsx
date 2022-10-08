import { Avatar, Container, Grid, Typography } from "@mui/material";
import { FaHatCowboySide } from "react-icons/fa";
import { BsFileEarmarkCode, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

const CircleAvatar = (props: { children: any }) => {
  return (
    <Avatar
      sx={{ backgroundColor: "secondary.main", width: "5em", height: "5em" }}
    >
      {props.children}
    </Avatar>
  );
};

const UseCases = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h2"
        paddingTop={"48px"}
        paddingBottom={"24px"}
        textAlign="center"
      >
        A Tool For Everyone
      </Typography>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={2}
        justifyContent="flex-start"
      >
        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 1 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <BsPencil size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 4 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For investigators without a CS background
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 7 }}>
          A <Link to="/countergenweb">web interface</Link> allows you to easily
          measure model bias on your data. No coding required !
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 2 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <FaHatCowboySide size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 5 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For Machine Learning enthusiasts
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 8 }}>
          Load your data and your model into a{" "}
          <Link to="/countergennotebook">friendly Colab notebook</Link> and get
          started with evaluation & model editing!
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 3 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <BsFileEarmarkCode size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 6 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For engineers and researchers
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 9 }}>
          Use the open source{" "}
          <Link to="/countergengithub">countergen Python modules</Link> to
          evaluate the models you are using or creating.{" "}
          <Link to="/countergengithub">Documentation</Link> included!
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Container>
  );
  // return (
  //   <div id="features" className="text-center">
  //     <div className="container">
  //       <div className="col-md-10 col-md-offset-1">
  //         <h2>Use cases</h2>
  //       </div>
  //       <div className="row">
  //         <div className="col-xs-6 col-md-3 feature-col">
  //           <Avatar
  //             sx={{ bgcolor: "primary.main", padding: "2em", margin: "1em" }}
  //           >
  //             <AdbIcon fontSize="large" />
  //           </Avatar>

  //           <h3>zae</h3>
  //           <p>
  //             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
  //             ipsam ducimus tempore deleniti magnam amet? Distinctio veritatis
  //             voluptatem asperiores vitae at reiciendis. Repudiandae
  //             consequuntur eaque maiores aut quae repellat sit!
  //           </p>
  //         </div>
  //         <div className="col-xs-6 col-md-3  feature-col">
  //           <Avatar
  //             sx={{ bgcolor: "primary.main", padding: "2em", margin: "1em" }}
  //           >
  //             <AdbIcon fontSize="large" />
  //           </Avatar>
  //           <h3>zae</h3>
  //           <p>
  //             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
  //             ipsam ducimus tempore deleniti magnam amet? Distinctio veritatis
  //             voluptatem asperiores vitae at reiciendis. Repudiandae
  //             consequuntur eaque maiores aut quae repellat sit!
  //           </p>
  //         </div>
  //         <div className="col-xs-6 col-md-3  feature-col">
  //           <Avatar
  //             sx={{ bgcolor: "primary.main", padding: "2em", margin: "1em" }}
  //           >
  //             <AdbIcon fontSize="large" />
  //           </Avatar>
  //           <h3>zae</h3>
  //           <p>
  //             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
  //             ipsam ducimus tempore deleniti magnam amet? Distinctio veritatis
  //             voluptatem asperiores vitae at reiciendis. Repudiandae
  //             consequuntur eaque maiores aut quae repellat sit!
  //           </p>
  //         </div>
  //         <div className="col-xs-6 col-md-3  feature-col">
  //           <Avatar
  //             sx={{ bgcolor: "primary.main", padding: "2em", margin: "1em" }}
  //           >
  //             <AdbIcon fontSize="large" />
  //           </Avatar>
  //           <h3>zae</h3>
  //           <p>
  //             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
  //             ipsam ducimus tempore deleniti magnam amet? Distinctio veritatis
  //             voluptatem asperiores vitae at reiciendis. Repudiandae
  //             consequuntur eaque maiores aut quae repellat sit!
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default UseCases;
