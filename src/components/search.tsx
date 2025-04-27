"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Title,
  Stack,
  Paper,
  Group,
  Text,
  ScrollArea,
  Notification,
} from "@mantine/core";

export default function Search() {
  const [text, setText] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onSearch = async () => {
    if (text.trim().length === 0 || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const request = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ search: text }),
      });

      const message = await request.json();

      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
      setText("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="md" radius="lg" p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3} ta="center">
          🎬 Get Movie Recommendations
        </Title>

        <ScrollArea
          h={300}
          p="md"
          style={{ border: "1px solid #eee", borderRadius: "8px" }}
        >
          <Stack gap="md">
            {messages.map((msg, idx) => (
              <Paper
                key={idx}
                shadow="xs"
                p="md"
                radius="md"
                bg={msg.role === "user" ? "gray.1" : "teal.1"}
              >
                <Text size="sm" fw={msg.role === "user" ? 600 : 400}>
                  {msg.role === "user" ? "You" : "Assistant"}:
                </Text>
                <Text mt={4}>{msg.content}</Text>
              </Paper>
            ))}
            {loading && (
              <Notification color="teal" title="Thinking..." loading>
                AI is crafting the perfect recommendation!
              </Notification>
            )}
          </Stack>
        </ScrollArea>

        <TextInput
          label="Your Mood / Query"
          placeholder="Feeling adventurous? romantic? scary?"
          description="Tell us your vibe and get the perfect movie!"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          required
          withAsterisk
        />

        <Group justify="flex-end">
          <Button
            variant="filled"
            color="teal"
            size="md"
            disabled={text.trim().length === 0 || loading}
            onClick={onSearch}
          >
            {loading ? "Thinking..." : "Send"}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
