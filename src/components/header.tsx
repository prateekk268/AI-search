'use client';

import { Title, Tabs, Container, Paper, rem } from "@mantine/core";
import Search from "./search";
import AddMovie from "./addMovie";
import OtherAItools from "./otherAI";

export default function HeadCompoments() {
  return (
    <Container size="lg" pt="xl" pb="xl">
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        style={{
          backgroundColor: 'var(--mantine-color-body)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Title
          order={2}
          mb="lg"
          ta="center"
          fw={800}
          style={{ fontSize: rem(30), color: 'var(--mantine-color-text)' }}
        >
          🎬 Welcome to AI Movie Search
        </Title>

        <Tabs
          variant="pills"
          defaultValue="search"
          color="indigo"
          radius="md"
          keepMounted={false}
        >
          <Tabs.List
            grow
            mb="lg"
            style={{
              gap: rem(12),
              justifyContent: 'center',
            }}
          >
            <Tabs.Tab value="search">Search Movies by AI</Tabs.Tab>
            <Tabs.Tab value="add">Add Your Movies</Tabs.Tab>
            <Tabs.Tab value="others">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="search">
            <Paper p="md" shadow="xs" radius="md" withBorder>
              <Search />
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="add">
            <Paper p="md" shadow="xs" radius="md" withBorder>
              <AddMovie />
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="others">
            <Paper p="md" shadow="xs" radius="md" withBorder>
              <OtherAItools />
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Container>
  );
}
