import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";

export default function ChatOuput({ messages, isLoading, ...properties }) {
  const loaderColor = useColorModeValue("gray.100", "white");
  const unevenBackgroundColor = useColorModeValue("gray.100", "#2F3239");

  return (
    <Box flex={1} {...properties}>
      <Stack>
        {messages.map(({ agent, data: { response } }, index) => (
          <HStack
            padding={4}
            key={index}
            alignItems="flex-start"
            spacing={6}
            backgroundColor={index % 2 !== 0 && unevenBackgroundColor}
          >
            <Avatar src={agent ? "/chatbot.png" : "/user.png"} size="xs" />
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </HStack>
        ))}
        {isLoading && (
          <HStack padding={4} backgroundColor={unevenBackgroundColor}>
            <Avatar size="xs" src="/chatbot.png" />
            <Stack borderRadius="full" borderWidth="1px" padding={1}>
              <BeatLoader color={loaderColor} size={8} />
            </Stack>
          </HStack>
        )}
      </Stack>
    </Box>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
};
