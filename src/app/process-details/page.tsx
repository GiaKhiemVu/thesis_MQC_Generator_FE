'use client';

import {
Typography,
Box,
Container,
Paper,
AppBar,
Toolbar,
Button,
TextField,
CircularProgress,
InputLabel,
Select,
MenuItem,
FormControl,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { generateQuestionDetails } from '../api/services'; // <-- Make sure this function exists

export default function ProcessDetailsPage() {
    const [data, setData] = useState<{
        input_text: string;
        input_to_model1: string;
        extracted_result: {
        input: string;
        output: string;
        };
        converted_input_step_2: string;
        input_to_model2: string;
        distractor_result: {
        input: string;
        output: string;
        distractors: string[];
        };
    } | null>(null);
    const [extractModel, setExtractModel] = useState('t5-small-2000');
    const [distractorModel, setDistractorModel] = useState('t5-base');
    const [input, setInput] = useState('This is the testing sentence in the input box.');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        try {
        const res = await generateQuestionDetails(input, extractModel, distractorModel);
        setData(res);
        } catch (err) {
        console.error('Process generation failed:', err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Quiz Generator
                </Typography>
                <Box display="flex" gap={2}>
                    <Button color="inherit" component={Link} href="/">Home</Button>
                    <Button color="inherit" component={Link} href="/extract-answer">Extract Answer</Button>
                    <Button color="inherit" component={Link} href="/distractors-generator">Distractors Generator</Button>
                    <Button color="inherit" component={Link} href="/process-details">Process Details</Button>
                </Box>
                </Toolbar>
            </AppBar>

            <Box component="main" flexGrow={1}>
                <Container maxWidth="md">
                    <Box py={8}>
                    <Typography variant="h4" gutterBottom>
                        End-to-End Process Overview
                    </Typography>

                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6">1️⃣ Original Input:</Typography>
                        <TextField
                            label="Enter a sentence"
                            multiline
                            fullWidth
                            rows={2}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        
                        <Box display="flex" gap={4} marginTop={3} alignItems="center" flexWrap="wrap">
                            {/* Extract Model Select */}
                            <FormControl>
                                <InputLabel id="model-extract-selection">Extract model</InputLabel>
                                <Select
                                    labelId="model-extract-selection"
                                    value={extractModel}
                                    label="Extract model"
                                    onChange={(e) => setExtractModel(e.target.value)}
                                    sx={{ minWidth: 180 }}
                                >
                                    <MenuItem value="t5-small-500">t5-small-500</MenuItem>
                                    <MenuItem value="t5-small-1000">t5-small-1000</MenuItem>
                                    <MenuItem value="t5-small-1500">t5-small-1500</MenuItem>
                                    <MenuItem value="t5-small-2000">t5-small-2000</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Distractor Generator Model Select */}
                            <FormControl>
                                <InputLabel id="distractors-generator-selection">Distractor model</InputLabel>
                                <Select
                                    labelId="distractors-generator-selection"
                                    value={distractorModel}
                                    label="Distractor model"
                                    onChange={(e) => setDistractorModel(e.target.value)}
                                    sx={{ minWidth: 180 }}
                                >
                                    <MenuItem value="t5-small-500">t5-small-500</MenuItem>
                                    <MenuItem value="t5-small-1000">t5-small-1000</MenuItem>
                                    <MenuItem value="t5-small-1500">t5-small-1500</MenuItem>
                                    <MenuItem value="t5-small-2000">t5-small-2000</MenuItem>
                                    <MenuItem value="t5-base">t5-base</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
                        </Button>
                    </Paper>

                    {data && (
                        <>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6">2️⃣ Preprocess → Input to Model 1:</Typography>
                            <Typography variant="body2">{data.input_to_model1}</Typography>
                        </Paper>

                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6">3️⃣ Extract Answer Model</Typography>
                            <Typography sx={{ mt: 1 }} variant="subtitle1">Input:</Typography>
                            <Typography variant="body2">{data.extracted_result.input}</Typography>
                            <Typography sx={{ mt: 2 }} variant="subtitle1">Output:</Typography>
                            <Typography variant="body2">{data.extracted_result.output}</Typography>
                        </Paper>

                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6">4️⃣ Convert Output → Input to Model 2:</Typography>
                            <Typography variant="body2">{data.converted_input_step_2}</Typography>
                        </Paper>

                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6">5️⃣ Preprocess → Input to Model 2:</Typography>
                            <Typography variant="body2">{data.input_to_model2}</Typography>
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6">6️⃣ Distractor Generator Model</Typography>
                            <Typography sx={{ mt: 1 }} variant="subtitle1">Input:</Typography>
                            <Typography variant="body2">{data.distractor_result.input}</Typography>
                            <Typography sx={{ mt: 2 }} variant="subtitle1">Output:</Typography>
                            <Typography variant="body2">{data.distractor_result.output}</Typography>

                            <Typography sx={{ mt: 2 }} variant="subtitle1">Distractors:</Typography>
                            <ul>
                            {data.distractor_result.distractors.map((d, i) => (
                                <li key={i}>
                                <Typography variant="body2">{d}</Typography>
                                </li>
                            ))}
                            </ul>
                        </Paper>
                        </>
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
