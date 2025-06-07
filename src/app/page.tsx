'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Box,
  Container,
  Link,
} from '@mui/material';
import { useState } from 'react';
import { generateQuestion } from './api/services';

export default function HomePage() {
  const [input, setInput] = useState('This is the testing sentence in the input box.');
  const [result, setResult] = useState<{
    question: string;
    answer: string;
    distractors: string[];
  } | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateQuestion(input);
      setResult(data);
      setOptions(shuffleOptions(data.distractors, data.answer));
    } catch (err) {
      setError('Failed to generate question.');
    } finally {
      setLoading(false);
    }
  };

  const shuffleOptions = (distractorsList: string[], answer: string) => {
    const options = [...distractorsList, answer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* HEADER */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Quiz Generator
          </Typography>

          <Box display="flex" gap={2}>
            <Button color="inherit" component={Link} href="/">
              Home
            </Button>
            <Button color="inherit" component={Link} href="/extract-answer">
              Extract Answer
            </Button>
            <Button color="inherit" component={Link} href="/distractors-generator">
              Distractors Generator
            </Button>
            <Button color="inherit" component={Link} href="/process-details">
              Process Details
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" flexGrow={1}>
        {/* MAIN */}
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
            pt={8}
            pb={8}
          >
            <Typography variant="h4" gutterBottom>
              Multiple Question Generator
            </Typography>

            <TextField
              label="Enter a sentence"
              multiline
              fullWidth
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ minWidth: 160 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
            </Button>

            {(result || error) && (
              <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                {error ? (
                  <Typography color="error" variant="body1">
                    {error}
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Question:
                    </Typography>
                    <Typography variant="body1">{result?.question}</Typography>

                    {options?.length > 0 && (
                      <>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Options:
                        </Typography>
                        {options.map((option: string, index: number) => (
                          <Typography key={index} variant="body1">
                            {String.fromCharCode(65 + index)}. {option}
                          </Typography>
                        ))}
                      </>
                    )}

                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Answer:
                    </Typography>
                    <Typography variant="body1">{result?.answer}</Typography>
                  </>
                )}
              </Paper>
            )}
          </Box>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box component="footer" sx={{ py: 3, px: 2, backgroundColor: '#f5f5f5' }}>
          <Container maxWidth="md">
          <Typography variant="body2" color="textSecondary" align="center">
              © {new Date().getFullYear()} Quiz Generator. All rights reserved. By Vu Gia Khiem - ITITIU20229
          </Typography>
          </Container>
      </Box>
    </Box>
  );
}
