"use client";

import {
  Title,
  TextInput,
  Rating,
  Select,
  Textarea,
  Button,
  Stack,
  Paper,
  Group,
  Notification,
} from "@mantine/core";
import { useState } from "react";

export default function AddMovie() {
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(8.5);
  const [audienceRating, setAudienceRating] = useState("G");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const movieRatings = [
    "G",
    "PG",
    "PG-13",
    "R",
    "NC-17",
    "U",
    "12A",
    "15",
    "18",
    "TV-Y7",
    "TV-MA",
  ];

  const handleSubmit = async () => {
    const data = {
      movieName,
      rating,
      audienceRating,
      description,
    };

    try {
      const request = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        setNotification({
          message: "Movie Name must be unique!",
          type: "error",
        });
        return;
      }

      setNotification({
        message: "Thank you for the movie suggestion!",
        type: "success",
      });

      // Optionally reset form
      setMovieName("");
      setRating(8.5);
      setAudienceRating("G");
      setDescription("");
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Something went wrong. Try again!",
        type: "error",
      });
    } 
  };

  const isDisabled = movieName.length === 0 || description.length === 0;

  return (
    <Paper shadow="md" radius="lg" p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3}>🎞️ Add Your Favourite Movie</Title>

        {notification && (
          <Notification
            withCloseButton
            color={notification.type === "success" ? "green" : "red"}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}

        <TextInput
          label="Movie Name"
          placeholder="e.g. Inception"
          value={movieName}
          onChange={(e) => setMovieName(e.currentTarget.value)}
          required
          withAsterisk
        />

        <Stack gap={5}>
          <label>Movie Rating</label>
          <Rating size="lg" count={10} value={rating} onChange={setRating} fractions={10} />
        </Stack>

        <Select
          label="Age Rating"
          data={movieRatings}
          value={audienceRating}
          onChange={(val) => setAudienceRating(val || "G")}
          withAsterisk
        />

        <Textarea
          label="Description"
          placeholder="Write a brief description of the movie..."
          autosize
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <Group justify="flex-end">
          <Button
            variant="filled"
            color="indigo"
            size="md"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Add to the Search
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
