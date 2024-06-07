"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

type Movie = {
  id: number;
  year: number;
  title: string;
  persons: string[];
  thumb_url: string;
  abstract: string;
  description: string;
  keywords: string[];
};

export default function Movie() {
  const [description, setDescription] = React.useState("");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(false);
  const onListen = async () => {
    try {
      setMovies([]);
      setLoading(true);
      const { data } = await axios.post("/api/chatgpt", { description });
      console.log(data.response);
      setMovies(data.response);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onGenerateImage = async (index: number, keyword: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/image", { keyword });
      const thumbUrl = data.response;
      console.log(thumbUrl);
      setMovies((prevs) =>
        prevs.map((prev, prevIndex) =>
          index === prevIndex ? { ...prev, thumb_url: thumbUrl } : prev
        )
      );
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box margin={5}>
      <Typography variant="h3">どんな映画？</Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={loading}
      />
      <Box marginTop={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setDescription("");
            setMovies([]);
          }}
          disabled={loading}
        >
          クリア
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="outlined"
          disabled={!description || loading || movies.length > 0}
          onClick={() => {
            onListen();
          }}
        >
          ChatGPTに聞いてみる
        </Button>
      </Box>
      {loading && (
        <Box
          display="flex"
          position={"fixed"}
          justifyContent={"center"}
          width="100vw"
        >
          <CircularProgress variant="indeterminate" disableShrink size={100} />
        </Box>
      )}
      <Box>
        {(movies || []).map((movie, index) => {
          return (
            <Box key={index} marginTop={1}>
              <Card variant="outlined">
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {movie.year}年公開
                      </Typography>
                      <Typography variant="h5" component="div">
                        {movie.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        出演：{movie.persons.join(", ")}
                      </Typography>
                      <Typography variant="body2">{movie.abstract}</Typography>
                    </Box>
                    <Box style={{ cursor: "pointer" }}>
                      {movie.thumb_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={movie.thumb_url}
                          width={150}
                          height={150}
                          alt={movie.title}
                          onClick={() => {
                            window.open(movie.thumb_url);
                          }}
                        />
                      ) : (
                        <Box
                          width={150}
                          height={150}
                          sx={{ border: "1px solid #aaa", color: "#aaa" }}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          onClick={() => {
                            onGenerateImage(index, movie.description);
                          }}
                        >
                          イメージ取得
                        </Box>
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <CardContent>
                  <Typography paragraph>{movie.description}</Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
