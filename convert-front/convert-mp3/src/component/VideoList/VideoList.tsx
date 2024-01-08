import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './VideoList.css'
import AudioVisualizer from "../VideoVisualizer/VideoVisualizer";

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
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
                  <IconButton className="hola">
                    <PlayCircleIcon />
                  </IconButton>
                <ListItemText primary={<AudioVisualizer/>} />
              </ListItem>
            )}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
