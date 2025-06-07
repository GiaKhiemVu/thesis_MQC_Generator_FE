'use client';

import {
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Box,
  Container,
  AppBar,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { generateDistractors } from '../api/services';

export default function DistractorsGeneratorPage() {
  const [input, setInput] = useState('question: This is the testing sentence _ the input box. ||| answer: in');
  const [result, setResult] = useState<{
    input: string;
    output: string;
    distractors: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await generateDistractors(input);
      setResult(res);
    } catch (err) {
      setError('Failed to generate distractors.');
    } finally {
      setLoading(false);
    }
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

        {/* MAIN */}
        <Box component="main" flexGrow={1}>
            <Container maxWidth="md">
                <Box display="flex" flexDirection="column" gap={4} py={8}>
                <Typography variant="h4" gutterBottom>
                    Distractor Generator
                </Typography>

                <TextField
                    label="Enter a sentence with answer"
                    multiline
                    fullWidth
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ minWidth: 160 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
                </Button>

                {(result || error) && (
                    <Paper sx={{ p: 4 }}>
                        {error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <>
                            <Typography variant="h6" gutterBottom>
                                Input:
                            </Typography>
                            <Typography>{result?.input}</Typography>

                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Output:
                            </Typography>
                            <Typography>{result?.output}</Typography>

                                {result?.distractors && (
                                <>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Distractors:
                                </Typography>
                                {result.distractors.map((d, i) => (
                                    <Typography key={i}>- {d}</Typography>
                                ))}
                                </>
                            )}
                            </>
                        )}
                    </Paper>
                )}
                </Box>
            </Container>
        </Box>
        {/* FOOTER */}
        <Box component="footer" sx={{ py: 2, px: 2, backgroundColor: '#f5f5f5' }}>
            <Box display="flex" justifyContent="space-between" width={'100%'}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Quiz Generator. All rights reserved.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    By Vu Gia Khiem - ITITIU20229
                </Typography>
            </Box>
        </Box>
    </Box>
  );
}
