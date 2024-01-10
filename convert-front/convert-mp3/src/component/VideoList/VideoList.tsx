import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ReactAudioPlayer from "react-audio-player";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function generate(element: React.ReactElement) {
  return [0,1,2,3,4].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function VideoList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Your list videos
        </Typography>
        <Demo>
          <List>
            {generate(
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <FileDownloadIcon />
                  </IconButton>
                }
              >
                <ReactAudioPlayer src="https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg"  controls />
              </ListItem>
            )}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
